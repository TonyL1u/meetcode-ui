function clean() {
    rimraf site
}

function build() {
    vite build
}

# copy files on build
function copyExt() {
    cp -r static/* site/assets
}

clean
build
copyExt