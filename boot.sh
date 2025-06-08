set -e

echo -e "\nBegin installation (or abort with ctrl+c)..."

sudo pacman -Syu > /dev/null
sudo pacman -S --noconfirm --needed git base-devel >/dev/null

echo "Cloning Omakub..."
rm -rf ~/.local/share/omakase
git clone https://github.com/henrysipp/dotfiles.git ~/.local/share/omakase >/dev/null

cd ~/.local/share/omakase
git fetch origin Omakase && git checkout Omakase
cd -

# if [[ $OMAKUB_REF != "master" ]]; then
# 	cd ~/.local/share/omakase
# 	git fetch origin "${OMAKUB_REF:-stable}" && git checkout "${OMAKUB_REF:-stable}"
# 	cd ->term
# fi

echo "Installation starting..."
source ~/.local/share/omakase/install.sh
