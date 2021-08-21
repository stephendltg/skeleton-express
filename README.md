# MODELS APP #

## DOCKER

### ENVIRONNEMENT

- docker version: 19.03.8
- docker-compose version: 1.25.0
- cokpit version [https://cockpit-project.org/]: 215


### POST INSTALL

```bash
#ubuntu
sudo apt install git

#alpine
apk add git
```

```bash
#Get repository
git clone --branch x.x.x https://github.com/stephendltg/skeleton-express

#Update repository
git pull
```

### INSTALL DOCKER

```bash
#ubuntu
sh scripts/install-ubuntu.sh

#alpine
sh scripts/install-alpine.sh
```

### DEPLOY APP

```bash
#ubuntu
sudo docker-compose up -d --build
```

```bash
#alpine
docker-compose up -d --build
```

And then point your browser to `http://localhost:3000`.

You can then scale the server to multiple instances:

```bash
sudo docker-compose up -d --scale=server=3
```


---

## TIPS DOCKER

---

DOCKER: https://docs.docker.com/engine/reference/commandline/

### LOG
> docker logs --tail 1000 -f <container>

### RESTART
> docker restart <container>

### BASH
> docker exec -it <container> bash

### SSHD
> docker run -d -p 22 <container> /usr/sbin/sshd -D

### INSPECT
> docker inspect <container>
> cd /var/lib/docker/volumes

### CONTAINERS LIST
> docker ps -a

### VOLUMES LIST
> docker volume ls

### REMOVE VOLUMES NOT USED
> docker volume prune

### LIST IMAGES
> docker images -a

# DELETE IAMGE
> docker rmi <image>
> docker images purge

### CLEAN SYSTEME

Clean images, container, volumes & network not associated
> docker system prune 

Clean images, container, volumes & network
> docker system prune -a
