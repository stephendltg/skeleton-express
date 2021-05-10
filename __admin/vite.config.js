// vite.config.js

const pkg       = require('./package.json');
const IP_SERVER = pkg.server || 'localhost'

module.exports = {
    base: '/admin',
    outDir: '../admin',
    mode: {
      NAME: pkg.name,
      VERSION: pkg.version,
      PARAMS: pkg.params
    },
    proxy: {   
      // with options
      '/api/json/v1': {
        target: 'http://' + IP_SERVER + '/api/json/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/json\/v1/, '')
      }
    }
  }