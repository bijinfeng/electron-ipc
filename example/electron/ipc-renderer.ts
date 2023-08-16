import { IPCRenderer } from '@pingtou/electron-ipc/dist/ipc-render';

import type { MainMessage, RenderMessage } from './types';

export const ipcRenderer = new IPCRenderer<RenderMessage, MainMessage>();
