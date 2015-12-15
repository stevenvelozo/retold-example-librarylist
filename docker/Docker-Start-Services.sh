#! /bin/bash
echo "Contact: Steven Velozo <steven@velozo.com>"
echo ""
echo "---"
echo ""

if [[ $* == *--remake* ]]
then
	echo "--> Starting retold docker service images (this will fail if you have not bootstrapped)"
	#stop and remove the containers first
	docker rm -f docker_retold_memcached_1
	docker rm -f docker_retold_mysql_1

	docker run -p 11211:11211 -d -h docker_retold_memcached_1 --name docker_retold_memcached_1 docucluster/memcached
	docker run -p 3306:3306 -d -h docker_retold_mysql_1 --name docker_retold_mysql_1 -e MYSQL_PASS="verysecurepassword" docucluster/mysql
fi

echo "--> Starting retold docker containers (this will fail if you have not bootstrapped)"
docker start docker_retold_memcached_1
docker start docker_retold_mysql_1
