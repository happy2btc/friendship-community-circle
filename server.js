const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const distPath = path.join(__dirname, 'dist');

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Fallback route for unmatched paths, serves index.html
app.get(/.* /, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});