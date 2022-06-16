const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronApi', {
  sendNotification: ({ title, body, actions }) => {
    ipcRenderer.send('send-notification', { title, body, actions })
  },
})
