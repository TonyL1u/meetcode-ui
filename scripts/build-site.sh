function clean() {
    rimraf dist
}

function build() {
    vite build
}

# copy files on build
function copyExt() {
    cp -r static/* dist/assets
}

clean
build
copyExt