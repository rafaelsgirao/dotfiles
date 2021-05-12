#!/bin/bash
# Lock screen displaying this image.
i3lock \
	-B 10 \
	--force-clock \
	--indicator \
	--insidevercolor=#2e2e2fff \
	--insidewrongcolor=#2e2e2fff \
	--insidecolor=#2e2e2fff \
	--ringvercolor=#7cbbe6ff \
	--ringwrongcolor=#be3badff \
	--ringcolor=#2e2e2f00 \
	--line-uses-inside \
	--keyhlcolor=#7cbbe6ff \
	--bshlcolor=#be3badff \
	--separatorcolor=#01010101 \
	--verifcolor=#7cbbe6ff \
	--wrongcolor=#be3badff \
	--timecolor=#7cbbe6ff \
	--timestr="%H:%M:%S" \
	--datecolor=#7f7f7fff \
	--datestr="%D" \
	--timesize=36 \
	--datesize=20 \
	--greetersiz=22 \
	--verifsize=22 \
	--wrongsize=22 \
	--greetertext="" \
	--greetercolor=#7f7f7fff \
	--veriftext="" \
	--wrongtext="" \
	--noinputtext="" \
	--locktext="" \
	--lockfailedtext="Fail!" \
	--radius 100 \
	--ring-width 8.0 \
	--show-failed-attempts \
	--ignore-empty-password \
	--keylayout 2 \
	--pass-media-keys \
	--pass-screen-keys \
	--pass-power-keys \
	--pass-volume-keys \

# Turn the screen off after a delay.
#sleep 150; pgrep i3lock && xset dpms force off

# Hibernate after 15min
#sleep 300; pgrep i3lock && systemctl suspend
