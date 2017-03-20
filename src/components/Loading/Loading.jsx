import React, { Component, PropTypes } from 'react'
import './Loading.less'

export default class Loading extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      msg,
      children,
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
      <div {...other} className="ms-loading">
       { content }
      </div>
    )
  }
}

Loading.propTypes = {
  msg: PropTypes.string,
}