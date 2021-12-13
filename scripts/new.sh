function firstLetterUpper(){
    str=$1
    first=`echo ${str:0:1} | awk '{print toupper($0)}'`
    rest=${str:1}
    file=$first$rest
}

function component() {
    echo "export * from './$1';" >> components.ts
    cd $1
    mkdir demos
    touch $file.vue
    touch style.scss
    echo "import './style.scss';" > index.ts
    echo "export { default as Mc$file } from './$file.vue';" > index.ts
}

function doc() {
    cd ../../pages/docs/McUI
    echo "<script setup></script>" > $file.md
}


cd src

while read -p "请输入要新增的组件名：" NAME
do 
    # read_dir
    var1=`mkdir $NAME 2>&1`
    if [ $? -eq 1 ];then
        echo "组件已存在"
    else
        firstLetterUpper $NAME
        component $NAME
        doc $NAME
        exit
    fi
    # echo $NAME
done