#!/bin/bash

# 🚀 Portfolio Deployment Script for Ubuntu 24.04
# Run with: bash deploy.sh

set -e

echo "🚀 Starting deployment of Next.js Portfolio..."

# Configuration
APP_NAME="portfolio"
APP_DIR="/var/www/portfolio"
REPO_URL="https://github.com/shasabbir/portfolio.git"
NODE_VERSION="20"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js
print_status "Installing Node.js ${NODE_VERSION}..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Verify Node.js installation
node_version=$(node --version)
print_status "Node.js version: ${node_version}"

# Install PM2
print_status "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Install Git
print_status "Installing Git..."
sudo apt install -y git

# Install MongoDB
print_status "Installing MongoDB..."
if ! command -v mongod &> /dev/null; then
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    sudo apt update
    sudo apt install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
fi

# Choose web server
echo ""
print_status "Choose your web server:"
echo "1) Apache2 (with mod_proxy)"
echo "2) Nginx"
echo "3) Standalone (PM2 only)"
read -p "Enter your choice (1-3): " webserver_choice

case $webserver_choice in
    1)
        print_status "Installing Apache2..."
        sudo apt install -y apache2
        sudo a2enmod proxy
        sudo a2enmod proxy_http
        sudo a2enmod rewrite
        sudo a2enmod ssl
        WEBSERVER="apache"
        ;;
    2)
        print_status "Installing Nginx..."
        sudo apt install -y nginx
        sudo systemctl start nginx
        sudo systemctl enable nginx
        WEBSERVER="nginx"
        ;;
    3)
        print_status "Using standalone PM2 setup..."
        WEBSERVER="standalone"
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Create application directory
print_status "Setting up application directory..."
sudo mkdir -p /var/www
cd /var/www

# Clone or update repository
if [ -d "$APP_DIR" ]; then
    print_status "Updating existing repository..."
    cd $APP_DIR
    git pull origin main
else
    print_status "Cloning repository..."
    sudo git clone $REPO_URL $APP_DIR
    sudo chown -R $USER:$USER $APP_DIR
    cd $APP_DIR
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Create environment file
print_status "Setting up environment file..."
if [ ! -f ".env.production" ]; then
    cp .env.local.example .env.production
    print_warning "Please edit .env.production with your production settings"
    echo "MONGODB_URI=mongodb://localhost:27017/portfolio" >> .env.production
    echo "NODE_ENV=production" >> .env.production
fi

# Build application
print_status "Building application..."
npm run build

# Setup PM2
print_status "Setting up PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: '$APP_NAME',
      script: 'npm',
      args: 'start',
      cwd: '$APP_DIR',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_file: '.env.production',
      log_file: '/var/log/pm2/$APP_NAME.log',
      out_file: '/var/log/pm2/$APP_NAME-out.log',
      error_file: '/var/log/pm2/$APP_NAME-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 1000,
      max_restarts: 5
    }
  ]
};
EOF

# Create PM2 log directory
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Start application with PM2
print_status "Starting application with PM2..."
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 startup
pm2 startup | grep "sudo" | bash || true

# Configure web server
case $WEBSERVER in
    "apache")
        print_status "Configuring Apache..."
        read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN
        
        sudo tee /etc/apache2/sites-available/$APP_NAME.conf > /dev/null << EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/\$1" [P,L]
    
    ErrorLog \${APACHE_LOG_DIR}/${APP_NAME}_error.log
    CustomLog \${APACHE_LOG_DIR}/${APP_NAME}_access.log combined
</VirtualHost>
EOF
        
        sudo a2ensite $APP_NAME.conf
        sudo a2dissite 000-default 2>/dev/null || true
        sudo apache2ctl configtest
        sudo systemctl restart apache2
        
        print_status "Apache configured successfully!"
        print_warning "To enable SSL, run: sudo apt install certbot python3-certbot-apache && sudo certbot --apache -d $DOMAIN"
        ;;
        
    "nginx")
        print_status "Configuring Nginx..."
        read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN
        
        sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    location /_next/static {
        alias $APP_DIR/.next/static;
        expires 365d;
        access_log off;
    }
    
    location /images {
        alias $APP_DIR/public/images;
        expires 365d;
        access_log off;
    }
}
EOF
        
        sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
        sudo rm -f /etc/nginx/sites-enabled/default
        sudo nginx -t
        sudo systemctl restart nginx
        
        print_status "Nginx configured successfully!"
        print_warning "To enable SSL, run: sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d $DOMAIN"
        ;;
        
    "standalone")
        print_status "Standalone setup complete!"
        print_warning "Application is running on http://localhost:3000"
        ;;
esac

# Setup firewall
print_status "Configuring firewall..."
sudo ufw --force enable
sudo ufw allow ssh
if [ "$WEBSERVER" != "standalone" ]; then
    sudo ufw allow 'Apache Full' 2>/dev/null || sudo ufw allow 'Nginx Full' 2>/dev/null || true
    sudo ufw allow 80
    sudo ufw allow 443
fi

# Final status check
print_status "Checking application status..."
pm2 status

# Print completion message
echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📊 Application Status:"
echo "   - PM2 Process: Running"
echo "   - MongoDB: Running"
echo "   - Web Server: $WEBSERVER"
if [ "$WEBSERVER" != "standalone" ]; then
    echo "   - Domain: $DOMAIN"
    echo ""
    print_status "Your application should now be accessible at: http://$DOMAIN"
else
    echo ""
    print_status "Your application is running at: http://localhost:3000"
fi

echo ""
print_status "Useful commands:"
echo "   - View logs: pm2 logs $APP_NAME"
echo "   - Restart app: pm2 restart $APP_NAME"
echo "   - Check status: pm2 status"
echo "   - Update app: cd $APP_DIR && git pull && npm install && npm run build && pm2 restart $APP_NAME"

echo ""
print_warning "Don't forget to:"
echo "   1. Edit $APP_DIR/.env.production with your production settings"
echo "   2. Setup SSL certificate if using a domain"
echo "   3. Configure your domain's DNS to point to this server"