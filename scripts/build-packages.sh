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

function copy() {
    cp dist/meetcode-ui.esm.js static
    cp dist/meetcode-ui.esm.css static
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

copy
