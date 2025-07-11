import express from 'express';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Change this to your actual code root folder
const ROOT_DIR = '/home/devuser';

app.use('/static', express.static(path.join(__dirname, 'static')));

// API: list files and directories
app.get('/api/list', (req, res) => {
  const dirPath = path.join(ROOT_DIR, req.query.path || '');
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read directory' });
    const list = files.map(f => ({
      name: f.name,
      isDir: f.isDirectory()
    }));
    res.json(list);
  });
});

// API: get file content
app.get('/api/file', (req, res) => {
  const filePath = path.join(ROOT_DIR, req.query.path || '');
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) return res.status(404).json({ error: 'File not found' });
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Cannot read file' });
      const type = mime.getType(filePath) || 'text/plain';
      res.json({ content: data, mime: type });
    });
  });
});

// Serve frontend page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Code browser running at http://localhost:${PORT}`);
});
