# Run desktop installers
for installer in "${PROJECT_ROOT}/install/framework/"*.sh; do
  source "$installer"
done
