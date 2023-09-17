const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
const ejs = require("ejs");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/listfiles", (req, res) => {
  const { folder, port } = req.body;
  const localFilesDirectory = folder;

  // Check if the folder exists
  if (!fs.existsSync(localFilesDirectory)) {
    res.status(404).send("Folder not found");
    return;
  }

  const files = fs.readdirSync(localFilesDirectory);

  res.render("filelist", { files, folder, port }); // Include folder in the object
});

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join("uploads", filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).send("File not found");
    return;
  }

  // Set the appropriate headers for the response
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.setHeader("Content-Type", "application/octet-stream");

  // Create a read stream from the file and pipe it to the response
  // const fileStream = fs.createReadStream(filePath);
  // fileStream.pipe(res);
  res.download(filePath);
});

app.listen(port, () => {
  console.log(`File hosting app listening at http://localhost:${port}`);
});
