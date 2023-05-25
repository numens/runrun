const fs = require('fs');
function update() {
    const data = JSON.stringify(new Date());
    fs.writeFile('README.md', data, (err) => {
        if (err) console.log('error');
        else console.log('success');
    });
}
update();
