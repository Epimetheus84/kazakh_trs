const webpack = require('webpack');
const { apiHost } = require('./.env.js');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {
            API_HOST: JSON.stringify(apiHost),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          }}
        })
      ]
    }
  },
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
