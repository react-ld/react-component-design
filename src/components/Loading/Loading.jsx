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
      <div {...other} className={`ms-loading ${className ? className : ""}`}>
       { content }
      </div>
    )
  }
}
