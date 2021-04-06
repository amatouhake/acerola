const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 80;

app
  .use(express.static('public'))
  
  .post('/upload', multer({ dest: 'tmp/' }).single('file'), (req, res) => {
    res.send('<script>close();</script>');
    io.emit('img', `<img src="../tmp/${req.file.filename}" class="img">`);
  })
  
  .get('/tmp/:file', (req, res) => res.sendFile(`${__dirname}/${req.url}`));

const server = require('http').createServer(app).listen(port, () => require('dns').lookup(require('os').hostname(), (err, add, fam) => console.log(`${add}:${port}`)));
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('msg', value => io.emit('msg', value));
  socket.on('multi', value => io.emit('multi', value));
});