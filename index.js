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


app.use(express.static('public'));
app.get('/tmp/:file', (req, res) => res.sendFile(`${__dirname}/${req.url}`));
app.post('/upload', multer({storage}).single('name'), (req, res) => {
  res.json({});
  res.end();
});

io.on('connection', socket => {
  socket.on('join', msg => {
    let room = msg.room;
    store[socket.id] = {
      name: msg.name,
      room: room,
      x: 0,
      y: 0
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
  });

  socket.on('disconnect', () => {
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

      if(room == 'multi') {
        io.emit('multi-dis', socket.id);
      }

      delete store[socket.id];
      socket.leave(socket.id);
    }
  });

  socket.on('chat', msg => {
    if(msg.msg.text == "/list") {
      let chat = Object.keys(store).filter(o => store[o].room == 'chat');
      io.emit('chat', {
        id: 'server',
        name: 'server',
        msg: {
          text: `${chat.length}人がオンラインです。${chat.map(o => `${store[o].name}@${o}`).join("、")}`
        }
      });
    }
    io.emit('chat', {
      id: socket.id,
      name: store[socket.id].name,
      msg: msg.msg,
      img: msg.img
    });
  });

  socket.on('multi', msg => {
    store[socket.id].x = msg.x;
    store[socket.id].y = msg.y;
    let players = {};
    Object.keys(store).filter(o => store[o].room == 'multi').forEach(o => {
      players[o] = store[o];
    });
    io.emit('multi', players);
  });
});