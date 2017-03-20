import React, { Component, PropTypes } from 'react'
import './Modal.less'

export default class Modal extends Component {

  render() {
    let { text, onCancel, onOk, ...other} = this.props
    return (
      <div {...other} className="ms-modal">
        <div className="ms-modal-mask" onClick={onCancel}></div>
        <div className="ms-modal-box">
          <div className="icon icon-close" onClick={onCancel}></div>
          <div className="ms-modal-content">
            {/*<div>{text}</div>*/}
            { text }
          </div>
          <div className="ms-modal-btns">
            <button className="item cancel" onClick={onCancel}>取 消</button>
            <button className="item ok" onClick={onOk}>确 定</button>     
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  text: PropTypes.any,
  onCancel: PropTypes.func,
  onOk: PropTypes.func
}