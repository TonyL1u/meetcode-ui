const fs = require('fs');
const components = fs.readFileSync('../es/components.d.ts', 'utf-8').trim();
const declares = components.match(/\/(.*)'/g).map(name => name.slice(1, -1));
declares.forEach(name => {
    fs.readFile(`../es/${name}/index.d.ts`, 'utf-8', (err, data) => {
        fs.appendFile('../static/meetcode-ui.types', data, 'utf-8', () => {});
    });
});
