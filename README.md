# react-component-design
Description how to design react component

# 引言
因为 React 框架的特殊架构，完全由数据来驱动展示（显示层），因此 React 项目中的组件设计与传统的 jQuery 有很大的区别。本文的目的主要在于介绍如何设计通用型 React 组件，通过本教程学习可以基本掌握轻量级 React 组件设计开发。

# Loading 组件开发
下面为 Loading 组件的代码：
```js
import React, { Component, PropTypes } from 'react'
import './Loading.less'

export default class Loading extends Component {
  static propTypes = {
    msg: PropTypes.string,
  }

  render() {
    const {
      msg,
      children,
      className,
      ...other
    } = this.props

    let content = (
        <div className="loading-box">
          <div className="loading-icon">
          </div>
          <p className="loading-text">{msg}</p>
        </div>
    )
    if(children){
      content = children;
    }

    return (
      <div {...other} className={`ms-loading ${className}`}>
       { content }
      </div>
    )
  }
}

```
### 组件说明
- 该 React 组件，可接受 props.msg 和 props.children 参数。当 props.children 为空时使用默认的 Loading 组件 Dom 结构来展示 props.msg。
注：props.children 为 React 组件默认参数，其传递形式如下：
  ```js
  <Loading>
    <div></div>{/*此处为 Loading 组件的 props.children 参数*/}
  </Loading>
  ```
- 如下用法为 ES7 对象的 Reset  参数，用于获取所有可遍历但尚未被读取的属性。
  ```js
  const {
    msg,
    children,
    className,
    ...other
  } = this.props
  ```
  如下用法为 ES7 对象的扩展运算符
  ```js
  <div {...other} className={`ms-loading ${className}`}>
  ```
  通过上面的两个 ES7 语法可以实现设置 Loading 组件根节点的各种属性和方法。例如：style\ref\onClick 等。**建议在开发组件时尽量维持这种默认属性和方法的可用性，在使用组件时可以方便的处理特殊情景的需求**

- [class 的静态属性和实例属性](http://es6.ruanyifeng.com/#docs/class#Class的静态属性和实例属性) 为 ES7 的语法需要 babel 插件 [transform-class-properties](http://babeljs.io/docs/plugins/transform-class-properties/) 支持
  ```js
  static propTypes = {
    msg: PropTypes.string,
  }
  ```
### 组件的使用
- 实现组件的展示和隐藏
  ```js
  state = {
    loading1Msg: ""
  };
  handleLoading1 = () =>{
    if(!this.state.loading1Msg){
      this.setState({loading1Msg: "加载中..."});
      setTimeout(()=>{this.setState({loading1Msg: ""});}, 3000);
    }
  }
  render(){
    const {
      loading1Msg
    } = this.state
    
    return (
      <div>
        {
          loading1Msg !== "" ? 
          <Loading msg={loading1Msg}/> 
          : ""
        }
      </div>
    )
  }
  ```
- 自定义组件展示 Dom 并且设置 className\style
  ```js
  state = {
    isLoading2: false
  };
  handleLoading2 = () =>{
    if(!this.state.isLoading2){
      this.setState({isLoading2: true});
      setTimeout(()=>{this.setState({isLoading2: false});}, 3000);
    }
  }
  render(){
    const {
      isLoading2
    } = this.state
    
    return (
      <div>
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
      </div>
    )
  }
  ```
  
# Message 组件开发
组件代码如下：
```js
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Message.less'

const defaultDuration = 1.5

class Notification extends Component {

  state = {
    msg: "",
  };

  add = (msg, duration, onClose) =>{
    this.setState({msg});
    setTimeout(()=>{
      this.setState({msg: ""});
      onClose();
    }, (duration || defaultDuration) * 1000);
  }

  render() {
    let content = ""
    if(this.state.msg){
      content = <div key="tips-box" className="tips-box">
          <p className="tips-text">{this.state.msg}</p>
        </div>
    }

    return (
      <div className="ms-tips">
        <ReactCSSTransitionGroup
          transitionName="message"
          transitionEnterTimeout={500}
          transitionLeave={false}>
          { content }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

function createInstance() {
  let div;
  div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification />, div);

  return {
    notice(msg, duration, onClose) {
      notification.add(msg, duration, onClose);
    },
    component: notification,
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
};

let instance = null

export default function Message(msg, duration, onClose){
  if(!instance){
    instance = createInstance();
  }

  instance.notice(msg, duration, onClose);
}
```

## 组件说明
- Message 组件为全局通用型组件，在 body 中创建了一个新的 div 元素用于渲染 Message 组件，与业务层根节点 div 区别开来。该思路参考了 [ant-design rc-notification](https://github.com/react-component/notification/) 组件的设计。
  ```js
  let div;
  div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification />, div);
  ```
- 组件只对外开放一个 Message 函数，通过该函数即可调用组件展示内容。

### 组件的使用
```js
import Message from './components/Message.jsx'
handleMessage = () =>{
  Message("数据加载成功！", 2, ()=>{console.info("onclose")});
}
```
- **代码省略了父组件的具体实现**
- 支持接受三个参数，(msg, duration, onClose)，即消息内容文本、提示持续时长、提示结束回调函数

# 参考
- [ant-design rc-notification](https://github.com/react-component/notification/)
- [深入理解 React 高阶组件（翻译）](https://zhuanlan.zhihu.com/p/24776678)