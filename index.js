const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
// Serve static files from a specific directory on your local PC
const localFilesDirectory = "uploads"; // Replace with the actual path to your files

app.use("/uploads", express.static(localFilesDirectory));

// Define a route to handle file downloads
app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(localFilesDirectory, filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).send("File not found");
    return;
  }

  // Set the appropriate headers for the response
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.setHeader("Content-Type", "application/octet-stream");

  // Create a read stream from the file and pipe it to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(port, () => {
  console.log(`File hosting app listening at http://localhost:${port}`);
});
