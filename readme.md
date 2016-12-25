

## demo

```JavaScript
import React from 'react';
import Datagrid from 'ant-datagrid';
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