

# Introduction

APP is composed of two parts: a middleware by nodejs and a database by mariaDB or SQlite (demo version)

::: tip CONNECTION
Connection API - Administrator

Default login: **epyo**

Default password: **epyo**
:::

<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/auth \
    --header 'Authorization: Basic ZXB5bzplcHlv'
```
</CURL>


## INSTALLATION

### POST INSTALL
```bash
#ubuntu
sudo apt install git

#alpine
apk add git
```

```bash
#Get repository epyo-visiom
git clone --branch x.x.x https://bitbucket.org/epyodev/epyo-visiom

#Update repository
git pull
```

### INSTALL PRODUCTION DOCKER

#### Install

::: tip Docker
Docker version: **19.03.8**

Docker-compose version: **1.25.0**

Dokpit version [https://cockpit-project.org/]: **215**
:::

```bash
#ubuntu
sh scripts/install-ubuntu.sh

#alpine
sh scripts/install-alpine.sh
```

#### Deploy app

```bash
#ubuntu
sudo docker-composer up -d
```

```bash
#alpine
docker-composer up -d
```

### INSTALL DEMO 

::: tip Nodejs
Install <a href="https://nodejs.org/en/">Nodejs</a> **LTS** version
:::

```bash
#macos #linux #window
npm run demo
```


### INSTALL DEVELOPMENT 

::: tip NVM
Install <a href="https://github.com/nvm-sh/nvm">NVM</a>
:::

```bash
#linux #macos
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

```bash
#linux #macos
nvm install 14.16.1
nvm use 14.16.1
```

::: tip Docker
Docker version: **19.03.8**

Docker-compose version: **1.25.0**

Dokpit version [https://cockpit-project.org/]: **215**

<a href="https://docs.docker.com/docker-for-mac/install/">Insall docker macos</a>
:::

```bash
#ubuntu
sh scripts/install-ubuntu.sh
```

**RUN APP**

```bash
#linux #macos
npm run dev
```

**OR**

```bash
#linux #macos
npm run docker:dev:start
npm run dev:staging
```