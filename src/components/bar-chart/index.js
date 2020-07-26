import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function HorizontalBarChart({ label = '', pattern = [{ background: '#DAD7FE', label: 'default 1' }, { background: '#4339F2', label: 'default 2' }], data = [],errorDataChart=false }) {

  const [max, setMax] = useState(0);

  useEffect(() => {
    cekMax(data)
  }, [data])

  function cekMax(data) {
    var temp = [];
    data.map((item) => {
      temp.push(item.value)
    })
    setMax(Math.max(...temp))
  }
  const { chart_label, content, bar, h_176, mt_27, bar_content, bar_label, bar_value, no_data } = styles;

  return (
    <div className={content} >
      {data.length ? <div>
        <div className={chart_label}>
          {label}
        </div>
        <div className={h_176}>
          {max && data.map((item, index) => {
            return (<div className={bar} key={index} style={{ height: `${(item.value / max) * 100}%`, background: `${pattern[item.label].background}` }} />)
          })}
        </div>
        <div className={mt_27}>
          {pattern.map((item, index) => {
            return (<div className={bar_content} key={index}>
              <div className={bar_value} style={{ background: item.background }} />
              <div className={bar_label}>{item.label}</div>
            </div>)
          })}
        </div>
      </div> :
        <div className={no_data}>
           {errorDataChart? 'Please check your internet connection and reload':'No Data'}
      </div>
      }
    </div>
  );
}