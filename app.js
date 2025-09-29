const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const WIDTH = 512;
const HEIGHT = 911;

const configPath = path.join(__dirname, "config.json");
let config = { debug: false };
try {
  const raw = fs.readFileSync(configPath);
  config = JSON.parse(raw);
} catch {}

if (config.debug) {
  app.commandLine.appendSwitch("remote-debugging-port", "9222");
}

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
    roundedCorners: true,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      partition: "persist:lom"
    },
  });

  mainWindow.loadURL("https://lom.joynetgame.com/");

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.insertCSS(`
      html, body, canvas {
        border-radius: 10px;
        overflow: hidden;
        background: transparent !important;
        background-clip: padding-box;
      }
      * { background-clip: padding-box; }
    `);

    mainWindow.webContents.executeJavaScript(`
      Object.defineProperty(document, 'hasFocus', { get: () => true });
      window.addEventListener('blur', e => { window.focus(); });
    `);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
