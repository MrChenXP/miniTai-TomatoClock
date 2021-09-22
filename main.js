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
            nodeIntegration: true,
            contextIsolation: false
        }
    })



        /** 最小化到系统托盘 */
        const { Tray, Menu } = require('electron');
        const path = require('path');
        let tray = null;  // 用来存放系统托盘

        // 创建系统托盘
        tray = new Tray(path.join(__dirname, 'public/icon.png')); // (__dirname, 'img/icon.png')
        // 菜单模板
        const menu = [
            {
                label: '显示主窗口',
                id: 'show-window',
                enabled: !win.show,
                click() {
                    win.show();
                }
            },
            {
            label: '退出',
            role: 'quit'
            }
        ];
        // 给系统托盘设置菜单
        tray.setContextMenu(Menu.buildFromTemplate(menu));
        // 给托盘图标设置气球提示
        tray.setToolTip('Electron测试');

    // 将 index.html 文件加载到此窗口中
    win.loadFile('index.html')
    // 打开开发人员工具
    win.webContents.openDevTools()
    

    win.on('minimize', ev => {
        // 阻止最小化
        ev.preventDefault();
        // 隐藏窗口
        win.hide();
      });
    
      // 托盘图标被双击
      tray.on('double-click', () => {
        // 显示窗口
        win.show();
      });
    
      // 窗口隐藏
      win.on('hide', () => {
        // 启用菜单的显示主窗口项
        menu.getMenuItemById('show-window').enabled = true;
        // 重新设置系统托盘菜单
        tray.setContextMenu(menu);
      });
    
      // 窗口显示
      win.on('show', () => {
        // 禁用显示主窗口项
        menu.getMenuItemById('show-window').enabled = false;
        // 重新设置系统托盘菜单
        tray.setContextMenu(menu);
      });


    
        
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

