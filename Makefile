#!make
PROJECT=app
VERSION=v14.16.1
NVM=v0.38.0

all: 
	docker-compose up -d

install: 
	@echo "Installing project ${PROJECT}..."
	. ${NVM_DIR}/nvm.sh && nvm install ${VERSION} && nvm use ${VERSION}
	npm install

clean:
	@echo "Clean project ${PROJECT}..."
	npm run clean
	rm -rf ./node_modules

demo:
	@echo "Demo project ${PROJECT}..."
	npm run clean
	./bin/www

production:
	@echo "Production project ${PROJECT}..."
	npm run clean
	docker-compose up -d

stop-production:
	@echo "Stop production project ${PROJECT}..."
	docker-compose down

staging:
	@echo "Staging project ${PROJECT}..."
	npm run clean
	docker-compose -f scripts/docker-compose.dev.yml up -d
	sleep 2
	node -r dotenv/config ./bin/www dotenv_config_path=.env.staging

stop-staging:
	docker-compose -f scripts/docker-compose.dev.yml down -v
	npm run clean

dev:
	@echo "Dev project ${PROJECT}..."
	npm run migrate
	npm run migrate:seed
	node_modules/.bin/nodemon -r dotenv/config ./bin/www dotenv_config_path=.env.dev

nvm:
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM}/install.sh | bash


help: 
	@echo "install: Install ${PROJECT}"
	@echo "production: Start production ${PROJECT}"
	@echo "stop-production: Stop production ${PROJECT}"
	@echo "staging: Start staging ${PROJECT}"
	@echo "stop-staging: Start staging ${PROJECT}"
	@echo "dev: Start dev ${PROJECT}"
	@echo "clean: Clean ${PROJECT}"
	@echo "nvm: NVM install${PROJECT}"
