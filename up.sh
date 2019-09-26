#!/bin/bash

# usage
# ./up.sh <ip>

HOST="$1"

if test -z $HOST; then
  echo "missing arg"
  exit 1
fi

function call() {
	STATUS=`curl -si --connect-timeout 3 --max-time 3 $HOST:$2$3 | head -n 1`
	echo -e "$1\t$STATUS"
}

echo "check start"

call es 9200 /
call kibana 5601 /api/status
call apmsrv 8200 /
call proxy 80 /

echo "check complete"
