### Flatpak
#### Dependencies
1. `flatpak install flathub org.electronjs.Electron2.BaseApp`  
2. `flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`  
3.  `flatpak install flathub org.freedesktop.Sdk//19.08`  
4. `flatpak install flathub org.freedesktop.Platform//19.08`
5. `dist/siptop-x.x.x.tar.gz` via `yarn build`

#### Build and install  
`flatpak-builder build flatpak/com.greyrook.siptop.json --install --user --force-clean`

#### Run  
`flatpak run com.greyrook.siptop`  
or via os launcher

#### Uninstall  
`flatpak uninstall com.greyrook.siptop`  
