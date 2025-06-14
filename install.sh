#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_ROOT

source "$PROJECT_ROOT/install/terminal/required/app-gum.sh" > /dev/null
source "$PROJECT_ROOT/install/first-run-choices.sh"

echo "Installing terminal and desktop tools..."

source "$PROJECT_ROOT/install/terminal.sh"
source "$PROJECT_ROOT/install/desktop.sh"

gum confirm "Reboot to apply all settings?" && sudo reboot
