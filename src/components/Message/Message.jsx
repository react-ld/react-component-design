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
