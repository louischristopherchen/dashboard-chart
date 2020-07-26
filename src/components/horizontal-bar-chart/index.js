import React from 'react';
import styles from './index.module.css';

export default function HorizontalBarChart({ label = '', pattern = [], data = [],errorDataChart=false }) {
  const { chart_label, content, bar, bar_margin, progress, x_asis_label, x_axis_no_lable, y_asis, y_asis_label,no_data } = styles

  return (
    <div className={content}>
      {data.length ? <div>
        <div className={chart_label}>
          {label}
        </div>

        {data.map((item, index) => {
          return (<div className={bar_margin} key={index}>
            <div className={x_asis_label}>
              {item.label}
            </div>
            {pattern.indexOf(item.value) === 0 ? <div className={bar} >
              <div className={progress} style={{ width: `${10 / (pattern.length - 1)}%` }} />
            </div> :
              pattern.indexOf(item.value) === pattern.length - 1 ? <div className={bar} >
                <div className={progress} style={{ width: `${100}%` }} />
              </div> : <div className={bar} >
                  <div className={progress} style={{ width: `${(pattern.indexOf(item.value) * 100 / (pattern.length - 1))}%` }} />
                </div>}
          </div>)
        })}
        <div>
          <div className={x_axis_no_lable}></div>
          <div className={y_asis}>
            <div className={y_asis_label}>
              {pattern.map((item, index) => {
                return (<div key={index}>{item}</div>)
              })}
            </div>
          </div>
        </div>

      </div>
        : <div className={no_data}>
          {errorDataChart? 'Please check your internet connection and reload':'No Data'}
          </div>}

    </div>
  );
}