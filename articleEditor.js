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
AnalysisReplaceStr.prototype.myIndexOf = function (allStr, findStrArr) {
    let indexArr = []
    findStrArr.forEach((item, index) => {
        indexArr[index] = {name: item, index: []}
    })
    for (let i = 0; i < allStr.length; i++) {
        indexArr.forEach((item, index) => {
            if (allStr[i] == item.name[0]) {
                if (allStr.slice(i, i + item.name.length) == item.name) {
                    item.index.push(i)
                }
            }
        })
    }
    return indexArr
}

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
    }else if(start >= end){
        let arr = this.myIndexOf(allStr,[endStr])
        let hasEnd = false
        for (let i = 0; i < arr[0].index.length; i++) {
            if(arr[0].index[i]>start){
                hasEnd = true
                end = arr[0].index[i]
                break
            }
        }
        if(!hasEnd){
            return {
                hasReplace: false
            }
        }
    }
    let sliceStr = allStr.slice(start + startStr.length, end)
    sliceStr = sliceStr.replace(/^\s*/, "")//去空格
    sliceStr = sliceStr.replace(/\s*$/, "");//去掉字符串最后的空格
    return {
        sliceStr,
        hasReplace: true,
        leftStr: allStr.slice(0, start),
        rightStr: allStr.slice(end + endStr.length, allStr.length)
    }
}


//对代码块解析
AnalysisReplaceStr.prototype.tab = function () {
    this.AnalysisImg()
    this.AnalysisFont()
}
AnalysisReplaceStr.prototype.AnalysisImg = function () {
    let obj = this.getSliceStr(this.text, '#img', '#tabend')
    if (!obj.hasReplace) {
        return
    }
    let newStr = `<img src="${obj.sliceStr}"/>`
    this.text = obj.leftStr + newStr + obj.rightStr
    this.AnalysisImg()
}
AnalysisReplaceStr.prototype.AnalysisFont = function () {
    let font = (i) => {
        let obj = this.getSliceStr(this.text, '#font' + i, '#end')
        if (!obj.hasReplace) {
            return
        }
        let newStr = `<font size="${i}">${obj.sliceStr}</font>`
        this.text = obj.leftStr + newStr + obj.rightStr
        font(i)
    }
    for (let i = 1; i < 8; i++) {
        font(i)
    }
}


//对代码块解析
AnalysisReplaceStr.prototype.code = function () {
    let obj = this.getSliceStr(this.text, '#code', '#end')
    if (!obj.hasReplace) {
        return
    }
    let sliceStr = this.highlightCode(obj.sliceStr)
    let newStr = `<div class="code">${sliceStr}</div>`
    this.text = obj.leftStr + newStr + obj.rightStr
    this.code()
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
    this.text = text
    this.analysisArr.forEach((item, index) => {
        this[item](this.text)
    })
    return this
}

/**
 * analysisArr 需要处理的指令（数组）
 * code：对代码块进行解析 语法：#code ... #end
 * tab：标识符解析为html标签；img：转换为图片标签 语法：#img 图片地址 #tab font：转换为文字标签 语法：#font+n 内容 #tab
 * @param arr
 */
function AnalysisReplaceStr(analysisArr) {
    this.analysisArr = analysisArr
}
