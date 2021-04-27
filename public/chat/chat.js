var io = io();
io.emit('join', {name: 'Player', room: 'chat'})

let namae = document.getElementById('name');
let chat = document.getElementById('chat');
let submit = document.getElementById('submit');
let msg = document.getElementById('msg');
let font = document.getElementById('font');
let file = document.getElementById('file');
let selectedFont = font.options[font.selectedIndex].value;

function emit(imgPath) {
    io.emit('chat', {
        msg: {
            text: msg.value,
            size: size.value,
            color: color.value,
            font: selectedFont
        },
        img: imgPath
    });
    msg.value = file.value =  '';
}

function getExt(filename) {
	let pos = filename.lastIndexOf('.');
	if (pos === -1) return '';
	return filename.slice(pos);
}

function upload(filename) {
    let fd = new FormData();
    fd.set('name', file.files[0], filename);
    fetch( '../upload', {
        method: 'POST',
        body: fd
    }).then(res => {
        emit(filename);
    });
}

function escape_html(string) {
    if(typeof string !== 'string') {
      return string;
    }
    return string.replace(/[&'`"<>]/g, (match) => {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match]
    });
}

function check(before, value, after) {
    return (value !== null && value !== void 0 ? value : false) ? before + value + after : '';
}
/*function check(before, value, after) {
    return value ?? false ? before + value + after : '';
}*/

namae.onchange = () => {
    io.emit('join', {name: namae.value, room: 'chat'})
}

font.onchange = () => {
    selectedFont = font.options[font.selectedIndex].value;
    selectedFont = msg.style.fontFamily = selectedFont == 'sans-serif' ? 'sans-serif' : `'${selectedFont}', sans-serif`;
}

submit.onclick = e => {
    if(msg.value || file.files.length) {
        let imgPath = '';
        if(file.files.length) {
            imgPath = Math.random().toString(36).slice(-8) + getExt(file.files[0].name);
            upload(imgPath);
        } else {
            emit(imgPath);
        }
    }
    return e.preventDefault();
};

io.on('chat', msg => {
    chat.insertAdjacentHTML('afterbegin', `
        <div class="message">
            <div class="name">${escape_html(msg.name)}</div>
            <div class="id">@${msg.id}</div>
            ${check(`<p style="
                ${check('font-size: ', msg.msg.size, 'em;')}
                ${check('color: ', msg.msg.color, ';')}
                ${check('font-family: ', msg.msg.font, ';')}
            ">`, escape_html(msg.msg.text), '</p>')}
            ${check('<img class="img" src="../tmp/', msg.img, '">')}
        </div>
    `);
});