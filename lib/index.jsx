import React from 'react';
import {Table,Pagination} from 'antd';

const fetch=(page,size,condition)=>{
    return new Promise((resolve,reject)=>{
        resolve({
            rows:[],
            count:0,
        });
    });
};

const Datagrid=React.createClass({

    getDefaultProps:function(){
        return {
            columns:[ ],
            onRowClick:(record,index)=>{},
            fetch:fetch,
            condition:{},
            refreshCode:0,
        };
    },

    getInitialState:function(){
        return { dataSource:[], total:0, size:5, current:1, };
    },

    componentDidMount:function(){
        this.fetchAndSetState(this.state.current,this.state.size,{});
    },

    componentWillReceiveProps:function(nextProps){
        if(nextProps.key==this.props.refreshCode){
            return;
        }else{
            this.fetchAndSetState(this.state.page,this.state.size,this.props.condition);
        }
    },

    fetchAndSetState:function(page=1,size=10,condition={},...args){
        this.props.fetch(page,size,condition)
            .then(info=>{
                this.setState({
                    dataSource:info.rows,
                    total:info.count,
                    current:page,
                    size:size,
                });
            })
            .catch(error=>{
                console.log(`error happens when fetching and setting state\t`,error);
                alert(error);
            });
    },

    render:function(){
        return (<div>
            <Table dataSource={this.state.dataSource} columns={this.props.columns} onRowClick={this.props.onRowClick} pagination={false} />
            <Pagination total={this.state.total} pageSize={this.state.size} current={this.state.current} 
                onChange={(page)=>{
                    this.setState({current:page},()=>{
                        this.fetchAndSetState(page,this.state.size,this.props.condition);
                    });
                }} 
            />
        </div>);
    }
});



export default Datagrid;