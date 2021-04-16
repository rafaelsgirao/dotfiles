# Rafael's Dotfiles

These are the dotfiles for my Arch Linux setup.

![Sample Screenshot](Example.png)

## Installation

Clone the repo and use stow (or create symlinks) to link to the correct directories.

### Wayland
Sway/Wayland files are included but incomplete and on-hold until Wayland/Sway become more mature for use with my system.
Expect everyting to be X-centric for now.


## Packages

The following packages were used:

| Name                                                                  | Package Manager                                                                 | Description                       | Used for                                 |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :-------------------------------- | ---------------------------------------- |
| `i3-gaps`                                                             | `yay`                                                                           | Window Manager                    | Desktop Environment                      |
| `i3lock-color`                                                        | `yay`                                                                           | Lockscreen                        |                                          |
| `i3status`                                                            | `pacman`                                                                        | Feeds info into i3's status bar   |
| `dmenu`                                                               | `pacman`                                                                        | App Launcher                      |                                          |
| `picom-git`                                                           | `yay`                                                                           | Compositor for X11                | i3bar and Alacritty transparency         |
| `inter-font`                                                          | `pacman`                                                                        | Font                              |                                          |
| `acpilight`                                                           | `yay`                                                                           | Brightness control keybinds       |                                          |
| `alsa-utils`, `pulseaudio`, `pulseaudio-alsa`, `pulseaudio-bluetooth` | `pacman`                                                                        | Audio support                     | Audio Management                         |  |
| `feh`                                                                 | `pacman`                                                                        | Image viewer                      |
| `adapta-gtk-theme`                                                    | `pacman`                                                                        | Dark mode GTK Theme               | Theming for Nemo/GTK apps                |
| `lxappearance`                                                        | `pacman`                                                                        | GTK Theme/Icon Manager            |
| `dunst`                                                               | `pacman`                                                                        | Notification Displayer            |
| `discover-overlay`                                                    | `yay`                                                                           | Discover Overlay                  |
| `noisetorch`                                                          | [`manually.`](https://github.com/lawl/NoiseTorch#third-party-packages-like-aur) | Image viewer                      |
| `feh`                                                                 | `pacman`                                                                        | Image viewer                      |
| `nitrogen`                                                            | `pacman`                                                                        | Wallpaper Manager                 |                                          |
| `flameshot`                                                           | `pacman`                                                                        | Screenshot tools                  |                                          |
| `xorg-xprop`                                                          | `pacman`                                                                        | Property displayer for X          | Awesome custom titlebars for each client |
| `imagemagick`                                                         | `pacman`                                                                        | Image viewing/manipulation        |                                          |
| `blueman`                                                             | `pacman`                                                                        | Bluetooth management              |                                          |
| `redshift`                                                            | `pacman`                                                                        | Color temperature of display      |                                          |
| `upower`                                                              | `pacman`                                                                        | Battery CLI tool                  |                                          |
| `noto-fonts-emoji`                                                    | `pacman`                                                                        | Google Noto emoji fonts           | Emoji characters on i3status             |
| `nerd-fonts-cjk`                                                      | `yay`                                                                           | Kaomoji support                   | Rofi unicode font                        |
| `ffmpeg`                                                              | `pacman`                                                                        | Video recorder, converter, etc    |                                          |
| `nemo`                                                                | `pacman`                                                                        | File explorer                     | File explorer                            |
| `alacritty`                                                           | `pacman`                                                                        | Terminal                          | Default Terminal Emulator                |  |  |
| `playerctl`                                                           | `pacman`                                                                        | Media Player Controller           | Keyboard media keys                      |
| `spicetify-cli-git`                                                   | `yay`                                                                           | Spotify Customization             | Applying themes to Spotify               |
| `neovim`                                                              | `yay`                                                                           | Vim replacement                   | Better than vim.                         |
| `arandr` | `yay` | 
## Credits

- Inspired by [Diogo Correia's dotfiles](https://github.com/diogotcorreia/dotfiles)
- I stole the wallpapers from reddit a long time ago, if you know who to credit let me know :(