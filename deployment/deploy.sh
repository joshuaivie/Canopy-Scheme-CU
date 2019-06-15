export $(grep -v '^#' ../canopy-scheme-be/.env | xargs -d '\n')

docker-compose down
docker-compose up --build -d

docker-compose run -d --rm be adonis migration:run
docker-compose run -d be adonis kue:listen