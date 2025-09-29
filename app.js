const { app, BrowserWindow } = require("electron");
const path = require("path");

const WIDTH = 512;
const HEIGHT = 911;

const args = process.argv.slice(1);
const debug = args.includes("--debug");

if (debug) {
  app.commandLine.appendSwitch("remote-debugging-port", "9222");
  console.log("⚡ Debug mode enabled → remote debugging on port 9222");
}

app.commandLine.appendSwitch("disable-background-timer-throttling");
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-backgrounding-occluded-windows");

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
      partition: "persist:lom",
      nodeIntegration: false,
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
  (function () {
    try {
      Object.defineProperty(document, 'hasFocus', {
        configurable: true,
        get: () => true
      });
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => false
      });
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'visible'
      });

      const originalWindowFocus = window.focus;
      window.focus = function () { return true; };

      const shouldIgnore = (target) => {
        return target && (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        );
      };

      const blockEvent = (e) => {
        if (!shouldIgnore(e.target)) {
          e.stopImmediatePropagation();
        }
      };

      window.addEventListener('blur', blockEvent, true);
      window.addEventListener('visibilitychange', blockEvent, true);
      document.addEventListener('visibilitychange', blockEvent, true);

      const dispatchVisibilityEvents = () => {
        try {
          const focusEvent = new Event('focus');
          const visibilityEvent = new Event('visibilitychange');
          window.dispatchEvent(focusEvent);
          document.dispatchEvent(focusEvent);
          document.dispatchEvent(visibilityEvent);
          window.dispatchEvent(visibilityEvent);
        } catch (err) {}
      };

      dispatchVisibilityEvents();
      const intervalId = setInterval(dispatchVisibilityEvents, 5000);
      window.addEventListener('beforeunload', () => clearInterval(intervalId), { once: true });
    } catch (err) {}
  })();
`);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
