#!/usr/bin/env nu

# Install neovim
sudo pacman -S --needed --noconfirm neovim

# # Install luarocks and tree-sitter-cli to resolve lazyvim :checkhealth warnings
# sudo apt install -y luarocks tree-sitter-cli

# Only attempt to set configuration if Neovim has never been run
if not ($"($env.HOME)/.config/nvim" | path exists) {
    # Use LazyVim
    git clone https://github.com/LazyVim/starter ~/.config/nvim
    # Remove the .git folder, so you can add it to your own repo later
    rm -rf ~/.config/nvim/.git
}

# # Replace desktop launcher with one running inside Alacritty
# if ($"($env.HOME)/.local/share/applications" | path exists) {
#     sudo rm -rf /usr/share/applications/nvim.desktop
#     source ~/.local/share/omakub/applications/Neovim.sh
# }