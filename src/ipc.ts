import { ipcMain, app, dialog } from 'electron'
import { readerApp } from './background'
import { readFileSync } from 'fs'

ipcMain.on('minimize', () => readerApp.window.minimize())
ipcMain.on('maxrest', () => readerApp.window.isMaximized() ? readerApp.window.restore() : readerApp.window.maximize())
ipcMain.on('close', () => app.quit())
ipcMain.handle('openFileDialog', async() => {
  const openDialog = await dialog.showOpenDialog({
    filters: [{
      name: 'FictionBook', 
      extensions: ['fb2']
    }]
  })

  if (openDialog.canceled) return null
  return readFileSync(openDialog.filePaths[0]).toString()
})