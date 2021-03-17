const express = require('express');
const multer = require('multer');
const app = express();

app.use(express.static('public'));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.post('/upload',  multer({ storage: storage }).single('file'), (req, res) => {
  res.send('ファイルのアップロードが完了しました。');
  io.emit('img', `<img src="../uploads/${req.file.originalname}" class="img">`);
});

const port = process.env.PORT || 80;
const server = require('http').createServer(app).listen(port, () => require('dns').lookup(require('os').hostname(), (err, add, fam) => console.log(`${add}:${port}`)));

const io = require('socket.io')(server);
io.on('connection', ws => {
  ws.on('msg', value => io.emit('msg', value));
  ws.on('multi', value => io.emit('multi', value));
});