sudo pacman -Syu
sudo pacman -S --noconfirm git curl unzip

# Run terminal installers
for installer in "${PROJECT_ROOT}/install/terminal/"*.sh; do
  source "$installer"
done