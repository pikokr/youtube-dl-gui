import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'
import { autoUpdater } from 'electron-updater'

let mainWindow: BrowserWindow | undefined

ipcMain.on('select-dir', async (e) => {
  const res: Electron.OpenDialogReturnValue = await dialog.showOpenDialog(
    mainWindow!,
    {
      properties: ['openDirectory'],
    }
  )
  if (res.filePaths.length) {
    e.reply('select-dir-complete', res.filePaths[0])
  }
})

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    center: true,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.on('closed', () => (mainWindow = undefined))

  mainWindow.focus()
}

app.on('ready', createWindow)

autoUpdater.checkForUpdatesAndNotify()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (!mainWindow) createWindow()
})
