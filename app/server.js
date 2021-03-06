// the agent gets a token and url from env
const apm = require('elastic-apm-node').start({ // note: swallows exceptions
	serviceName: "silly-web-app"
});

const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const routes = require('./lib/routes');

const app = new Koa();
const router = new Router({ prefix: "/api/v1" });

router
	.get("/user", routes.user)
	.get("/bad", routes.bad)
	.get("/ip", routes.ip)

app
	.use(routes.logger)
	.use(bodyparser())
	.use(router.routes())
	.use(router.allowedMethods())

module.exports = app;
