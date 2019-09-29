const http = require('./http');

module.exports = {
	logger: (ctx, next) => {
		if (process.env.DEBUG == "1") {
			const d = new Date();
			console.log(`${ d.toISOString() } ${ ctx.method } ${ ctx.path }`);
		}
		return next();
	},
  user: ctx => {
    return http.get('https://jsonplaceholder.typicode.com/users/1')
  		.then(res => ctx.body = res.data)
  		.catch(err => ctx.throw(408, "Remote api unavailable"))
  },
	bad: ctx => {
		ctx.set('Connection', 'close');
		ctx.status = 500;
	},
	ip: ctx => {
		return http.get('http://ip.jsontest.com/')
			.then(res => ctx.body = res.data)
			.catch(err => ctx.throw(408, "Remote api unavailable"))
	}
};
