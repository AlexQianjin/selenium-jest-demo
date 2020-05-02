# selenium-jest-demo
A sample code for selenium with jest

### Using docker networking
```
$ docker network create grid
$ docker run -d -p 4444:4444 --net grid --name selenium-hub selenium/hub
$ docker run -d --net grid --name selenium-node-chrome -p 5901:5900 -e HUB_HOST=selenium-hub -e NODE_MAX_INSTANCES=5 -e NODE_MAX_SESSION=5 -v /dev/shm:/dev/shm selenium/node-chrome-debug
$ docker run -d --net grid --name selenium-node-firefox -p 5902:5900  -e HUB_HOST=selenium-hub -e NODE_MAX_INSTANCES=5 -e NODE_MAX_SESSION=5 -v /dev/shm:/dev/shm selenium/node-firefox-debug

# Remove all unused networks
$ docker network prune
# OR
# Removes the grid network
$ docker network rm grid
```

### Run Python demo
```
$ docker run --net grid --name test-python -v $PWD:/usr/src/myapp -w /usr/src/myapp python/selenium:v1 python3 segridtest.py
```
