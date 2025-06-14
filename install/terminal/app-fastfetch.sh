# Variables
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sudo pacman -S --needed --noconfirm fastfetch

# if [ ! -f "$HOME/.config/fastfetch/config.jsonc" ]; then
#   # Use Omakub fastfetch config
#   mkdir -p ~/.config/fastfetch
#   cp ~/.local/share/omakub/configs/fastfetch.jsonc ~/.config/fastfetch/config.jsonc
# fi
