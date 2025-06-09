
pacman -S --needed --noconfirm hyprland hypridle hyprlock 

rm -rf ~/.config/hypr
cp "${PROJECT_ROOT}/config/hypr" ~/.config/hypr