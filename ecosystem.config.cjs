module.exports = {
  apps: [
    {
      name: 'epm-competitor-analysis',
      script: 'dist-server/server/index.js',
      cwd: '.',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4000,
      },
    },
  ],
};
