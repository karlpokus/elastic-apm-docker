const axios = require('axios');

module.exports = axios.create({ // baseURL: ""
  timeout: 3000
});
