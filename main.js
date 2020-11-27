// 管理应用程序的生命周期事件，以及创建和控制浏览器窗口
const {
    app,
    BrowserWindow
} = require('electron')

// 创建一个 新的浏览窗口 启用了节点集成
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 将 index.html 文件加载到此窗口中
    win.loadFile('index.html')
    // 打开开发人员工具
    win.webContents.openDevTools()
}

// 初始化 时 创建一个新的窗口
app.whenReady().then(createWindow)

// 添加一个侦听器，当应用程序不再有任何打开窗口时试图退出。 因为操作系统 窗口管理行为 ，此监听器在 macOS 上是一个禁门。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 添加一个侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后，或重新启动已在运行的应用程序
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
