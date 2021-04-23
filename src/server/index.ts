import express from "express";
import http from "http";
import fs from "fs";
import socketIo from "socket.io";
import multer from "multer";

interface User {
  name: string;
  room: string;
}
    
interface UserDictionary {
  [key: string]: User;
}

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const io: socketIo.Server = new socketIo.Server(server);
const port: number = Number(process.env.PORT) || 80;
const cwd: string = process.cwd();
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/tmp/"),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const store: UserDictionary = {};

app
  .use(express.static("pub"))
  .get("/:directory", (req, res) => {
    if(!fs.existsSync(`${cwd}/public/${req.params[0]}`)) res.sendFile(`${cwd}/pub/index.html`);
  })
  .post("/upload", multer({storage}).single("name"), (req, res) => res.end());

io.on("connection", socket => {
  socket
    .on("disconnect", () => {
      if(store[socket.id]) {
        if(store[socket.id].room == "chat") {
          io.emit("chat", {
            id: "Server",
            name: "Server",
            msg: {
              text: `${store[socket.id].name}@${socket.id}が退室しました`,
              color: "red"
            }
          });
        }

        socket.leave(socket.id);
        delete store[socket.id];
      }
    })

    .on("join", msg => {
      store[socket.id] = {
        name: msg?.name,
        room: msg?.room
      };
      socket.join(socket.id);
        
      if(msg?.room == "chat") {
        io.emit("chat", {
          id: "server",
          name: "server",
          msg: {
            text: `${msg?.name}@${socket.id}が入室しました`,
            color: "green"
          }
        });
      }
    })
  
    .on("chat", msg => {
      io.emit("chat", {
        id: socket.id,
        name: store[socket.id].name,
        msg: msg?.msg,
        img: msg?.img
      });
    });
});
  
server.listen(port, () => console.log(`app listening on port ${port}`));