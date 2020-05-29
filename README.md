##使用
引入全局样式
```css
    .code{
        background-color: #292D3E;
        border-radius: 10px;
        padding: 20px;
        margin: 20px;
        color: #BFC7B8;
    }
```
实例化AnalysisReplaceStr类 <br>
 * code：对代码块进行解析 语法：#code ... #end
 * tab：标识符解析为html标签；
 img：转换为图片标签 语法：#img 图片地址 #end <br>
 font：转换为文字标签 语法：#font+n 内容 #end <br>
let obj = new AnalysisReplaceStr(['code'])<br>
解析文本<br>
obj.startAnalysis(字符串文本) <br> 
获取解析后的文本<br>
obj.text<br>
或者obj.startAnalysis(字符串文本).text