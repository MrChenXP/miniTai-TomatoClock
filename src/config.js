// 程序配置
const { Tray, Menu, app, BrowserWindow } = require('electron');


app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])

/** 最小化到系统托盘 */
const path = require('path');
let tray = null;  // 用来存放系统托盘

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 创建系统托盘
  tray = new Tray(path.join(__dirname, 'img/icon.png'));
  // 菜单模板
  const menu = [
    {
      label: '全屏',
      role: 'togglefullscreen'
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
  // 加载页面文件
  mainWindow.loadFile('../public/index.html');
});