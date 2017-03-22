import React, { Component } from 'react';
import { Loading, Message, Modal } from 'components'
import './App.less'

export default class App extends Component {
  state = {
    loading1Msg: "",
    isLoading2: false,
    isMsgShow: false,
    isModalShow: false,
    modalValue: "",
    modalValue2: "",
  };
  handleLoading1 = () =>{
    console.info("handleLoading1")
    if(!this.state.loading1Msg){
      this.setState({loading1Msg: "加载中..."});
      setTimeout(()=>{this.setState({loading1Msg: ""});}, 3000);
    }
  }

  handleLoading2 = () =>{
    console.info("handleLoading2")
    if(!this.state.isLoading2){
      this.setState({isLoading2: true});
      setTimeout(()=>{this.setState({isLoading2: false});}, 30000);
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

  handleOnload = (a) =>{
    console.info(a)
  }
  
  render() {
    const{
      loading1Msg,
      isLoading2,
      isMsgShow,
      isModalShow,
      modalValue,
      modalValue2,
    } = this.state;

    return (
      <div>
        <img src="http://img1.gtimg.com/ninja/2/2017/03/ninja148996765198411.jpg" onLoad={this.handleOnload} alt=""/>
        <button onClick={this.handleLoading1}>点击 Loading 测试</button>
        <button onClick={this.handleLoading2}>点击 Loading 测试2</button>
        <button onClick={this.handleMessage}>点击 Messages 测试</button>
        <button onClick={this.openModal}>点击 Modal 测试</button>
        <button onClick={this.openModal2}>点击 Modal2 测试</button>
        { loading1Msg !== "" ? <Loading msg={loading1Msg}/> : "" }
        {
          isLoading2 ? 
          <Loading className="custom-loading" style={{height: 0}}>
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
