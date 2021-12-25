module.exports = {
  devServer: {
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: 'http://1ba4-62-217-190-209.ngrok.io',
        headers: {
          'Host': '1ba4-62-217-190-209.ngrok.io',
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
