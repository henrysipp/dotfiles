# set -e
# trap 'echo "Installation failed! You can retry by running: source dotfiles/install.sh"' ERR


# Variables
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_ROOT

# Update system before doing anything
sudo pacman -Syu

echo "Installing terminal and desktop tools"

source "${PROJECT_ROOT}/install/core.sh"

source "${PROJECT_ROOT}/install/terminal.sh"
source "${PROJECT_ROOT}/install/desktop.sh"

echo "Done-zo bozo"

stow .
