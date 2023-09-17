const { app, BrowserWindow, ipcMain } = require("electron");
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// Create an Express app (your existing Node.js server)
const expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: true }));

// Set up routes and functionality (your existing server routes)

// Create an Electron window to display the UI
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the HTML file
  mainWindow.loadFile("index.html");
}

app.on("ready", createWindow);

// Start the Express server when the form is submitted
expressApp.post("/startserver", (req, res) => {
  const { port, folder } = req.body;
  const localFilesDirectory = folder;

  // Check if the folder exists
  if (!fs.existsSync(localFilesDirectory)) {
    res.status(404).send("Folder not found");
    return;
  }

  const files = fs.readdirSync(localFilesDirectory);

  res.render("filelist", { files, folder, port }); // Include folder in the object
});

// Quit the app when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Listen for an event from the Express server
ipcMain.on("server-started", (event, port) => {
  // Do something when the server has started, e.g., display a message
  mainWindow.webContents.send("server-started", port);
});
