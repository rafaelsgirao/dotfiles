# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '

export PATH=$PATH:/home/rg/.local/bin

if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
    startx &> /dev/null
    exit
fi

export SSH_AUTH_SOCK="/home/rg/yubikey-agent.sock"


resetcard() {
  rm -r ~/.gnupg/private-keys-v1.d
  gpgconf --kill gpg-agent
  gpg --card-status
}

iaed() {
  gcc -ansi -pedantic -Wall -Wextra -Werror -g3 $1
}

otp() {
  killall -HUP yubikey-agent
  ykman oath code
}

#Sleep and lock -> sal
sal() {
  playerctl pause
  playerctl pause -p spotify
  lockscreen 
  systemctl suspend
}

lockscreen() {
 i3lock -i ~/.config/i3/i3lock.png -t -e -f -k -S --indicator --keylayout 2 --pass-media-keys --pass-screen-keys --pass-volume-keys --pass-power-keys 
}

wifi () {
  sudo killall wpa-supplicant
  sudo systemctl stop wpa_supplicant
  sudo wpa_supplicant -B -i wlo1 -c /etc/wpa_supplicant/wpa_supplicant.conf
}

vpn() {
  sudo openvpn ~/.tecnico.ovpn --daemon ist_vpn
}

sway_sal() {
  playerctl pause
  playerctl pause -p spotify
  swaylock --clock --indicator -l --fade-in 1 -i ~/.config/sway/swaylock.png --indicator-radius 250 & 
  systemctl suspend
}
rcu() {
  cd ~/rcu/rcu/src/
  source env-rcu/bin/activate
  python main.py &
}
