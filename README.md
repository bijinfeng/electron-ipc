# @pingtou/electron-ipc

当使用 Electron 框架进行开发时，我们通常需要在主进程和渲染进程之间进行通信。Electron 提供了一种称为 Inter-Process Communication (IPC) 的机制来实现这种通信。

然而，由于 JavaScript 的动态类型特性，IPC 通信可能会出现类型不匹配的问题。为了解决这个问题，可以使用 `@pingtou/electron-ipc`。

`@pingtou/electron-ipc` 可以让你定义消息的类型，并在发送和接收消息时进行类型检查，从而避免类型错误。具体来说，你可以使用 TypeScript 静态类型检查工具来定义消息的类型，然后使用 `@pingtou/electron-ipc` 提供的 API 进行发送和接收消息。

## 安装

```bash
// NPM
$ npm install @pingtou/electron-ipc

// YARN
$ yarn add @pingtou/electron-ipc

// PNPM
$ pnpm add @pingtou/electron-ipc
```

## 用法
