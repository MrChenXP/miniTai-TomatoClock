## miniTai-TomatoClock

### 小泰番茄时钟

- 环境
- node 10.15.3
- 运行项目
- npm start

### electron 文档
1. cd my-electron-app
2. npm init 初始化为 npm 包
3. npm install --save-dev electron
4. package.json
  ```javascript
  {
    "name": "my-electron-app",
    "version": "1.0.0",
    "description": "Hello World!", // 必填
    "main": "main.js", // 入口文件
    "author": "Jane Doe", // 必填
    "license": "MIT",
    "scripts": {
      "start": "electron .",
      // "start": "electron-forge start",
    }
  }
  ```
5. npm start 运行
6. npm install --save-dev @electron-forge/cli
7. npx electron-forge import      设置Forge脚手架
8. npm run make     创建可分发的应用程序 ./out
