const fs = require('fs');
if(!fs.existsSync('public')) generate();

const port = process.env.PORT || 8080;
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

function generate() {
  fs.mkdirSync('public');
  fs.mkdirSync('public/chat');
  fs.writeFileSync('public/chat/index.html', `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Chat</title><link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet"><link rel="stylesheet" href="../src/chat.css"><script src="/socket.io/socket.io.js"></script></head><body><div id="chat"></div><form><input id="id" type="text" placeholder="名前" autocomplete="off"><input id="msg" type="text" placeholder="メッセージ" autocomplete="off"><input id="range" type="range" min="1" max="1.5" step="0.1" value="1"><input id="color" type="color"><label>><input id="submit" type="submit"></label></form><script src="../src/chat.js"></script></body></html>`, 'utf8');
  fs.mkdirSync('public/danmaku');
  fs.writeFileSync('public/danmaku/index.html', `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><style>* { margin: 0; }</style></head><body><script src="../src/danmaku.js"></script></body></html>`, 'utf8');
  fs.writeFileSync('public/index.html', `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Acerola</title><link rel="stylesheet" href="src/style.css"></head><body><header><h1>- Acerola -</h1></header><a href="chat/"><div><p>Chat</p></div></a><a href="danmaku/"><div><p>Danmaku</p></div></a></body></html>`, 'utf8');
  fs.mkdirSync('public/src');
  fs.writeFileSync('public/src/chat.css', `* {font-family: 'Yusei Magic', sans-serif;margin: 0;padding: 0;}#chat {height: calc(100vh - 2.5em);overflow-y: scroll;}form {position: fixed;bottom: 0;width: 100%;padding: 0.5em;padding-left: 1em;background: black;}form #id {width: 20%;}form #msg {width: calc(80% - 14em);}form #range {width: 4em;}form #color {width: 4em;}form label {margin-left: 0.5em;color: white;}form label #submit {display: none;}`, 'utf8');
  fs.writeFileSync('public/src/chat.js', `var io = io();let chat = document.getElementById('chat');let id = document.getElementById('id');let msg = document.getElementById('msg');let submit = document.getElementById('submit');submit.onclick = e => {if(id.value && msg.value) {id.value.length <= 10 ? io.emit('msg', [id.value, msg.value, range.value, color.value]) : alert('名前は10文字以下にして下さい');msg.value = null;} else alert('名前とメッセージを入力して下さい');return e.preventDefault();};io.on('msg', value => {let div = document.createElement('div');div.textContent = \`<\${value[0]}> \${value[1]}\`;div.style.fontSize = \`\${value[2]}em\`;div.style.color = value[3];chat.appendChild(div);chat.scrollTo(0, chat.scrollHeight);});`, 'utf8');
  fs.writeFileSync('public/src/danmaku.js', `let c = document.createElement("canvas");document.body.appendChild(c);let ctx = c.getContext("2d");let t, m;let w = 900;let h = 1600;let k = new Set();resize();addEventListener('resize', resize);addEventListener('mousedown', e => {k.add("mouse");});addEventListener('mouseup', e => {k.delete("mouse");});addEventListener('keydown', e => {k.add(e.key);});addEventListener('keyup', e => {k.delete(e.key);});function resize() {if(innerWidth/9<innerHeight/16) {c.width = innerWidth;c.height = innerWidth/9*16;} else {c.width = innerHeight/16*9;c.height = innerHeight;}m = c.width/w;}let p = new function() {this.x = 450;this.y = 1400;this.hp = 20;}function loop() {t += 1;if(k.has("w")) {p.y -= p.y > 0 ? 5 : 0;}if(k.has("s")) {p.y += p.y < h ? 5 : 0;}if(k.has("a")) {p.x -= p.x > 0 ? 5 : 0;}if(k.has("d")) {p.x += p.x < w ? 5 : 0;}draw();requestAnimationFrame(loop);}function draw() {ctx.fillStyle = "black";ctx.fillRect(0, 0, 900*m, c.height);ctx.fillStyle = "white";ctx.beginPath();ctx.arc(p.x*m, p.y*m, 20*m, 0, Math.PI * 2, true);ctx.fill();}loop();`, 'utf8');
  fs.writeFileSync('public/src/style.css', `@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');* {letter-spacing: 0.1em;font-family: 'DotGothic16', sans-serif;margin: 0;padding: 0;}header {background: black;height: 10em;}h1 {position: relative;top: 0.5em;font-size:5em;text-align:center;line-height:0.95em;font-weight:bold;color: #FFF;text-shadow: 0.1em 0.05em 0 #2962FF,0 0 0.10em #2962FF,0 0 0.15em #2962FF,0 0 0.80em #2962FF,0 0 1.00em #2962FF;}a {text-decoration: none;}div {height: 8em;margin: 2em;background: gray;box-shadow:0 0 0 0.4em inset rgb(69, 69, 71),0 0 0 0.8em inset rgb(56, 56, 58),0 0 0.10em #293d74,0 0 0.15em #485a8b,0 0 0.80em #7685af,0 0 1.00em #c3d2fc;text-align: center;}p {position: relative;top: 2rem;font-size: 3em;color: snow;font-weight: bold;text-shadow: 0.1em 0.1em 0 rgb(46, 46, 46);}`, 'utf8');
}