#!/usr/bin/env bash
# Instalador do bundle de skills do Sávio Radé Sordi
set -euo pipefail

DEST="${1:-/mnt/skills/user}"
SRC="$(cd "$(dirname "$0")" && pwd)/skills"

echo "Instalando skills de: $SRC"
echo "Destino: $DEST"
mkdir -p "$DEST"

count=0
for dir in "$SRC"/*/; do
  name="$(basename "$dir")"
  cp -r "$dir" "$DEST/"
  echo "  ✓ $name"
  count=$((count+1))
done

echo "Concluído: $count skills instaladas em $DEST"
