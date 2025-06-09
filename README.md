Portas:

backend: 8001
frontend: 8085
phpmyadmin: 8002
mailhog: 8003

passo a passo para rodar

docker compose up --build -d

docker compose run --rm composer install
docker compose run --rm npm install

docker compose run --rm artisan key:generate

docker compose run --rm artisan migrate


ATENÇÃO: INCOMPLETO, MAIS ALTERAÇÕES PELO GIT

https://github.com/GuiScotti/tcc.git