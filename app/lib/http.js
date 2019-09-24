const axios = require('axios');

module.exports = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 3000
});
