import { IPCMain } from '../../src/index';

import type { MainMessage, RenderMessage } from './types';

export const ipcMain = new IPCMain<RenderMessage, MainMessage>();

ipcMain.on('ping', async (text) => {
  console.log('main process listener message: ', text);
  return 'ping';
});

ipcMain.send('pong', 'pong');
