module.exports = {
  '/api': {
    target: 'https://wanjie-api.vercel.app',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  }
};
