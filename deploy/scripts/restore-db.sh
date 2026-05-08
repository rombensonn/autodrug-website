#!/usr/bin/env sh
set -eu

if [ $# -ne 1 ]; then
  echo "Usage: ./deploy/scripts/restore-db.sh path/to/backup.sql.gz"
  exit 1
fi

BACKUP="$1"
TMP_FILE=""

docker compose stop app

if echo "$BACKUP" | grep -q "\.enc$"; then
  if [ -z "${BACKUP_ENCRYPTION_KEY:-}" ]; then
    echo "BACKUP_ENCRYPTION_KEY is required for encrypted backup."
    exit 1
  fi
  TMP_FILE="/tmp/autodrug-restore-$(date +%s).sql.gz"
  openssl enc -d -aes-256-cbc -pbkdf2 -pass "pass:$BACKUP_ENCRYPTION_KEY" -in "$BACKUP" -out "$TMP_FILE"
  BACKUP="$TMP_FILE"
fi

gunzip -c "$BACKUP" | docker compose exec -T postgres psql -U autodrug -d autodrug

if [ -n "$TMP_FILE" ]; then
  rm "$TMP_FILE"
fi

docker compose up -d app
echo "Database restored."
