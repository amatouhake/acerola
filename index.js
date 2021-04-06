const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 80;

app
  .use(express.static('public'))
  .get('/tmp/:file', (req, res) => res.sendFile(`${__dirname}/${req.url}`))
  .post('/upload', multer({ dest: 'tmp/' }).single('file'), (req, res) => {
    res.send('<script>close();</script>');
    io.emit('img', `<img src="../tmp/${req.file.filename}" class="img">`);
  });

const server = require('http').createServer(app).listen(port, () => require('dns').lookup(require('os').hostname(), (err, add, fam) => console.log(`${add}:${port}`)));
const io = require('socket.io')(server);
let store = {};
let chat = 'chat';

io.on('connection', socket => {
  socket.on('msg', value => io.emit('msg', value));
  socket.on('multi', value => io.emit('multi', value));
  socket
    .on('join', msg => {
      let room = msg.room;
      store[socket.id] = {
        name: msg.name,
        room: room
      };
      socket.join(room);
      
      if(room == chat) {
        io.emit(room, {
          id: 'none',
          name: 'server',
          msg: `${msg.name}(@${socket.id})が入室しました`
        });
      }
    })
    .on('disconnect', () => {
      if(store[socket.id]) {
        let user = store[socket.id];
        let room = user.room;

        if(room == chat) {
          io.emit(room, {
            id: 'none',
            name: 'server',
            msg: `${user.name}(@${socket.id})が退室しました`
          });
        }

        socket.leave(room);
        delete user;
      }
    })
    .on('chat', msg => {
      io.emit('chat', {
        id: socket.id,
        name: store[socket.id].name,
        msg: msg
      });
    });
});