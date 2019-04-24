var fs = require('fs');
const glob = require('glob');
/**
 * JS文件拷贝
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst) {
    fs.readFile(src, 'Base64', function (error, data) {
        if (error) {
            // console.log(error);
            return false;
        }
        fs.writeFile(dst, data.toString(), 'Base64', function (error) {
            if (error) {
                // console.log(error);
                return false;
            }
        })
    })
};
// 复制目录
let imgList = glob.sync('./dist/img/*.jpg').concat(glob.sync('./dist/img/*.png')).concat(glob.sync('./dist/img/*.gif'))

imgList.forEach((filepath) => {
    let fileNameList = filepath.split('.');
    let fileName = fileNameList[1].split('/')[3].split('-')[0]; // 多页面页面目录
    let copyName = filepath.split('/')[3];
    let changeDirectory = `./dist/${fileName}/img`; // 多页面JS文件地存放址
    if (!fileName.includes('chunk-vendors')) {
        fs.exists(changeDirectory, function (exists) {
            if (exists) { // 已存在
                // console.log(`${fileName}下JS文件已经存在`)
                callbackFile(filepath, `${changeDirectory}/${copyName}`)
            } else { // 不存在
                fs.mkdir(changeDirectory, function () {
                    callbackFile(filepath, `${changeDirectory}/${copyName}`)
                    // console.log(`${fileName}下JS文件创建成功`)
                });
            }
        });
    }
});
