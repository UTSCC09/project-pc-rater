build-dev:
	cd pcrater-frontend && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose.yml up

build-local:
	cd pcrater-frontend && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	docker-compose -f docker-compose-production.yml up

build-production:
	cd pcrater-frontend && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	docker-compose -f docker-compose-production.yml up

SSH_STRING:=root@159.203.57.14

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/