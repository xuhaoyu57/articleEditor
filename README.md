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
let obj = new AnalysisReplaceStr(['code'])<br>
解析文本<br>
obj.startAnalysis(字符串文本) <br> 
获取解析后的文本<br>
obj.text<br>
或者obj.startAnalysis(字符串文本).text