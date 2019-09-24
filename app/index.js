const srv = require('./server');
const port = 9300

srv.listen(port, () => {
	console.log(`silly-web-app listening on port ${ port }`)
});
