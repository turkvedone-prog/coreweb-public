#!/bin/bash

# Vercel Ignored Build Step Custom Filter Script
# exit 0 = SKIP build
# exit 1 = BUILD project

# Enable strict mode
set -euo pipefail

echo "=============================================="
echo "Vercel Build Filter Script started"
echo "Current directory: $(pwd)"
echo "APP_SLUG: ${APP_SLUG:-(empty)}"
echo "VERCEL_GIT_PREVIOUS_SHA: ${VERCEL_GIT_PREVIOUS_SHA:-(empty)}"
echo "VERCEL_GIT_COMMIT_REF: ${VERCEL_GIT_COMMIT_REF:-(empty)}"
echo "=============================================="

# 1. Fail-open: Check if APP_SLUG is defined
if [ -z "${APP_SLUG:-}" ]; then
  echo "FAIL-OPEN: APP_SLUG is not defined. Proceeding with BUILD."
  exit 1
fi

# Valid slugs mapping check
VALID_SLUGS=("capilon" "burobig" "viola" "burckaplama" "coreweb")
IS_VALID_SLUG=0
for slug in "${VALID_SLUGS[@]}"; do
  if [ "$APP_SLUG" = "$slug" ]; then
    IS_VALID_SLUG=1
    break
  fi
done

if [ "$IS_VALID_SLUG" -eq 0 ]; then
  echo "FAIL-OPEN: APP_SLUG '$APP_SLUG' is unknown. Proceeding with BUILD."
  exit 1
fi

# 2. Fail-open: Check if VERCEL_GIT_PREVIOUS_SHA is defined
if [ -z "${VERCEL_GIT_PREVIOUS_SHA:-}" ]; then
  echo "FAIL-OPEN: VERCEL_GIT_PREVIOUS_SHA is not defined (first build or new branch). Proceeding with BUILD."
  exit 1
fi

# 3. Fail-open: Check if git is available and if it's a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "FAIL-OPEN: Not inside a Git work tree or Git is unavailable. Proceeding with BUILD."
  exit 1
fi

# 4. Fail-open: Check if previous SHA exists in the local Git history
if ! git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
  echo "FAIL-OPEN: Previous SHA '$VERCEL_GIT_PREVIOUS_SHA' is not found in local Git history (shallow clone or branch mismatch). Proceeding with BUILD."
  exit 1
fi

# 5. Fail-open: Get git diff
if ! CHANGED_FILES=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD 2>/dev/null); then
  echo "FAIL-OPEN: git diff failed. Proceeding with BUILD."
  exit 1
fi

echo "--- Changed Files List ---"
echo "$CHANGED_FILES"
echo "--------------------------"

# If there are no changed files, we can skip
if [ -z "$CHANGED_FILES" ]; then
  echo "SKIP: No files changed. Skipping build."
  exit 0
fi

# 6. Check root critical config/lock files
CRITICAL_ROOT_FILES=(
  "package.json"
  "package-lock.json"
  "turbo.json"
  "vercel.json"
)

for file in "${CRITICAL_ROOT_FILES[@]}"; do
  if echo "$CHANGED_FILES" | grep -Fxq "$file"; then
    echo "BUILD: Critical root config file '$file' changed. Proceeding with BUILD."
    exit 1
  fi
done

# 7. Check if packages/shared-ui changed for relevant apps (all except coreweb)
if [ "$APP_SLUG" != "coreweb" ]; then
  if echo "$CHANGED_FILES" | grep -q "^packages/shared-ui/"; then
    echo "BUILD: shared-ui package changed, and APP_SLUG '$APP_SLUG' depends on shared-ui. Proceeding with BUILD."
    exit 1
  fi
fi

# 8. Check app-specific source and asset paths
case "$APP_SLUG" in
  capilon)
    # apps/capilon/
    # public/assets/capilon/
    if echo "$CHANGED_FILES" | grep -q -E "^apps/capilon/|^public/assets/capilon/"; then
      echo "BUILD: Capilon application files or assets changed. Proceeding with BUILD."
      exit 1
    fi
    ;;
  burobig)
    if echo "$CHANGED_FILES" | grep -q -E "^apps/burobig/|^public/assets/burobig/"; then
      echo "BUILD: Burobig application files or assets changed. Proceeding with BUILD."
      exit 1
    fi
    ;;
  viola)
    if echo "$CHANGED_FILES" | grep -q -E "^apps/viola/|^public/assets/viola/"; then
      echo "BUILD: Viola application files or assets changed. Proceeding with BUILD."
      exit 1
    fi
    ;;
  burckaplama)
    if echo "$CHANGED_FILES" | grep -q -E "^apps/burckaplama/|^public/assets/burckaplama/"; then
      echo "BUILD: Burckaplama application files or assets changed. Proceeding with BUILD."
      exit 1
    fi
    ;;
  coreweb)
    if echo "$CHANGED_FILES" | grep -q -E "^apps/coreweb/|^public/assets/coreweb/"; then
      echo "BUILD: Coreweb application files or assets changed. Proceeding with BUILD."
      exit 1
    fi
    ;;
esac

# 9. Default action: SKIP build
echo "SKIP: No build-triggering changes detected for APP_SLUG '$APP_SLUG'. Skipping build."
exit 0
