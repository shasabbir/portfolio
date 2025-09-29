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
      max_restarts: 5,
      min_uptime: '10s',
      max_memory_restart: '1G',
      node_args: '--max_old_space_size=4096',
      source_map_support: true,
      instance_var: 'INSTANCE_ID'
    }
  ]
};