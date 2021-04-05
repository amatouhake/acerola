const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));

let storage = multer.diskStorage({
  destination: (req, fil, cal) => {
    cal(null, __dirname + '/tmp/');
  },
  filename: (req, fil, cal) => {
    cal(null, fil.originalname);
  }
});

app.post('/upload', multer({storage: storage}).single('file'), (req, res) => {
  res.send('ファイルのアップロードが完了しました。');
  io.emit('img', `<img src="tmp/${req.file.originalname}" class="img">`);
});

app.get('/chat/tmp/*', (req, res) => res.sendFile(`${__dirname}/tmp/${req.params[0]}`));

const server = require('http').createServer(app).listen(port, () => require('dns').lookup(require('os').hostname(), (err, add, fam) => console.log(`${add}:${port}`)));
const io = require('socket.io')(server);

io.on('connection', ws => {
  ws.on('msg', value => io.emit('msg', value));
  ws.on('multi', value => io.emit('multi', value));
});