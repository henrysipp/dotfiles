#!/usr/bin/env nu

# Variables
let dir = ($env.FILE_PWD)

# Install fastfetch
sudo pacman -S --needed --noconfirm fastfetch

# Configuration section (commented out)
# if not ($"($env.HOME)/.config/fastfetch/config.jsonc" | path exists) {
#     # Use Omakub fastfetch config
#     mkdir ($"($env.HOME)/.config/fastfetch" | path expand)
#     cp ~/.local/share/omakub/configs/fastfetch.jsonc ~/.config/fastfetch/config.jsonc
# }