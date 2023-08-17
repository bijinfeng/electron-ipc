import type { ContextBridge, IpcRenderer } from 'electron';

export const IPC_GLOBAL_NAME = 'ipcChannel';

declare global {
  interface Window {
    [IPC_GLOBAL_NAME]: {
      send: any;
    };
  }
}

type MessageObj<T> = {
  [K in keyof T]: (...args: any) => void;
};

export class IPCRenderer<
  MessageType extends MessageObj<MessageType>,
  BackgroundMessageType extends MessageObj<BackgroundMessageType>,
> {
  channel: string;
  listeners: Partial<Record<keyof BackgroundMessageType, any>> = {};

  constructor(channel = 'IPC-bridge') {
    this.channel = channel;
  }

  send<T extends keyof MessageType>(
    name: T,
    ...payload: Parameters<MessageType[T]>
  ): Promise<Awaited<ReturnType<MessageType[T]>>> {
    return window[IPC_GLOBAL_NAME].send(this.channel, {
      name: String(name),
      payload,
    });
  }

  on<T extends keyof BackgroundMessageType>(
    name: T,
    fn: (...args: Parameters<BackgroundMessageType[T]>) => void,
  ): () => void {
    this.listeners[name] = this.listeners[name] || [];

    this.listeners[name].push(fn);

    //  提供删除方法，方便 react 中的 useEffect 使用
    return () => {
      if (this.listeners[name].includes(fn)) {
        const index = this.listeners[name].indexOf(fn);
        this.listeners[name].splice(index, 1);
      }
    };
  }

  async bindBridge(contextBridge: ContextBridge, ipcRenderer: IpcRenderer) {
    contextBridge.exposeInMainWorld(IPC_GLOBAL_NAME, {
      send: (channel: string, data: any) => {
        if (channel !== this.channel) return;
        return new Promise(async (res, rej) => {
          const resData = await ipcRenderer.invoke(this.channel, data);
          if (resData.type === 'success') {
            return res(resData.result);
          } else {
            return rej(resData.error);
          }
        });
      },
      on: (channel: string, data: any) => {
        if (channel !== this.channel) return;
        this._handleReceivingMessage.call(this, data);
      },
    });
  }

  private _handleReceivingMessage(payloadData: {
    name: keyof BackgroundMessageType;
    payload: any;
  }) {
    const { name, payload } = payloadData;

    if (this.listeners[name]) {
      // @ts-ignore
      for (const fn of this.listeners[String(name)]) {
        fn(...payload);
      }
    }
  }
}
