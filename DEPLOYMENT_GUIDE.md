# 🚀 Deploy Next.js Portfolio on Ubuntu 24.04 Server

This guide covers deploying your Next.js portfolio application on Ubuntu 24.04 server with multiple options including Apache reverse proxy, Nginx, and PM2.

## 📋 Prerequisites

- Ubuntu 24.04 server with sudo access
- Domain name (optional but recommended)
- At least 2GB RAM and 20GB storage

## 🔧 Option 1: Apache + PM2 (Recommended for Apache users)

### Step 1: Update System and Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Install Apache2
sudo apt install -y apache2

# Enable required Apache modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod ssl
```

### Step 2: Clone and Setup Your Application

```bash
# Create application directory
sudo mkdir -p /var/www
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/shasabbir/portfolio.git
sudo chown -R $USER:$USER /var/www/portfolio
cd portfolio

# Install dependencies
npm install

# Create production environment file
sudo cp .env.local.example .env.production
sudo nano .env.production
```

### Step 3: Configure Environment Variables

```bash
# Edit the production environment file
sudo nano .env.production
```

Add your production environment variables:
```env
# MongoDB Configuration (use local MongoDB as set up previously)
MONGODB_URI=mongodb://localhost:27017/portfolio

# Next.js Configuration
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-here

# Firebase Configuration (if using)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Google AI (if using)
GOOGLE_GENAI_API_KEY=your-google-ai-api-key
```

### Step 4: Build the Application

```bash
# Build the Next.js application
npm run build

# Test the production build locally
npm start
```

### Step 5: Setup PM2 for Process Management

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/portfolio',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_file: '.env.production',
      log_file: '/var/log/pm2/portfolio.log',
      out_file: '/var/log/pm2/portfolio-out.log',
      error_file: '/var/log/pm2/portfolio-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 1000,
      max_restarts: 5
    }
  ]
};
EOF

# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions shown after running pm2 startup
```

### Step 6: Configure Apache Virtual Host

```bash
# Create Apache virtual host configuration
sudo tee /etc/apache2/sites-available/portfolio.conf > /dev/null << EOF
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    # Redirect HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    # SSL Configuration (will be added by Certbot)
    
    # Proxy configuration
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # WebSocket support (if needed)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
    
    # Logging
    ErrorLog ${APACHE_LOG_DIR}/portfolio_error.log
    CustomLog ${APACHE_LOG_DIR}/portfolio_access.log combined
</VirtualHost>
EOF

# Enable the site
sudo a2ensite portfolio.conf

# Disable default Apache site
sudo a2dissite 000-default

# Test Apache configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2
```

### Step 7: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtain SSL certificate (replace with your domain)
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Test certificate renewal
sudo certbot renew --dry-run
```

## 🔧 Option 2: Nginx + PM2 (Alternative)

### Step 1: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 2: Configure Nginx

```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/portfolio > /dev/null << EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL configuration will be added by Certbot
    
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
    
    # Static file caching
    location /_next/static {
        alias /var/www/portfolio/.next/static;
        expires 365d;
        access_log off;
    }
    
    location /images {
        alias /var/www/portfolio/public/images;
        expires 365d;
        access_log off;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Setup SSL with Certbot for Nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔧 Option 3: Docker Deployment

### Step 1: Create Dockerfile

```bash
# Create Dockerfile in your project root
cat > Dockerfile << EOF
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF

# Create Docker Compose file
cat > docker-compose.yml << EOF
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=portfolio
    restart: unless-stopped

volumes:
  mongodb_data:
EOF
```

## 📊 Monitoring and Maintenance

### PM2 Management Commands

```bash
# View running processes
pm2 status

# View logs
pm2 logs portfolio

# Restart application
pm2 restart portfolio

# Stop application
pm2 stop portfolio

# Monitor resources
pm2 monit

# Update application (after git pull)
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

### System Monitoring

```bash
# Check system resources
htop
df -h
free -h

# Check application logs
tail -f /var/log/pm2/portfolio.log

# Check Apache/Nginx status
sudo systemctl status apache2
# or
sudo systemctl status nginx
```

## 🔐 Security Considerations

### Firewall Setup

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH (adjust port if changed)
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 'Apache Full'
# or for Nginx
sudo ufw allow 'Nginx Full'

# Check firewall status
sudo ufw status
```

### Additional Security

```bash
# Keep system updated
sudo apt update && sudo apt upgrade -y

# Setup automatic security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades

# Change SSH port (optional)
sudo nano /etc/ssh/sshd_config
# Change Port 22 to Port 2222 (or another port)
sudo systemctl restart ssh
```

## 🚀 Deployment Script

Create an automated deployment script:
EOF