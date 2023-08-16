//  从 渲染进程 传过来的消息类型
export type RenderMessage = {
  ping: (text: string) => Promise<string>;
};

//  从 主进程 发送到渲染进程的消息类型
export type MainMessage = {
  pong: (text: string) => void;
};
