#!/bin/bash

# Configuration
# On the VPS, make sure you are in the project root: /clients/UhurU/website
DB_PATH="./prisma/dev.db"
# If you run this from outside the project (like in /clients/UhurU), adjust to:
# DB_PATH="./website/prisma/dev.db"

BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BAK_FILE="$BACKUP_DIR/dev_backup_${TIMESTAMP}.db"

echo "----> [BACKUP] Iniciando copia de seguridad..."

if [ -f "$DB_PATH" ]; then
    # Using 'sqlite3 .backup' is safer than 'cp' to avoid corruption
    if command -v sqlite3 >/dev/null 2>&1; then
        sqlite3 "$DB_PATH" ".backup '$BAK_FILE'"
    else
        cp "$DB_PATH" "$BAK_FILE"
    fi
    
    echo "----> OK: Copia guardada como '$BAK_FILE'"
    ls -lh "$BAK_FILE"
    
    # Keep only the last 5 backups to save space
    ls -t "$BACKUP_DIR"/dev_backup_*.db | tail -n +6 | xargs rm -f 2>/dev/null
    echo "----> [CLEANUP] Manteniendo solo las últimas 5 copias."
else
    echo "----> ERROR: No se encuentra la base de datos en $DB_PATH"
fi
