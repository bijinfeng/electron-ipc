import { IPCRenderer } from '@pingtou/electron-ipc';

import type { MainMessage, RenderMessage } from './types';

export const ipcRenderer = new IPCRenderer<RenderMessage, MainMessage>();
