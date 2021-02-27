const fs = require('fs');

console.log(conversion('public/'));

function conversion(d) {
    return `fs.mkdirSync('${d.slice(0,d.length-1)}');`+fs.readdirSync(d).forEach(f => {
        let p = d+f;
        let s = fs.statSync(p);
        if(s.isDirectory()) {
            console.log(p);
            conversion(`${p}/`);
        }
    });


    fs.readdirSync(p).forEach(file => {
        let f = p+file;
        let stat = fs.statSync(f);
        if(stat.isDirectory()) {
            return `fs.mkdirSync('${p.slice(0,p.length-1)}');`//+conversion(`${f}/`);
        } else {
            return;
            console.log(`fs.writeFileSync('${f.slice(3,f.length)}', \`${fs.readFileSync(f, 'utf8').replace(/\r^\s*/gm, '').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, 'utf8');`);
        }
    });
}