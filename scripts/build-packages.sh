function clean() {
    rimraf es lib dist
}

function buildESM() {
    tsc -b --force tsconfig.esm.json
    rollup --config scripts/build/rollup.esm.config.js
}

function buildUMD() {
    tsc -b --force tsconfig.cjs.json
    rollup --config scripts/build/rollup.umd.config.js
}

function buildAll() {
    buildESM
    buildUMD
}

function copyExt() {
    cp dist/meetcode-ui.esm.js static
    rimraf static/meetcode-ui.types
    node scripts/tools/monaco-types-generator.js
    rimraf dist/src
}

clean

if [ -z $1 ]; then
    buildAll
elif [ $1 == 'esm' ]; then
    buildESM
elif [ $1 == 'umd' ]; then
    buildUMD
else
    buildAll
fi

copyExt
