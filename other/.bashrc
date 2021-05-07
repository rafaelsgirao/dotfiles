# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '

export PATH=$PATH:$HOME/.local/bin

if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
    startx &> /dev/null
    exit
fi

export SSH_AUTH_SOCK="$HOME/yubikey-agent.sock"


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
  lockScreen.sh 
  systemctl suspend
}

wifi () {
  sudo killall wpa-supplicant
  sudo systemctl stop wpa_supplicant
  sudo wpa_supplicant -B -i wlo1 -c /etc/wpa_supplicant/wpa_supplicant.conf
}

vpn() {
  sudo openvpn --config $HOME/.tecnico.ovpn --daemon ist_vpn 
}

kvpn() {
	sudo killall openvpn
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
#Obviously you probably don't want this if you don't use gems/ruby 

PATH=$PATH:$HOME/.local/share/gem/ruby/3.0.0/bin/

susu() {
	sudo su - $1
}

ab()  { #Short for AirBuds ON
	if [ "$1" == "on" ]; then
			
	{ echo "power on"
	  echo "scan on"
	  echo "connect 1C:91:9D:D6:6D:BF"
	 } | bluetoothctl

 	fi

	if [ "$1" == "off" ]; then
	echo "disconnect" | bluetoothctl
	fi
}

bt() {
	if [ "$1" == "off" ]; then
		echo "power off" | bluetoothctl
	fi

	
	if [ "$1" == "on" ]; then
		{ echo "power on"
		  echo "scan on"
		} | bluetoothctl
	fi

}

fans() {
	if [ "$1" == "auto" ]; then
		nbfc set -a -f 0
		nbfc set -a -f 1 
	else	
	nbfc set -s $1 -f 0
	nbfc set -s $1 -f 1
	fi
}

batmode() #Aggressive optimizations to get the most out of laptop battery
{
	#rfkill block bluetooth
	#sudo rmmod bluetooth
	bt off
	sudo x86_energy_perf_policy --all power
	sudo powertop --auto-tune
	noisetorch -u
	killall kdeconnectd
	killall kdeconnect-indicator
	killall rambox
	killall spotify
	killall discover-overlay
	killall jellyfin-mpv-shim
}

atped() {
	cd $HOME/repos/ATPED/
	python main.py
}

export HISTFILESIZE=10000
export HISTSIZE=10000
shopt -s histappend
PROMPT_COMMAND='history -a'
export EDITOR=nvim
export VISUAL=nvim

