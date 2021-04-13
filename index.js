const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 80;
const server = require('http').createServer(app).listen(port, () => console.log(port));
const io = require('socket.io')(server);

let store = {};
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __dirname + '/tmp/');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
})

app
  .use(express.static('public'))
  .get('/tmp/:file', (req, res) => res.sendFile(`${__dirname}/${req.url}`))
  .post('/upload', multer({storage}).single('name'), (req, res) => res.end());

io.on('connection', socket => {
  socket
    .on('join', msg => {
      let room = msg.room;
      store[socket.id] = {
        name: msg.name,
        room: room
      };
      socket.join(socket.id);
      
      if(room == 'chat') {
        io.emit(room, {
          id: 'server',
          name: 'server',
          msg: {
            text: `${msg.name}@${socket.id}が入室しました`,
            color: 'green'
          }
        });
      }
    })

    .on('disconnect', () => {
      if(store[socket.id]) {
        let user = store[socket.id];
        let room = user.room;

        if(room == 'chat') {
          io.emit(room, {
            id: 'server',
            name: 'server',
            msg: {
              text: `${user.name}@${socket.id}が退室しました`,
              color: 'red'
            }
          });
        }

        socket.leave(socket.id);
        delete user;
      }
    })

    .on('chat', msg => {
      io.emit('chat', {
        id: socket.id,
        name: store[socket.id].name,
        msg: msg.msg,
        img: msg.img
      });
    })
});