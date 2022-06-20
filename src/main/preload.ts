import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendNotification: (data: NotificationPayload) => {
      const { title, body, actions } = data;
      ipcRenderer.send('send-notification', { title, body, actions })
    },
    setStoreValue: (key: string, value: string) => {
      ipcRenderer.send('set-store-value', key, value)
    },
    getStoreValue: async (key: string) => {
      return await ipcRenderer.invoke('get-store-value', key)
    },
    clearStore: () => {
      ipcRenderer.send('clear-store')
    },
  },
});

export type NotificationPayload = {
  title: string,
  body: string,
  actions: any[] // TODO: define type
}
