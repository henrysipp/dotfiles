
sudo pacman -S --needed --noconfirm neovim

# # Install luarocks and tree-sitter-cli to resolve lazyvim :checkhealth warnings
# sudo apt install -y luarocks tree-sitter-cli

# Only attempt to set configuration if Neovim has never been run
if [ ! -d "$HOME/.config/nvim" ]; then
  # Use LazyVim
  git clone https://github.com/LazyVim/starter ~/.config/nvim
  # Remove the .git folder, so you can add it to your own repo later
  rm -rf ~/.config/nvim/.git
fi

# # Replace desktop launcher with one running inside Alacritty
# if [[ -d ~/.local/share/applications ]]; then
#   sudo rm -rf /usr/share/applications/nvim.desktop
#   source ~/.local/share/omakub/applications/Neovim.sh
# fi
