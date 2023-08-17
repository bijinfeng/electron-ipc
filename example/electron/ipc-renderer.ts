import { IPCRenderer } from '../../src/index';

import type { MainMessage, RenderMessage } from './types';

export const ipcRenderer = new IPCRenderer<RenderMessage, MainMessage>();
