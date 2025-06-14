PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_ROOT

SELECTED_DESKTOP="Hyprland"
for installer in "${PROJECT_ROOT}/install/desktop/${SELECTED_DESKTOP}/"*.sh; do
  source "$installer"
done
