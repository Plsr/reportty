const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronApi', {
  sendNotification: ({ title, body, actions }) => {
    ipcRenderer.send('send-notification', { title, body, actions })
  },
  setStoreValue: (key, value) => {
    ipcRenderer.send('set-store-value', key, value)
  },
  getStoreValue: async (key) => {
    return await ipcRenderer.invoke('get-store-value', key)
  },
  clearStore: () => {
    ipcRenderer.send('clear-store')
  },
})
