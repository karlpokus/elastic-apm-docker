# elastic-apm-docker
Deploy docker-composed elastic apm 7.3.2 with proxy auth. Work in progress.

# preparations
Setup auth before deploing the stack:

Add users to the proxy
```bash
# The -c flag creates the file. Omit it to add multiple users.
$ htpasswd [-c] ./conf/nginx/.htpasswd <user>
```

Generate a ELASTIC_APM_SECRET_TOKEN
```bash
$ openssl rand -hex 16
```

# usage
Manage the elastic apm stack
```bash
$ ELASTIC_APM_SECRET_TOKEN=<token> docker-compose up|down -d [-v]
```

Run web app test
```bash
$ ELASTIC_APM_ACTIVE=<bool> \
ELASTIC_APM_SERVER_URL=<url> \
ELASTIC_APM_SECRET_TOKEN=<token> node app/index.js
```

Make an api request
```bash
$ curl -i http://localhost:9300/api/v1/user
```

View apm data in kibana on `localhost:5601`.

Note: use `-u admin:a7a1a37c6d2dc5d0e07121892c58ed2c` for kibana access if the stack is deployed and running behind the proxy.

# network
Communication between services via local docker network. Only apm-server and proxy (to kibana) are open to the internet. Elasticsearch and kibana are exposed only on localhost.

# todos
- [x] nginx proxy auth
- [x] restart always
- [x] apm-server secret_token
- [ ] toggle apm rum
- [x] pass secrets via ENV
- [ ] persistant service data
- [ ] add metricbeat
- [x] persistant, non-blocking logging
- [x] turn off proxy access log for /
- [ ] add feedback for when stack is up. apm-server takes a while depending on es and kibana.
- [ ] dockerize test app

# docker refs
- https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
- https://www.elastic.co/guide/en/kibana/current/docker.html
- https://www.elastic.co/guide/en/apm/server/current/running-on-docker.html
- https://github.com/yidinghan/eak/blob/master/docker-compose.yml
- https://github.com/gusibi/docker-apm/blob/master/docker-compose.yml

# license
MIT
