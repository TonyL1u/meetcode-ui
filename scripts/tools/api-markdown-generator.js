const doctrine = require('doctrine');
const fs = require('fs');
const path = require('path');
const { curry } = require('lodash');
const { name: ProjectName } = require('../../package.json');
const apiJson = require(`../../temp/${ProjectName}.api.json`);

const root = path.resolve(__dirname, '../../');
const [component, lang, update] = process.argv.splice(2);
const docPath = path.resolve(root, `./src/${component}/demos/doc.${lang}.md`);
const MdTableConfig = {
    Props: {
        fields: ['名称', '类型', '默认值', '说明'],
        nameTransform(name) {
            return camelToKebab(name);
        },
        typeTransform(type, expandType) {
            return expandType ? `<McTooltip content="${expandType.replaceAll('\n', '').replaceAll('|', '\\|')}">\`${type}\`</McTooltip>` : `\`${type}\``;
        }
    },
    Events: {
        fields: ['名称', '类型', '说明'],
        nameTransform(name) {
            return `on-${camelToKebab(name)}`;
        }
    },
    Slots: {
        fields: ['名称', '参数', '说明'],
        paramsTransform(params) {
            return `(${params === 'void' ? '' : params})`;
        }
    },
    Expose: {
        fields: ['名称', '类型', '说明']
    }
};

const getInterfaceApi = curry(function (title, component) {
    return apiJson.members[0]?.members.find(({ name, kind }) => kind === 'Interface' && name === `${component}${title}`)?.members ?? [];
});

const generateTableMarkdown = curry(function (title, members) {
    const { fields, nameTransform, typeTransform, defaultValueTransform, descTransform, paramsTransform } = MdTableConfig[title];
    const tableMarkdown = [`## ${title}\n`, `| ${fields.join(' | ')} |`, `| ${Array(fields.length).fill(':---:').join(' | ')} |`];
    members.forEach(({ docComment, name, excerptTokens, propertyTypeTokenRange }) => {
        const { startIndex = 0, endIndex = 0 } = propertyTypeTokenRange;
        const type = excerptTokens
            .slice(startIndex, endIndex)
            .map(token => token.text)
            .reduce((prev, cur) => `${prev}${cur}`)
            .replaceAll('\n', '')
            .replaceAll('|', '\\|');
        let expandType = '';
        let property = name;
        let desc = '';
        let defaultValue = 'undefined';

        if (docComment) {
            const { description, tags } = doctrine.parse(docComment, { unwrap: true });
            desc = description.replaceAll('\n/', '') ?? '';
            defaultValue = tags.find(tag => tag.title === 'defaultValue')?.description.replaceAll('\n/', '') ?? defaultValue;
            property = tags.find(tag => tag.title === 'designation')?.description.replaceAll('\n/', '') ?? property;
            expandType = tags.find(tag => tag.title === 'expandType')?.description.replaceAll('\n/', '') ?? expandType;
        }

        const tableLine = fields.map(item => {
            switch (item) {
                case '名称':
                    return nameTransform ? nameTransform(property) : property;
                case '类型':
                    return typeTransform ? typeTransform(type, expandType) : `\`${type}\``;
                case '默认值':
                    return `\`${defaultValueTransform ? defaultValueTransform(defaultValue) : defaultValue}\``;
                case '说明':
                    return descTransform ? descTransform(desc) : desc;
                case '参数':
                    return `\`${paramsTransform ? paramsTransform(type) : type}\``;
            }
        });

        tableMarkdown.push(`| ${tableLine.join(' | ')} |`);
    });

    tableMarkdown.push('\n');
    return tableMarkdown;
});

const replaceOriginalFile = curry(function (title, markdownArray) {
    const mdTitle = `## ${title}`;
    const fileString = fs.readFileSync(docPath, 'utf-8');
    const data = fileString.split('\n');

    const startIndex = data.indexOf(mdTitle);
    // 已经存在该title，替换内容
    if (startIndex > -1) {
        let endIndex = 0;
        for (let i = startIndex + 1; i < data.length; i++) {
            if (data[i].startsWith('## ')) {
                endIndex = i - 1;
                break;
            } else {
                endIndex = data.length;
            }
        }
        data.splice(startIndex, endIndex - startIndex + 1, ...markdownArray);
        fs.writeFileSync(docPath, data.join('\n'), 'utf-8', () => {});
    } else {
        // 若不存在，直接追加到文件最后
        fs.appendFileSync(docPath, markdownArray.join('\n'), 'utf-8', () => {});
    }
});

const workChain = type => compose(replaceOriginalFile(type), generateTableMarkdown(type), getInterfaceApi(type))(upperFirstLetter(component));

fs.open(docPath, 'r', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('markdown file does not exist');
            return;
        }

        throw err;
    }

    try {
        if (update === 'All') {
            workChain('Props');
            workChain('Events');
            workChain('Slots');
            workChain('Expose');
        } else {
            workChain(update);
        }
    } finally {
        fs.close(fd, err => {
            if (err) throw err;
        });
    }
});

function compose() {
    const args = arguments;
    const start = args.length - 1;

    return function () {
        let i = start;
        let result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
}

function camelToKebab(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function upperFirstLetter(str = '') {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
