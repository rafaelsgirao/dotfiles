setxkbmap pt
xinput set-prop 10 "libinput Scroll Method Enabled" 0, 0, 1
xinput set-prop 9 "libinput Scroll Method Enabled" 0, 0, 1
flameshot &
yubikey-agent -l /home/rg/yubikey-agent.sock &
spotify &
xrdb -merge ~/.Xresources
xrandr --output DP-2 --primary --left-of HDMI-0
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets)
i3 

