#!/bin/bash

#List of things that need to be done/started on X startup
#You'll probably want to wipe this and make your own from scratch if you're forking

#Stuff that exits right away
#---------------------------
#Set Laptop Screen as Primary
xrandr --output eDP1 --primary
#Set Monitors Position (when using Hybrid Graphics)
xrandr --output HDMI-1-0 --auto --right-of eDP1
xset dpms 120
nitrogen --restore
bt off

#--------------------------

#Stuff that keeps running in background
#--------------------------------------
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
#noisetorch -i &
discover-overlay &
deadd-notification-center &
aw-qt &
redshift-gtk &
/usr/lib/kdeconnectd &
kdeconnect-indicator &
rambox &
picom &
discord-canary &
#--------------------------------------

#Trash I need to edit later


#When using Discrete Graphics (Nvidia)
#Nvidia command is wrong, fixing next time I switch to discrete graphics
#xrandr --output DP-2 --primary --left-of HDMI-0
#When using Hybrid Graphics (Intel)



