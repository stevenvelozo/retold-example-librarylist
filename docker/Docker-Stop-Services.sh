#! /bin/bash
echo "Contact: Steven Velozo <steven@velozo.com>"
echo ""
echo "---"
echo ""

echo "--> Stopping retold docker containers (this will fail if you have not bootstrapped)"
docker stop docker_retold_memcached_1
docker stop docker_retold_mysql_1
