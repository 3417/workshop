const { app, BrowserWindow, ipcMain, Menu, Tray, dialog } = require('electron');
const path = require('path');
let mainWindow = null;
let loading = null;
let tray = null;
const NODE_DEV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';
console.log(NODE_DEV)
function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        show:false,
        width: 900,
        height: 600,
        frame: false,
        // maximizable: false,  //禁止双击放大
        webPreferences: {
            preload: path.join(__dirname, './preload.ts'),
            nodeIntegration: true,
        }
    })
    loading = new BrowserWindow({
        frame: false,
        width: 500,
        height: 462,
        transparent: true,
        resizeble: false,
        alwaysOnTop:true,
        center:true
    })
    loading.loadURL(`file://${path.join(__dirname, NODE_DEV === 'dev' ? '../public/splash.html' : '../dist/splash.html')}`)
    loading.show();
    mainWindow.loadURL(NODE_DEV === 'dev' ? "http://localhost:9527" : `file://${path.join(__dirname, '../dist/index.html')}`)
    // mainWindow.webContents.openDevTools()
    mainWindow.once('ready-to-show',function(){
        setTimeout(() => {
            loading.destroy();
            mainWindow.show();
            mainWindow.webContents.send('main_show','ready');
        }, 6*1000);
    })
    // 窗口最小化
    ipcMain.on('window-min', function () {
        mainWindow.minimize();
    })
    // 窗口最大化
    ipcMain.on('window-max', function (evt, arg) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
        evt.sender.send('window-resize', mainWindow.isMaximized());
    })
    ipcMain.on('window-close', function () {
        mainWindow.close();
    })
    ipcMain.on('window-download', function (evt, arg) {
        mainWindow.webContents.downloadURL(arg);
    })
    // 新建托盘
    tray = new Tray(path.join(__dirname, NODE_DEV === 'dev' ? '../public/icon.ico' : '../dist/icon.ico'));
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
    // 屏蔽拖拽的右键事件(生产环境无效)
    // mainWindow.hookWindowMessage(278, function (e) {
    //     mainWindow.blur();
    //     mainWindow.focus();
    //     mainWindow.setEnabled(false);
    //     setTimeout(() => {
    //         mainWindow.setEnabled(true);
    //     }, 100);
    //     return true;
    // })
}


app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
        // 防止多开
        const gotTheLock = app.requestSingleInstanceLock()
        if (!gotTheLock) {
            app.quit()
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
