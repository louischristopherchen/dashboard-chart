import React from 'react';
import styles from './index.module.css';

export default function ToastExtends({ showToast, list = [], unSelectAll, doDelete, closeToastExtend,updateCategory }) {
  const { toast_extend, toast_overlay } = styles;

  function doSubmit(event) {

    if (event.keyCode === 13) {
      event.preventDefault()
      updateCategory(event.target.value)
    }
  }

  return (
    <div >
      <div className={toast_overlay} onClick={closeToastExtend}>

      </div>
      <div className={toast_extend} >
        <input type="text"
          style={{ border: 'none', height: '30px', outline: 'none', borderBottom: '2px solid #4339F2', width: '100%', fontWeight: 800 }}
          placeholder={'Type & Enter to Submit'}
          onKeyUp={doSubmit}
          
        />
      </div>
    </div>
  )
}