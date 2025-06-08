sudo pacman -Syu
sudo pacman -S git curl unzip

# Run terminal installers
for installer in ~/.local/share/omakase/install/terminal/*.sh; do source $installer; done