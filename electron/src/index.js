const electron = require('electron');
const path = require('path');
const axios = require('axios');

const { app, BrowserWindow } = electron;
const SERVER_JAR = 'openkb-0.0.1-SNAPSHOT.jar';
const MAX_RETRIES = '10';
let backendProcess;
let baseUrl;
let mainWindow;
const logger = require('electron-log');

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      show: true,
    });

    // TODO: load a loading screen ?
    mainWindow.loadFile(path.join(__dirname, 'loading.html'));
    loadHomePage();

    //mainWindow.webContents.openDevTools();
}

function startServer(port) {
    const serverJarPath = `${path.join(app.getAppPath(), '..', '..', 'backend', 'target', SERVER_JAR)}`;
    const dbPath = `${path.join(app.getAppPath(), '..', 'data', 'openkb')}`;
	logger.info('DB', dbPath);
	backendProcess = require('child_process')
		.spawn('java', 
			   ['-Dspring.profiles.active=dbHsql', '-jar', serverJarPath],
			   { env : { DB_FILE_PATH: dbPath}});
	backendProcess.stdout.on('data', function(data) {
		const messages = data.toString().split('\n');
		messages.forEach(msg => logger.info('server> ' + msg));
		}
	);
  
    if (backendProcess.pid) {
      baseUrl = `http://localhost:${port}`;
      logger.info("Server PID: " + backendProcess.pid);
    } else {
      logger.error("Failed to launch server.");
    }
}

function stopServer() {
    logger.info('Stopping server...')
    
    if (backendProcess) {
        logger.info(`Killing server process ${backendProcess.pid}`);
        const kill = require('tree-kill');
        kill(backendProcess.pid, 'SIGTERM', function (err) {
            logger.info('Server process killed');
            backendProcess = null;
            baseUrl = null;
            app.quit(); // quit again
        });
    }
}

function loadHomePage() {
    // switch to main page when server is responding to queries
    retry = 0;
    setTimeout(function connect() {
      axios.get(`${baseUrl}/api/health`)
        .then(() => mainWindow.loadFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')))
        .catch(error => {
          if (error.code === 'ECONNREFUSED') {
            if (retry < MAX_RETRIES) {
                retry++;
                setTimeout(cycle, 1000);
            } else {
              logger.error('Timeout. Unable to access server.')
              app.quit()
            }
          } else {
            logger.error(error)
            app.quit()
          }
        });
    }, 200);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=> {
        startServer(8080);
        setTimeout(()=> {
            createWindow();
        }, 10000);
    }
);

app.on('will-quit', event => {
    if (baseUrl != null) {
      stopServer();
      event.preventDefault(); // will quite later after stopped the server
    }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});