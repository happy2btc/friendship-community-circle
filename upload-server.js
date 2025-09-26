// Simple Express server for avatar upload
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5050;

// Set up multer to save file as default-avatar.png in public folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'client', 'public'));
  },
  filename: function (req, file, cb) {
    cb(null, 'default-avatar.png');
  }
});
const upload = multer({ storage: storage });

app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('Avatar uploaded successfully!');
});

app.use(express.static(path.join(__dirname, 'client')));

app.listen(PORT, () => {
  console.log(`Avatar upload server running at http://localhost:${PORT}/`);
});
