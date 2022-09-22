const chokidar = require('chokidar');
const exec = require('./exec');

const [lang = 'zh-CN'] = process.argv.splice(2);
// watch interface file to auto generate api markdown
console.log('正在监听interface.ts文件改动...');
chokidar.watch('src/**/interface.ts').on('change', async (path, stats) => {
    if (path) {
        console.log(`当前修改的文件: ${path}`);
        const pathMatcher = path.match(/src\/(.*)\/interface.ts/);
        const name = pathMatcher?.[1];
        await exec(`pnpm run api:markdown ${name} ${lang} All`);
        console.log(`doc.${lang}.md文件已同步！`);
    }
});
