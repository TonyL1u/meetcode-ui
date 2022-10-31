CURRENTPATH=$(cd `dirname $0`; pwd)
COMPONENT=$1
LANG=$2
UPDATE=$3
INTERFACE_FILE=$PWD/src/$COMPONENT/interface.ts
cd $CURRENTPATH


if [ -f $INTERFACE_FILE ];then
    if [ -z $UPDATE ]; then
        types=("全部" "Props" "Events" "Slots" "Expose")
        PS3="请选择要更新的Api："
        select opt in ${types[@]}
        do
            case $opt in
                "全部")
                    UPDATE="All"
                    break
                    ;;
                "Props")
                    UPDATE="Props"
                    break
                    ;;
                "Events")
                    UPDATE="Events"
                    break
                    ;;
                "Slots")
                    UPDATE="Slots"
                    break
                    ;;
                "Expose")
                    UPDATE="Expose"
                    break
                    ;;
                *)
                    UPDATE="All"
                    break
                    ;;
            esac
        done
    fi

    echo "Api 文档生成中..."
    # 删除旧文件
    mkdir -p ../temp && rimraf ../temp/*
    # 拷贝.d.ts
    cp -r $INTERFACE_FILE ../temp/index.d.ts
    # 提取api
    api-extractor run
    # 生成markdown
    node tools/api-markdown-generator.js $COMPONENT ${LANG:-"zh-CN"} $UPDATE

    if [ $? -eq 1 ]; then
        echo "Api 文档生成失败！"
    else
        echo "Api 文档生成成功！"
    fi

    # rimraf ../temp/*
else
    echo 'interface.ts file not found.'
    exit
fi