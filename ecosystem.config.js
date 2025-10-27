module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/portfolio',
  // Run a single instance to avoid per-process static cache inconsistencies
  instances: 1,
  exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Explicit upload directory to ensure Next.js saves and serves
        // from the same location used by Apache reverse proxy
        UPLOAD_IMAGE_DIR: '/var/www/portfolio/public/images/blog'
      },
      env_file: '.env.production',
      log_file: '/var/log/pm2/portfolio.log',
      out_file: '/var/log/pm2/portfolio-out.log',
      error_file: '/var/log/pm2/portfolio-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s',
      max_memory_restart: '1G',
      node_args: '--max_old_space_size=4096',
      source_map_support: true,
      instance_var: 'INSTANCE_ID'
    }
  ]
};