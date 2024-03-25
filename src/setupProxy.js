const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://13.51.99.142:8080",
      changeOrigin: true,
    })
  );
};
