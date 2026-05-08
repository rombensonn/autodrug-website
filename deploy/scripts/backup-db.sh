#!/usr/bin/env sh
set -eu

BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
STAMP="$(date +%Y%m%d-%H%M%S)"
FILE="$BACKUP_DIR/autodrug-$STAMP.sql.gz"

mkdir -p "$BACKUP_DIR"

docker compose exec -T postgres pg_dump -U autodrug autodrug | gzip > "$FILE"

if [ -n "${BACKUP_ENCRYPTION_KEY:-}" ]; then
  openssl enc -aes-256-cbc -salt -pbkdf2 -pass "pass:$BACKUP_ENCRYPTION_KEY" -in "$FILE" -out "$FILE.enc"
  rm "$FILE"
  FILE="$FILE.enc"
fi

find "$BACKUP_DIR" -type f -mtime +"$RETENTION_DAYS" -name "autodrug-*" -delete
echo "Backup created: $FILE"
