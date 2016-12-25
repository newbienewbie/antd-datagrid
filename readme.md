

## demo

### 依赖以及配置

安装`babel`、`webpack`等配套开发设施，配置如下：

`babel`配置:
```JavaScript
{
    "presets": ["es2015", "react"],
    "plugins":[["import", { "libraryName": "antd", "style": "css" }]]
}
```

`webpack`配置：
```JavaScript
//webpack.config.js

const path=require('path');

const PATH={
    dist:path.join(__dirname,"dist"),
};

module.exports={
    entry:{
        index:path.join(__dirname,'index.js'),
    },
    output:{
        path:PATH.dist,
        filename:'[name].js',
    },
    module:{
        loaders:[
            {
                test:/\.jsx?/,
                loaders:['babel-loader'],
                exclude:'node_modules',
            },
            {
                test:/\.css$/,
                loaders:['style-loader','css-loader'],
            },
        ],
    },
};
```
除本项目的依赖之外，还要再安装`react`、`react-dom`、`antd`等依赖。

### 使用

使用`antd-datagrid`编写一个List 组件：

```JavaScript
// lib/list.js 

import React from 'react';
import Datagrid from 'antd-datagrid';
import 'whatwg-fetch';

export const List=React.createClass({

    render:function(){
        return (<div>
            <Datagrid 
                columns={[
                    {title:'title',dataIndex:'title'}, 
                    {title:'status',dataIndex:'status'},
                    {title:'createdAt',dataIndex:'createdAt'},
                    {title:'updatedAt',dataIndex:'updatedAt'},
                ]}
                fetcher={(page,size,condition)=>{
                    return fetch('/post/list',{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({page,size,condition})
                    }).then(resp=>resp.json())
                }} 
                onRowClick={(record,index)=>{
                    console.log(record,index);
                }}
            />
        </div>);
    }
})


export default List;
```

我们打算让他在HTML中显示出来，先编写一个`HTML`模板：
```HTML
<html>
<head></head>
<body>
    <div id="app"></div>
    <script src="./index.js"></script>
</body>
</html>
```
主要把上面的`index.js`更换为实际发布`js`地址的路径。

编写入口文件：
```JavaScript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import List from  './lib/list';


ReactDOM.render(<List/>,document.getElementById('app'));
```

## 打包

使用`webpack`打包，执行：

```
> npm run webpack 
```

## 运行

执行`HTML`模板文件，即可显示`Datagrid`，支持远程取数、分页、单行点击。