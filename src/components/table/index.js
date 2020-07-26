import React from 'react';
import styles from './index.module.css';

export default function Table({ cols = [], list = [], useCheckbox = true, selectAll, selecOne, checkedAll = false, errorDataTable = false }) {
  const { table_title, table_title_checkbox, table_body_checkbox, table_body, table_body_content, table_title_content, no_data } = styles

  return (
    <div>
      <div className={table_title_content}>
        {useCheckbox ? <div className={table_title_checkbox}>
          <label className="checkbox-container">
            <input type="checkbox" onChange={selectAll} checked={checkedAll} />
            <span className="checkmark"></span>
          </label>
        </div> : <div className={table_title_checkbox}>
            <label className="checkbox-container">
            </label>
          </div>}
        {cols.map((item, index) => {
          return <div className={table_title} key={index}>{item.title}</div>
        })}
      </div>

      {list.length ? list.map((item, index) => {
        return (
          <div className={table_body_content} key={index}>
            <div className={table_body_checkbox}>
              <label className="checkbox-container">
                <input type="checkbox" checked={item.checked} onChange={() => selecOne(index)} />
                <span className="checkmark"></span>
              </label>
            </div>
            {cols.map((col, key) => {
              return <div className={table_body} key={key}>{col.render(item)}</div>
            })}

          </div>
        )
      }) :
        <div className={`${table_body_content} ${no_data}`}>
          {errorDataTable ? 'Please check your internet connection and reload' : 'No Data'}
        </div>
      }





    </div>
  )
}