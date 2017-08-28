const fs = require('fs');
const gitignore = '.gitignore';

fs.readFile(gitignore, 'utf-8', (err, data) => {
    if (err) return console.log(err);
    let result = data.replace(/.*build.*\n?/g, '');
    //result += '\nsrc/\nwebpack*\ntypings*\ntslint*\ntsconfig*\nLICENSE\nREADME*\npackage*\n';
    fs.writeFile(gitignore, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});