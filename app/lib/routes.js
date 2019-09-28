const http = require('./http');

module.exports = {
	logger: (ctx, next) => {
		const d = new Date();
		console.log(`${ d.toISOString() } ${ ctx.method } ${ ctx.path }`);
		return next();
	},
  user: ctx => {
    return http.get('/users/1')
  		.then(res => ctx.body = res.data)
  		.catch(err => ctx.throw(408, "Remote api unavailable"))
  },
	bad: ctx => {
		ctx.set('Connection', 'close');
		ctx.status = 500;
	}
};
