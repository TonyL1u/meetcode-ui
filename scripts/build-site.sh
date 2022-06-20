function clean() {
    rimraf site
}

function build() {
    vite build
}

# copy files on build
function copyExt() {
    cp -r static/* site/assets
    rimraf static/meetcode-ui.types
    node scripts/generateMonacoTypes.js
}

clean
build
copyExt