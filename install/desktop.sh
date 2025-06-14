
# Run desktop installers
for installer in "${PROJECT_ROOT}/install/desktop/"*.sh; do
  source "$installer"
done


# Run desktop environment installers
for installer in "${PROJECT_ROOT}/install/desktop/${SELECTED_DESKTOP}/"*.sh; do
  source "$installer"
done
