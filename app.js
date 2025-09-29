const { app, BrowserWindow } = require("electron");
const path = require("path");

const WIDTH = 512;
const HEIGHT = 911;

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    resizable: false,
    maximizable: false,
    minimizable: false,
    frame: false,
    transparent: true,
    roundedCorners: true, // works on Windows 11+
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.loadURL("https://lom.joynetgame.com/");

  // Open DevTools (debug URL)
  mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
