#!/usr/bin/env bash
# Exporte l'image d'aperçu social : .github/assets/og-image.svg → public/og-image.png (1200×630).
#
# macOS uniquement : utilise le moteur de rendu de Quick Look (qlmanage, basé sur WebKit) et sips,
# fournis avec le système. Aucune dépendance à installer.
#
# Principe : Quick Look fait une vignette carrée de 1280 px d'une page de 1024 px de large
# (facteur ×1,25). On centre donc l'image à 960×504 px dans la page : elle sort à 1200×630,
# puis sips recadre au centre.
#
# Usage : ./scripts/export-og-image.sh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT # nettoie le dossier temporaire, même en cas d'erreur

cp "$root/.github/assets/og-image.svg" "$work/"
cat > "$work/page.html" <<'EOF'
<!doctype html><html><body style="margin:0;width:1024px;height:1024px;display:flex;align-items:center;justify-content:center">
<img src="og-image.svg" style="width:960px;height:504px;display:block">
</body></html>
EOF

qlmanage -t -s 1280 -o "$work" "$work/page.html" >/dev/null 2>&1
sips -c 630 1200 "$work/page.html.png" --out "$root/public/og-image.png" >/dev/null

size="$(sips -g pixelWidth -g pixelHeight "$root/public/og-image.png" | awk '/pixel/ {print $2}' | paste -sd x -)"
if [ "$size" != "1200x630" ]; then
  echo "Erreur : l'image fait $size au lieu de 1200x630." >&2
  exit 1
fi
echo "public/og-image.png exportée ($size)."
