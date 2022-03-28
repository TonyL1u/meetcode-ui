function clean() {
    rimraf dist
}

function build() {
    vite build
}

# copy files on build
function copyExt() {
    cp lib/meetcode-ui.esm.js dist/assets
    cp node_modules/vue/dist/vue.runtime.esm-browser.js dist/assets
}

clean
build
copyExt