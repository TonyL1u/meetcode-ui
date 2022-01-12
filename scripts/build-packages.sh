function clean() {
    rimraf lib
}

function buildESM() {
    rollup --config scripts/build/rollup.esm.config.js
}

function buildUMD() {
    rollup --config scripts/build/rollup.umd.config.js
}

function buildAll() {
    buildESM
    buildUMD
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

