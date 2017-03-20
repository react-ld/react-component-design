import React, { Component } from 'react';
import { Loading, Message, Modal } from 'components'
import './App.less'

export default class App extends Component {
  state = {
    isLoading1: false,
    isLoading2: false,
    isMsgShow: false,
    isModalShow: false,
    modalValue: "",
    modalValue2: "",
  };
  handleLoading1 = () =>{
    console.info("handleLoading1")
    if(!this.state.isLoading1){
      this.setState({isLoading1: true});
      setTimeout(()=>{this.setState({isLoading1: false});}, 3000);
    }
  }

  handleLoading2 = () =>{
    console.info("handleLoading2")
    if(!this.state.isLoading2){
      this.setState({isLoading2: true});
      setTimeout(()=>{this.setState({isLoading2: false});}, 3000);
    }
  }

  handleMessage = () =>{
    Message("数据加载成功！", 2, ()=>{console.info("onclose")});
  }

  openModal = (text) => {
    // text = "是否删除改项目"
    text = <div>
      <p>第一行内容</p>
      <p>第二行内容</p>
      <p><a href="http://www.baidu.com" target="_blank">点击查看内容</a></p>
    </div>
    this.setState({
      modalValue: text,
      isModalShow: true,
    })
  }

  onClose = ()=>{
    this.setState({
      modalValue: "",
      isModalShow: false,
    })
  }

  onOK = () => {
    this.setState({
      modalValue: "",
      isModalShow: false,
    })
  }

  openModal2 = (text) => {
    text = "是否删除改项目"
    this.setState({
      modalValue2: text,
    })
  }

  onClose2 = ()=>{
    this.setState({
      modalValue2: "",
    })
  }

  onOK2 = () => {
    this.setState({
      modalValue2: "",
    })
  }

  render() {
    const{
      isLoading1,
      isLoading2,
      isMsgShow,
      isModalShow,
      modalValue,
      modalValue2,
    } = this.state;

    return (
      <div>
        <button onClick={this.handleLoading1}>点击 Loading 测试</button>
        <button onClick={this.handleLoading2}>点击 Loading 测试2</button>
        <button onClick={this.handleMessage}>点击 Messages 测试</button>
        <button onClick={this.openModal}>点击 Modal 测试</button>
        <button onClick={this.openModal2}>点击 Modal2 测试</button>
        { isLoading1 ? <Loading msg="加载中..."/> : "" }
        { isLoading2 ? 
          <Loading>
            <div className="custem-loading-box">
              <div className="custem-loading-icon"></div>
              <div className="custem-loading-text">更新数据中...</div>
            </div>
          </Loading>
          : "" 
        }
        {
          isModalShow ? <Modal text={modalValue} onCancel={this.onClose} onOk={this.onOK}/> : ""
        }
        {
          modalValue2 ? <Modal text={modalValue2} onCancel={this.onClose2} onOk={this.onOK2}/> : ""
        }
      </div>
    );
  }
}
