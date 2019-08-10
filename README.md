# electron-typescript-umi

## 简介
electron-typescript-umi是一个支持typescript和vscode debug的electron基础项目，结合了umi+dva的路由数据流开发方式，提供了最便捷的electron开发体验。

### 环境

1. 全局安装electron(或许在项目中安装比较好)
	```
	npm install electron -g
	```
	若是全局安装后，找不到模块，可以使用`npm link electron`映射, 一个问题electron全局安装，可能出现某些接口异常

2. 根目录安装依赖
	```
	npm install
	```

3. cd到app目录安装依赖
	```
	npm install
	```



### 开发
1. 运行开发环境，以下命令会分别原型umi和打包electron的ts代码到`app/dist`
	```
	npm run dev
	```
	或者在VSCode中`运行任务-develop`
2. 启动electron开发环境
	```
	npm run electron
	```
   或者在VSCode中`启动调试F5`
3. 主线程可以在VSCode中调试，渲染线程还是通过`developer tools`调试吧


单独运行web项目，需要先把electron的相关代码移除，在执行
```
npm run start:umi
```


### 打包
```
npm run pack
```

## 说明
生产环境下的依赖已全部迁移到app中，并且在.umirc.ts中已经作了处理

## 预览


### 最后
初始化时可能会出现某些模块无法引用的情况，重新安装即可