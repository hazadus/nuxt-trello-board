up_dev:
	docker compose -f docker-compose.dev.yml up --build
up_prod:
	docker compose -f docker-compose.prod.yml up -d --build
down:
	docker compose -f docker-compose.prod.yml down
update:
	make down
	docker system prune -f -a --volumes
	git pull
	make up_prod