import { app, BrowserWindow, Menu, ipcMain } from 'electron';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let historyWindow;
let equations = [
    '2+2',
    '3.14*8*8',
    '654-78/8'
];

let createHistoryWindow = () => {
    historyWindow = new BrowserWindow({width: 200, height: 400, alwaysOnTop: true});
    
    // Emitted when the window is closed.
    historyWindow.on('closed', () => {historyWindow = null;});
    historyWindow.loadFile('src/historyTemplate.html');
    historyWindow.setMenu(null);
    // historyWindow.webContents.openDevTools()
    historyWindow.show();
    historyWindow.webContents.on('did-finish-load', () => {
        historyWindow.webContents.send('equation-list', equations);
        console.log('sent equation list');
        console.log(equations);
    });
}

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 480, height: 640});

    // and load the index.html of the app.
    win.loadFile('src/index.html');

    // Emitted when the window is closed.
    win.on('closed', () => {win = null;});

    // let menu = Menu.buildFromTemplate([
    //     {
    //         label: 'File',
    //         submenu: [
    //             {
    //                 label: 'History',
    //                 click: createHistoryWindow
    //             },
    //             {type: 'separator'},
    //             {
    //                 label: 'Exit',
    //                 click: () => app.exit(0)
    //             }
    //         ]
    //     }
    //     ,{
    //         label: 'DevTools',
    //         click: () => win.webContents.openDevTools()
    //     }
    // ]);

    // win.setMenu(menu);

    win.setMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('update-equation', (event, arg) => {
    win.webContents.send('equation-selected', arg);
    console.log('History equation selected');
});

ipcMain.on('add-evaluated-equation', (event, arg) => {
    equations.unshift(arg);
    console.log('Added equation');
});

ipcMain.on('open-history', createHistoryWindow);