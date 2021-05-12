#!/bin/bash

#List of things that need to be done/started on X startup
#You'll probably want to wipe this and make your own from scratch if you're forking

#Stuff that exits right away
#---------------------------
setxkbmap pt
#Set Laptop Screen as Primary
xrandr --output eDP1 --primary
xrandr --output eDP-1 --primary
#Set Monitors Position (when using Hybrid Graphics)
xrandr --output HDMI-1-0 --auto --right-of eDP1
xset dpms 120
nitrogen --restore
bt off
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets)
xinput set-prop 10 "libinput Scroll Method Enabled" 0, 0, 1
xinput set-prop 9 "libinput Scroll Method Enabled" 0, 0, 1
xrdb -merge ~/.Xresources
#--------------------------

#Stuff that keeps running in background
#--------------------------------------
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
source /etc/X11/xinit/xinitrc.d/50-systemd-user.sh
noisetorch -i &
discover-overlay &
deadd-notification-center &
aw-qt &
#redshift-gtk &
/usr/lib/kdeconnectd &
kdeconnect-indicator &
rambox &
picom &
discord-canary &
#prime-run jellyfin-mpv-shim & - this probably is causing the kernel panics :(
flameshot &
fans auto & #Technically it holds for a few secs, so better keep it here
yubikey-agent -l /home/rg/yubikey-agent.sock &
#spotify &
#$HOME/.config/polybar/launch.sh
udiskie --tray &
#--------------------------------------

#Trash I need to edit later

   #xrandr --output DP-2 --primary --left-of HDMI-0

#When using Discrete Graphics (Nvidia)
#Nvidia command is wrong, fixing next time I switch to discrete graphics
#xrandr --output DP-2 --primary --left-of HDMI-0
#When using Hybrid Graphics (Intel)



