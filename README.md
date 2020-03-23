## About siptop

siptop is a Desktop application wrapper around [sipgate.de](https://sipgate.de) built with Electron.

#### Features

- notifications for calls
- runs in the background
- system tray icon

![Screenshot of the application window](./screenshots/main-screen.png)

## Setup

`yarn install`

## Start locally

`yarn start`

## Build

1. Adjust the build script in `package.json` to only include the target platform(s), e.g.: `electron-builder --linux`
2. `yarn build`

Platforms available:

- Linux:`--linux`
- Windows: `--win`
- Mac: `--mac`

### Flatpak (Linux)

#### Dependencies

1. `flatpak install flathub org.electronjs.Electron2.BaseApp`
2. `flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`
3. `flatpak install flathub org.freedesktop.Sdk//19.08`
4. `flatpak install flathub org.freedesktop.Platform//19.08`
5. `dist/siptop-x.x.x.tar.gz` via `yarn build`

#### Build and install

`flatpak-builder build com.greyrook.siptop.json --install --user --force-clean`

#### Run

`flatpak run com.greyrook.siptop`  
or via os launcher

#### Uninstall

`flatpak uninstall com.greyrook.siptop`
