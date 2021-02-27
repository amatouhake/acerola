const fs = require('fs');

console.log(conversion('public/'));

function conversion(d) {
    console.log(`fs.mkdirSync('${d.slice(0,d.length-1)}');`);
    fs.readdirSync(d).forEach(f => {
        let p = d+f;
        let stat = fs.statSync(p);
        if(stat.isDirectory()) {
            conversion(`${p}/`);
        }
        if(stat.isFile()) {
            console.log(`fs.writeFileSync('${p}', \`${fs.readFileSync(p, 'utf8').replace(/\r^\s*/gm, '').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, 'utf8');`);
        }
    });
}