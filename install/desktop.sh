#!/usr/bin/env bash
set -euo pipefail

for installer in "$PROJECT_ROOT/install/desktop/"*.sh; do
  source "$installer"
done

for installer in "$PROJECT_ROOT/install/desktop/$SELECTED_DESKTOP/"*.sh; do
  source "$installer"
done
