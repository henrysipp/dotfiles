# Exit immediately if something fails
set -e

source ~/.local/share/omakase/install/required/app-gum.sha > /dev/null
source ~/.local/share/omakase/install/first-run-choices.sh
source ~/.local/share/omakase/install/identification.sh

# Variables
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_ROOT

echo "Installing terminal and desktop tools..."

source ~/.local/share/omakase/install/terminal.sh
source ~/.local/share/omakase/install/desktop.sh
