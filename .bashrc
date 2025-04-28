#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

export SYSTEMD_EDITOR="nvim"

export GDK_SCALE=2
export GDK_DPI_SCALE=-1.5

export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_SCREEN_SCALE_FACTORS=1.5
export QT_DPI=137 # Optional, for fine-tuning DPI

export ELECTRON_OZONE_PLATFORM_HINT=auto

if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
  sleep 1 && exec Hyprland
fi
