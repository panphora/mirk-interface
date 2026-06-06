#!/usr/bin/env node
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SVG_DIR = path.join(ROOT, 'svg');
const FONTS_DIR = path.join(ROOT, '..', 'fonts');
const PORT = process.env.PORT || 4747;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    send(res, 200, data, MIME[path.extname(filePath)]);
  });
}

const server = http.createServer((req, res) => {
  let url;
  try {
    url = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    return send(res, 400, 'Bad Request');
  }
  if (url.includes('\0')) return send(res, 400, 'Bad Request');

  if (url === '/') return sendFile(res, path.join(ROOT, 'registry.html'));

  if (url === '/api/icons') {
    const icons = fs.readdirSync(SVG_DIR)
      .filter(f => f.endsWith('.svg'))
      .sort()
      .map(f => f.slice(0, -4));
    return send(res, 200, JSON.stringify(icons), MIME['.json']);
  }

  let base = ROOT;
  let rel = url;
  if (url.startsWith('/fonts/')) {
    base = FONTS_DIR;
    rel = url.slice('/fonts'.length);
  }
  const filePath = path.join(base, rel);
  if (!filePath.startsWith(base + path.sep)) return send(res, 403, 'Forbidden');
  sendFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`pixelarticons registry → http://localhost:${PORT}`);
});
