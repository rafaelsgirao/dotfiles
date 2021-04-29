#!/bin/bash

if [ "$1" == "inc" ]; then
    xbacklight -inc 5
fi

if [ "$1" == "dec" ]; then
    xbacklight -dec 5
fi

BRIGHTNESS=$(xbacklight -get)
NOTI_ID=$(notify-send.py "🔆" "$BRIGHTNESS%" \
                               \
                         --replaces-process "brightness-popup")
