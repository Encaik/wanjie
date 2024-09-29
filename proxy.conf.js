module.exports = {
  '/api': {
    target: 'https://wanjie-api.vercel.app',
    // target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  }
};
