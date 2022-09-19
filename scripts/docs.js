const path = require('path');
const fs = require('fs');
const doctrine = require('doctrine');

const srcPath = path.resolve(__dirname, '../src');
const props = fs.readFileSync(`${srcPath}/progress/interface.ts`, 'utf-8');
console.log(props);

var ast = doctrine.parse(['/**', ' * This function comment is parsed by doctrine', ` * @defaultValue 'undefined'`, '*/'].join('\n'), { unwrap: true, tags: ['defaultValue'] });
console.log(ast);
