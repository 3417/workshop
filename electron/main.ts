const { app, BrowserWindow, ipcMain,Menu,Tray } = require('electron');
const path = require('path');
let mainWindow = null;
let tray = null;
function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, './preload.ts'),
            nodeIntegration: true,
        }
    })
    mainWindow.loadURL(false ? "http://localhost:9527" : `file://${path.join(__dirname, '../dist/index.html')}`)
    // mainWindow.webContents.openDevTools()
    // 窗口最小化
    ipcMain.on('window-min', function () {
        mainWindow.minimize();
    })

    // 窗口最大化
    ipcMain.on('window-max', function () {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    })
    ipcMain.on('window-close', function () {
        mainWindow.close();
    })
    // 新建托盘
    tray = new Tray(path.join(__dirname,'../public/icon.ico'));
    tray.setToolTip('Electron Relax');
    const contextMenu = Menu.buildFromTemplate([
        {
            label:"显示",
            click:()=>{mainWindow.show()}
        },
        {
            label:"退出",
            click:()=>{mainWindow.destroy()}
        }
    ])
    tray.setContextMenu(contextMenu);
    tray.on('double-click',()=>{
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
// 防止多开
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}
