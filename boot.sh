set -e

echo -e "\nBegin installation (or abort with ctrl+c)..."

sudo pacman -Syu > /dev/null
sudo pacman -S --noconfirm git >/dev/null

echo "Cloning Omakub..."
rm -rf ~/.local/share/omakase
git clone https://github.com/basecamp/omakub.git ~/.local/share/omakase >/dev/null
if [[ $OMAKUB_REF != "master" ]]; then
	cd ~/.local/share/omakase
	git fetch origin "${OMAKUB_REF:-stable}" && git checkout "${OMAKUB_REF:-stable}"
	cd -
fi

echo "Installation starting..."
source ~/.local/share/omakase/install.sh
