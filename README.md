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

1. 定义主进程和渲染进程通信的消息类型

```typescript
//  从渲染进程传过来的消息类型
export type RenderMessage = {
  ping: (text: string) => Promise<string>;
};

//  从主进程发送到渲染进程的消息类型
export type MainMessage = {
  pong: (text: string) => void;
};
```

2. 在主进程中创建一个 `IpcMain` 实例

```typescript
import { IPCMain } from '@pingtou/electron-ipc';

import type { MainMessage, RenderMessage } from './types';

export const ipcMain = new IPCMain<RenderMessage, MainMessage>();
```

3. 在渲染进程中创建一个 `IpcRenderer` 实例

```typescript
import { IPCRenderer } from '@pingtou/electron-ipc';

import type { MainMessage, RenderMessage } from './types';

export const ipcRenderer = new IPCRenderer<RenderMessage, MainMessage>();
```

4. 在 `preload` 中设置通信的桥接

```typescript
import { contextBridge, ipcRenderer as baseIpcRenderer } from 'electron';

import { ipcRenderer } from './ipc-renderer';

ipcRenderer.bindBridge(contextBridge, baseIpcRenderer);
```

5. 在主进程中监听该消息类型的事件，并发送该类型的消息

```typescript
ipcMain.on('ping', async (text) => {
  console.log('main process listener message: ', text);
  return 'ping';
});

ipcMain.send('pong', 'pong');
```

6. 在渲染进程中发送该类型的消息，并接收回复消息

```typescript
ipcRenderer.send('ping', 'ping').then((text) => {
  console.log(text);
});

ipcRenderer.on('pong', (text) => {
  console.log(text);
});
```
