#!/usr/bin/env bash
set -euo pipefail

TEMPLATE="${1:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEMO_DIR="$ROOT_DIR/scripts/demo-mode"
APP_BLOG="$ROOT_DIR/app/blog"

usage() {
  echo "Usage: $0 <default|studio|studio-dark|outrank-classic|editorial|signal|journal>"
  exit 1
}

[[ -z "$TEMPLATE" ]] && usage

cd "$ROOT_DIR"

case "$TEMPLATE" in
  default)
    git checkout HEAD -- app/blog
    git clean -fd app/blog >/dev/null
    ;;
  studio|studio-dark|outrank-classic|editorial|signal|journal)
    if [[ ! -d "templates/$TEMPLATE/blog" ]]; then
      echo "Template not found: templates/$TEMPLATE/blog"
      exit 1
    fi
    rm -rf "$APP_BLOG"
    cp -R "templates/$TEMPLATE/blog" "$APP_BLOG"
    ;;
  *)
    usage
    ;;
esac

cp "$DEMO_DIR/outrank.ts" "$APP_BLOG/_lib/outrank.ts"
cp "$DEMO_DIR/mockArticles.ts" "$APP_BLOG/_lib/mockArticles.ts"

if ! grep -q OUTRANK_API_KEY_PLACEHOLDER "$APP_BLOG/_lib/constants.ts"; then
  printf "\nexport const OUTRANK_API_KEY_PLACEHOLDER = 'your_outrank_blog_api_key';\n" \
    >> "$APP_BLOG/_lib/constants.ts"
fi

echo "Switched to template: $TEMPLATE"
echo "Open http://localhost:3000/blog (dev server hot-reloads automatically)."
