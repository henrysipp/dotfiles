
#!/usr/bin/env bash
set -euo pipefail

for installer in "$PROJECT_ROOT/install/terminal/"*.sh; do
  source "$installer"
done


