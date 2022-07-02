declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendNotification(data: Electron.NotificationConstructorOptions): void;
        setStoreValue(key: string, value: any): void;
        getStoreValue(key: string): Promise<string>;
        clearStore(): void;
        onWindowBecameActive(callback: Function): void;
      };
    };
  }
}

export {};
