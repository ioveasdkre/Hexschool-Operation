declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE?: string;
    PORT?: string;
    NODE_ENV?: string;
    // 其他環境變數的定義...
  }
}
