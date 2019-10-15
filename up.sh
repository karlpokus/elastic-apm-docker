#!/bin/bash

# up.sh verifies the health of all stack components

# usage
# ./up.sh

HOST=localhost

function call() {
	STATUS=`curl -sik --connect-timeout 3 --max-time 3 $2 | head -n 1`
	echo -e "$1\t$STATUS"
}

echo "check start"

call es http://$HOST:9200
call kibana http://$HOST:5601/api/status
call apmsrv http://$HOST:8200
call proxy https://$HOST/ping

echo "check complete `date +"%Y-%m-%dT%H:%M:%S"`"
