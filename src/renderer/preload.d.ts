import { NotificationPayload } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendNotification(data: NotificationPayload): void;
        setStoreValue(key: string, value: string): void;
        getStoreValue(key: string): Promise<string>;
        clearStore(): void;
      };
    };
  }
}

export {};
