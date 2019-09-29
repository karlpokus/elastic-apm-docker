# elastic-apm-docker
Deploy docker-composed elastic apm 7.3.2 with proxy auth on a single remote docker host. Work in progress.

# deploy
requirements
- a remote host with docker installed
- ssh access to said host as root
- docker group present on host to run sudoless

```bash
$ cd deploy
# You only need to run setup once
$ ansible-playbook -i <host_ip>, setup.yml
# deploy.yml is idempotent
$ ansible-playbook -i <host_ip>, deploy.yml
```

# auth
Setup auth on remote host before running the stack. Start by adding users to the proxy

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
$ ELASTIC_APM_SECRET_TOKEN=<token> docker-compose up|down [-d -v]
```
As apm-server is dependent on es and kibana (and they are sloow to boot) it might take a while (10-20s) for the stack to be up. The stack will also restart on host reboot.

```bash
# verify stack health
$ ./up.sh
```

Run web app test
```bash
$ docker run -p 9300:9300 -d \
-e DEBUG=1 \ # default no logging
-e ELASTIC_APM_ACTIVE=false \ # default true
-e ELASTIC_APM_LOG_LEVEL=debug|trace \ # default info
-e ELASTIC_APM_SERVER_URL=<url> \ # default localhost:8200
-e ELASTIC_APM_SECRET_TOKEN=<token> \
--name silly-web-app pokus2000/silly-web-app:1.0.0
```

Make an api request
```bash
$ curl -i http://localhost:9300/api/v1/user
```

View apm data in kibana. Use credentials created during preparations for kibana access if the stack is deployed and running behind the proxy.

# network
Communication between services via local docker network. Only apm-server and proxy (to kibana) are open to the internet. Elasticsearch and kibana are exposed only on localhost.

# todos
- [x] nginx proxy auth
- [x] restart always
- [x] apm-server secret_token
- [ ] toggle apm rum
- [x] pass secrets via ENV
- [x] persistant service data
- [ ] add metricbeat
- [x] persistant, non-blocking logging
- [x] turn off proxy access log for /
- [x] add feedback for when stack is up. apm-server takes a while depending on es and kibana.
- [x] dockerize test app
- [ ] consider healtchecks https://docs.docker.com/compose/compose-file/#healthcheck (`/api/status` for kibana `/` for es and apm-server)
- [ ] ssl for proxy

# license
MIT
