
# Base hyprland install
sudo pacman -S --needed --noconfirm hyprland dunst \
    dolphin wofi xdg-desktop-portal-hyprland \
    qt5-wayland qt6-wayland polkit-kde-agent \
    grim slurp


# Fun extras to make it usable
yay -S --noconfirm --needed hyprpicker hypridle \
    waybar waybar-hyprland wlogout hyprcursor \
    hyprpaper hyprlock pavucontrol
