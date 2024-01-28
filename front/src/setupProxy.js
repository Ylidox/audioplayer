const { createProxyMiddleware } = require('http-proxy-middleware');
const URL = 'http://localhost:3003';

module.exports = function(app) {
  app.use(
    '/file',
    createProxyMiddleware({
      target: URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/user',
    createProxyMiddleware({
      target: URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/audio',
    createProxyMiddleware({
      target: URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/list',
    createProxyMiddleware({
      target: URL,
      changeOrigin: true,
    })
  );
};