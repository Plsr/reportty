import { FinishedTimers, StoreInterface } from 'main/storeSchema'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendNotification(data: Electron.NotificationConstructorOptions): void
        setStoreValue(
          key: string,
          value: number | string | FinishedTimers
        ): void
        getStoreValue(key: string): Promise<keyof StoreInterface>
        clearStore(): void
      }
    }
  }
}

export {}
