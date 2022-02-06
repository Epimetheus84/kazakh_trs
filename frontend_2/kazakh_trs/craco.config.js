const apiHost = 'a22c-62-217-190-134.ngrok.io';

module.exports = {
  devServer: {
    port: 3001,
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: `http://${apiHost}`,
        headers: {
          'Host': apiHost,
          'Cookie': '' // send cookie on demand
        },
        pathRewrite: function (path) {
          return path.replace(/^\/api/, ''); // remove '/api' prefix when requesting
        }
      },
    },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
