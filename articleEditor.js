AnalysisReplaceStr.prototype.highlight = {
    '#FFBF54': [
        'git',
        'cd',
        'let',
        'var',
        'const',
        'this',
        'if',
        'else',
        'case',
        'while',
        'console',
        'log',
        'window',
    ],
    '#829ECD': [
        'git'
    ]
};
// 截取字符串
AnalysisReplaceStr.prototype.getSliceStr = function (allStr, startStr, endStr) {
    // let patt = RegExp('^\\s+'+startStr+'[ ]+','g')
    // allStr = allStr.replace(patt,startStr)
    // patt = RegExp(startStr+'[ ]+','g')
    // allStr = allStr.replace(patt,startStr)
    // let patt2 = RegExp('[ ]+'+endStr+'[ ]+','g')//去掉startStr左右空格
    let start = allStr.indexOf(startStr)
    let end = allStr.indexOf(endStr)
    if (start == -1 || end == -1) {
        return {
            hasReplace: false
        }
    }
    let sliceStr = allStr.slice(start + startStr.length, end)
    sliceStr = sliceStr.replace(/^\s*/, "")//去空格
    sliceStr = sliceStr.replace(/\s*$/, "");//去掉字符串最后的空格
    console.log(sliceStr)
    return {
        sliceStr,
        hasReplace: true,
        leftStr: allStr.slice(0, start),
        rightStr: allStr.slice(end + endStr.length, allStr.length)
    }
}
//对代码块解析
AnalysisReplaceStr.prototype.code = function (allStr) {
    let obj = this.getSliceStr(allStr, '#code', '#end')
    if (!obj.hasReplace) {
        return allStr
    }
    let sliceStr = this.highlightCode(obj.sliceStr)
    let newStr = `<div class="code">${sliceStr}</div>`
    allStr = obj.leftStr + newStr + obj.rightStr
    return this.code(allStr)
}

AnalysisReplaceStr.prototype.highlightCode = function (sliceStr) {
    for (const highlightkey in this.highlight) {
        this.highlight[highlightkey].forEach((item, index) => {
            let patt = RegExp('\\b' + item + '$|\\b' + item + '\\b', "g")// //b表示传入RegExp的是转换字符而不是字符串/b
            sliceStr = sliceStr.replace(patt, '<span style="color:' + highlightkey + '">' + item + '</span>')
        })
    }
    return sliceStr
}
// text 需要被替换的所有文本
AnalysisReplaceStr.prototype.startAnalysis = function (text) {
    this.analysisArr.forEach((item, index) => {
        this.text = this[item](text)
    })
    return this
}

/**
 * analysisArr 需要处理的指令
 * code：对代码块进行解析 语法：#code ... #end
 * img：转换为图片标签 语法：#img ... #tabend
 * @param arr
 */
function AnalysisReplaceStr(analysisArr) {
    this.analysisArr = analysisArr
}
