pacman -S --needed --noconfirm waybar

sudo -u $SUDO_USER -H bash << EOF
    rm -rf ~/.config/waybar
    cp -r "${PROJECT_ROOT}/config/waybar" ~/.config/waybar
EOF