# Exit immediately if something fails
set -e

# Variables
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_ROOT

# source "${PROJECT_ROOT}/install/terminal/required/app-gum.sh" > /dev/null
# source "${PROJECT_ROOT}/install/first-run-choices.sh"
# source "${PROJECT_ROOT}/install/identification.sh"

echo "Installing terminal and desktop tools..."

source "${PROJECT_ROOT}/install/terminal.sh"
# source "${PROJECT_ROOT}/install/desktop.sh"
