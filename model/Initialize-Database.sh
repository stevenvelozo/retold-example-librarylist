#! /bin/bash
echo "Model Update Script"
echo ""
echo "Contact: Steven Velozo <steven@velozo.com>"
echo "License: MIT"
echo ""
echo "---"
echo ""

echo "--> Finding your container IP"
BOOT2DOCKER=$(which boot2docker)
DOCKERMACHINE=$(which docker-machine)
IP=127.0.0.1
if [ -n "$DOCKERMACHINE" ]; then
    echo "  > You appear to have docker machine, so are probably on Windows or Mac."
    echo "  > We are assuming the docker-machine is named 'default' when getting the IP."
    IP=$(docker-machine ip default)
    echo "  > This means the ip for your hosted environment is: " $IP
elif [ -n "$BOOT2DOCKER" ]; then
    echo "  > You appear to have boot2docker, so are probably on Windows or Mac."
    IP=$(boot2docker ip)
    echo "  > This means the ip for your hosted environment is: " $IP
else
    echo "  > Your IP should be 127.0.0.1"
fi

echo "--> Creating the librarylist database"
time mysql -uadmin -pverysecurepassword -h$IP -e "CREATE DATABASE IF NOT EXISTS librarylist;"

echo "--> Adding the tables to MySQL"
time mysql -uadmin -pverysecurepassword -h$IP librarylist < ./schema/mysql/LibraryList-CreateDatabase.mysql.sql

