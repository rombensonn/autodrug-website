#!/usr/bin/env sh
set -eu

APP_DIR="${APP_DIR:-/opt/autodrug-website}"
cd "$APP_DIR"

git pull --ff-only
docker compose build
docker compose up -d postgres
docker compose run --rm app npx prisma migrate deploy
docker compose up -d

echo "Waiting for health check..."
for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1/api/health >/dev/null; then
    echo "Autodrug website is healthy."
    docker compose ps
    exit 0
  fi
  sleep 2
done

echo "Health check failed."
docker compose logs --tail=120 app
exit 1
