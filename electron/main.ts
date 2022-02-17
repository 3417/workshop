const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
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
