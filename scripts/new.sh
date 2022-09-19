function firstLetterUpper(){
    str=$1
    first=`echo ${str:0:1} | awk '{print toupper($0)}'`
    rest=${str:1}
    file=$first$rest
}

function component() {
    while read -p "是否需要暗黑模式？(y/n)：" confirmed 
    do
        if [ "$confirmed" == "y" -o "$confirmed" == "Y" ]; then  
            cp -r ../scripts/template/dark/. $1
        else
            cp -r ../scripts/template/normal/. $1
        fi
        break
    done
    echo "export * from './$1';" >> components.ts
    cd $1
    mv NAME.ts $file.ts
    mv __tests__/NAME.spec.ts __tests__/$file.spec.ts
    echo "export { default as Mc$file } from './$file';" > index.ts
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
        echo "模版创建成功！"
        exit
    fi
done