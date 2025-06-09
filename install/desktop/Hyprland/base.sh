
pacman -S --needed --noconfirm hyprland hypridle hyprlock 

sudo -u $SUDO_USER -H bash << EOF
    rm -rf ~/.config/hypr
    cp -r "${PROJECT_ROOT}/config/hypr" ~/.config/hypr
EOF

hyprctl reload