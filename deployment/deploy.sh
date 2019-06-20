export $(grep -v '^#' ../canopy-scheme-be/.env | xargs -d '\n')

docker-compose build --no-cache
docker-compose stop
docker-compose rm -f
docker-compose up -d

docker-compose run -d --rm be adonis migration:run --force
docker-compose run -d be adonis kue:listen