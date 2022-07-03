import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendNotification: (data: Electron.NotificationConstructorOptions) => {
      const { title, body, actions } = data
      ipcRenderer.send('send-notification', { title, body, actions })
    },
    setStoreValue: (key: string, value: string) => {
      ipcRenderer.send('set-store-value', key, value)
    },
    getStoreValue: (key: string) => {
      return ipcRenderer.invoke('get-store-value', key)
    },
    clearStore: () => {
      ipcRenderer.send('clear-store')
    },
    onWindowBecameActive: (callback: (event: Event) => void) => {
      ipcRenderer.on('window-became-active', callback as any)
    },
  },
})
