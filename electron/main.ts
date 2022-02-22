const { app, BrowserWindow, ipcMain, Menu, Tray,dialog } = require('electron');
const path = require('path');
let mainWindow = null;
let tray = null;
const NODE_DEV = process.env.NODE_ENV ? process.env.NODE_ENV.trim():'';
console.log(NODE_DEV)
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
    mainWindow.loadURL(NODE_DEV === 'dev' ? "http://localhost:9527" : `file://${path.join(__dirname, '../dist/index.html')}`)
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
    // FIXME:下载图片
    ipcMain.on('window-download',function(evt,arg){
        console.log('数据消息==>',arg);
        mainWindow.webContents.downloadURL(arg);
    })
    // 新建托盘
    tray = new Tray(path.join(__dirname, '../public/icon.ico'));
    tray.setToolTip('Electron Relax');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "显示",
            click: () => { mainWindow.show() }
        },
        {
            label: "退出",
            click: () => { mainWindow.destroy() }
        }
    ])
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
    })
    // 屏蔽拖拽的右键事件
    mainWindow.hookWindowMessage(278, function (e) {
        mainWindow.blur();
        mainWindow.focus();
        mainWindow.setEnabled(false);
        setTimeout(() => {
            mainWindow.setEnabled(true);
        }, 100);
        return true;
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
