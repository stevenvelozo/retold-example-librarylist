#! /bin/bash
echo "Build Docker Service Containers"
echo "Contact: Steven Velozo <steven@velozo.com>"
echo ""
echo "---"
echo ""

# Build the service containers ...
echo ">>> Building the Services containers -- this could take some time due to downloads..."
docker build -t retold/memcached memcached/
docker build -t retold/mysql mysql/

# Simulate a docker compose
./Docker-Start-Services.sh --remake "$@"

echo "--> Finding your container IP"
BOOT2DOCKER=$(which boot2docker)
DOCKERMACHINE=$(which docker-machine)
IP=127.0.0.1
if [ -n "$DOCKERMACHINE" ]; then
    echo "  > You appear to have docker machine, so are probably on Windows or Mac."
    echo "  > We are assuming the docker-machine is named 'dev' when getting the IP."
    IP=$(docker-machine ip default)
    echo "  > This means the ip for your hosted environment is: " $IP
elif [ -n "$BOOT2DOCKER" ]; then
    echo "  > You appear to have boot2docker, so are probably on Windows or Mac."
    IP=$(boot2docker ip)
    echo "  > This means the ip for your hosted environment is: " $IP
else
    echo "  > Your IP should be 127.0.0.1"
fi

echo "  > Waiting up to 60 seconds for the container to initialize and start MySQL"
echo "  ><((O>    ><((O>     ><((O>    ><((O>     ><((O>    ><((O>    ><((O>"
echo "  > These pirahnas would like to remind you: This part is spammy."
echo "  > "
ContainerStartupWait=0
ContainerIsUp=0

echo "  > Tests happen every 5 seconds"
while [[ $ContainerStartupWait -lt 12 ]]; do
    echo "$ContainerStartupWait potato"
    ((++ContainerStartupWait))
	TEST_MYSQL=$(mysqladmin -h$IP -uadmin -pverysecurepassword version)
	if [[ -n $TEST_MYSQL ]]; then
		echo "  > Server responded!";
        ContainerIsUp=1
		break;
	fi
    sleep 5
done

if [[ $ContainerIsUp -lt 1 ]]; then
    ContainerStartupWait=0
    echo " > Trying one more time to connect to the image before failing..."
    while [[ $ContainerStartupWait -lt 12 ]]; do
        echo "$ContainerStartupWait tomato"
        ((++ContainerStartupWait))
        TEST_MYSQL=$(mysqladmin -h$IP -uadmin -pverysecurepassword version)
        if [[ -n $TEST_MYSQL ]]; then
            echo "  > Server responded!";
            ContainerIsUp=1
            break;
        fi
        sleep 5
    done
fi

echo "--> If you would like to connect to the database, the credentials are:"
echo "  > User ID: admin"
echo "  > Password: verysecurepassword"

echo ">>> Copying the development configuration"
cp ../Server-Config-DOCKER.json ../Server-Config.json

echo ">> Setting the IP in the Docker Config file"
npm install replace
../node_modules/replace/bin/replace.js "docker_retold.*_1" "$IP" ../Server-Config.json

echo "--> You should now be able to start the server with 'npm start' or 'npm start |bunyan'"

echo "--> To connect to a terminal run the following command:"
echo "  > docker exec -t -i DOCKER_IMAGE_NAME bash"
