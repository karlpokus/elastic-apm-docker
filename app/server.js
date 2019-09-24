const apm = require('elastic-apm-node').start({ // note: swallows exceptions
	serviceName: "silly-web-app",
	secretToken: "8227eafcf0b36221c4a6a9d97090bf19",
	serverUrl: "http://localhost:8200"
});

const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const routes = require('./lib/routes');

const app = new Koa();
const router = new Router({ prefix: "/api/v1" });

router
	.get("/user", routes.user)

app
	.use(bodyparser())
	.use(router.routes())
	.use(router.allowedMethods())

module.exports = app;
