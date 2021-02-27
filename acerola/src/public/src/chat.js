var io = io();

let chat = document.getElementById('chat');
let id = document.getElementById('id');
let msg = document.getElementById('msg');
let submit = document.getElementById('submit');

submit.onclick = e => {
    if(id.value && msg.value) {
        id.value.length <= 10 ? io.emit('msg', [id.value, msg.value, range.value, color.value]) : alert('名前は10文字以下にして下さい');
        msg.value = null;
    } else alert('名前とメッセージを入力して下さい');
    return e.preventDefault();
};

io.on('msg', value => {
    let div = document.createElement('div');
    div.textContent = `<${value[0]}> ${value[1]}`;
    div.style.fontSize = `${value[2]}em`;
    div.style.color = value[3];
    chat.appendChild(div);
    chat.scrollTo(0, chat.scrollHeight);
});