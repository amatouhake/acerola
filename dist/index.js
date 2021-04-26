"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const multer_1 = __importDefault(require("multer"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server);
const port = Number(process.env.PORT) || 80;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname + "/tmp/"),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const store = {};
app.use(express_1.default.static("public"));
app.post("/upload", multer_1.default({ storage }).single("name"), (req, res) => res.end());
app.use((req, res) => res.status(404).sendFile(`/index.html`, { root: 'public/' }));
io.on("connection", socket => {
    socket
        .on("disconnect", () => {
        if (store[socket.id]) {
            if (store[socket.id].room == "chat") {
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
        if (msg?.room == "chat") {
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
server.listen(port);
//# sourceMappingURL=index.js.map