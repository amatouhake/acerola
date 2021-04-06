var io = io();

let sender = document.getElementById('sender');
let commit = document.getElementById('commit');
let chat = document.getElementById('chat');
let id = document.getElementById('id');
let msg = document.getElementById('msg');
let font = document.getElementById('font');
let submit = document.getElementById('submit');
let selectedFont = font.options[font.selectedIndex].value;

sender.onclick = () => {
    let sw = open('', 'hoge');
    document.send.target = 'hoge';
    document.send.submit();
}

font.onchange = () => {
    selectedFont = font.options[font.selectedIndex].value;
    id.style.fontFamily = selectedFont == "sans-serif" ? 'sans-serif' : `'${selectedFont}', sans-serif`;
    msg.style.fontFamily = selectedFont == "sans-serif" ? 'sans-serif' : `'${selectedFont}', sans-serif`;
}

submit.onclick = e => {
    if(id.value && msg.value) {
        id.value.length <= 20 ? io.emit('msg', [id.value, msg.value, range.value, color.value, selectedFont]) : alert('名前は20文字以下にして下さい');
        msg.value = '';
    } else alert('メッセージを入力して下さい');
    return e.preventDefault();
};

io.on('msg', value => {
    let div = document.createElement('div');
    div.textContent = `<${value[0]}> ${value[1]}`;
    div.style.fontSize = `${value[2]}em`;
    div.style.color = value[3];
    div.style.fontFamily = value[4] == "sans-serif" ? 'sans-serif' : `'${value[4]}', sans-serif`;
    chat.insertAdjacentElement('afterbegin', div);
});

io.on('img', value => {
    chat.insertAdjacentHTML('afterbegin', value);
});