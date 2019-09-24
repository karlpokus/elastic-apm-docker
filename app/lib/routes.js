const http = require('./http');

module.exports = {
  user: ctx => {
    return http.get('/users/1')
  		.then(res => ctx.body = res.data)
  		.catch(err => ctx.throw(500, "server error"))
  }
};
