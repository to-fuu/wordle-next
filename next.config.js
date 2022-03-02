const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});