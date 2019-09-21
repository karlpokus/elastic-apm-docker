# elastic-apm-docker
Deploy docker-composed elastic apm 7.3.2 with proxy auth. Work in progress.

# usage
```bash
$ docker-compose up|down -d [-v]
```

# network
Communication between services via local docker network. Only apm-server and proxy (to kibana) are open to the internet. Elasticsearch and kibana are exposed only on localhost.

Use `-u admin:a7a1a37c6d2dc5d0e07121892c58ed2c` for kibana access

# docker refs
- https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
- https://www.elastic.co/guide/en/kibana/current/docker.html
- https://www.elastic.co/guide/en/apm/server/current/running-on-docker.html
- https://github.com/yidinghan/eak/blob/master/docker-compose.yml
- https://github.com/gusibi/docker-apm/blob/master/docker-compose.yml

# todos
- [x] nginx proxy auth
- [x] restart always
- [ ] apm-server secret_token
- [ ] Persistant data. Destroy with the v flag
- [ ] log to local or journald https://docs.docker.com/config/containers/logging/journald/

# license
MIT