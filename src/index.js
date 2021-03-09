const fs = require('fs');
const port = process.env.PORT || 80;
const server = require('http').createServer((req, res) => {
  let url = 'public' + (req.url.endsWith('/') ? req.url + 'index.html' : req.url);
  if(fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, {'Content-Type': getType(url)});
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(port, () => require('dns').lookup(require('os').hostname(), (err, add, fam) => console.log(`${add}:${port}`)));

const io = require('socket.io')(server);
io.on('connection', ws => {
  ws.on('msg', value => io.emit('msg', value));
});

function getType(url) {
  var types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'svg+xml'
  }
  for(var key in types) {
    if (url.endsWith(key)) return types[key];
  }
  return 'text/plain';
}