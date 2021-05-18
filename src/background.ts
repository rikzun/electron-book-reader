import {protocol, BrowserWindow, app } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import './ipc'

protocol.registerSchemesAsPrivileged([{
  scheme: 'app', privileges: { secure: true, standard: true }
}])

class ReaderApp {
  public window!: BrowserWindow

  public async createWindow() {
    this.window = new BrowserWindow({
      width: 800,
      minWidth: 245,
      height: 600,
      minHeight: 400,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      this.window.webContents.openDevTools()
    } else {
      createProtocol('app')
      this.window.loadURL('app://./index.html')
    }
  }
}
export const readerApp = new ReaderApp()

app.on('ready', () => {
  readerApp.createWindow()
  readerApp.window.on('ready-to-show', () => readerApp.window.show())
})
app.on('activate', () => {
  if (process.platform == 'darwin') {
    if (!BrowserWindow.getAllWindows().length) {
      readerApp.createWindow()
    }
  }
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})