const { app, BrowserWindow, Menu, Tray, Notification } = require("electron");
const path = require("path");

let mainWindow;
let tray = null;
let isClosing = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    title: "siptop",
    autoHideMenuBar: true
  });

  mainWindow.loadURL("https://app.sipgate.com/gsuite");
  mainWindow.webContents.on("media-started-playing", () => {
    let notification = new Notification({
      title: "sipgate",
      body: "You are getting called!"
    });

    notification.on("click", () => {
      mainWindow.show();
      mainWindow.focus();
    });

    notification.show();
  });

  mainWindow.on("minimize", function(event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", function(event) {
    if (!isClosing) {
      event.preventDefault();
      mainWindow.hide();
    } else {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    }
  });

  tray = new Tray(path.join(__dirname,"static/tray-icon.png"));
  tray.setToolTip("Open");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function() {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    {
      label: "Quit",
      click: function() {
        isClosing = true;
        mainWindow.close();
        mainWindow = null;
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
