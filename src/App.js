import React, { useState, useEffect } from 'react';
import { HorizontalBarChart, BarChart, Table, Toast, ToastExtend } from './components';
import { dataProvider } from './helpers';
import track, { useTracking } from "react-tracking";
import styles from './app.module.css';
function App() {
  const { trackEvent } = useTracking();

  const [dataHorizontalBar, setDataHorizontalBar] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [list, setList] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastExtend, setShowToastExtend] = useState(false)
  const [userId] = useState(Math.floor(Math.random() * 2) + 1)
  const [errorDataChart1, setErrorDataChart1] = useState(false);
  const [errorDataChart2, setErrorDataChart2] = useState(false);
  const [errorDataTable, setErrorDataTable] = useState(false);
  const [reload, setReload] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logsList, setLogsList] = useState('');
  const { title_dashboard, right_to_left, from_bottom, reload_button, log_button, log_overlay, log_content } = styles;

  useEffect(() => {
    var timestamp = new Date().toISOString()
    trackEvent(
      [
        { user_id: userId, app: "dashboard", action: "loaad-data-chart-1", timestamp },
        { user_id: userId, app: "dashboard", action: "loaad-data-chart-2", timestamp },
        { user_id: userId, app: "dashboard", action: "loaad-data-chart-3", timestamp }
      ]
    )
    getDataChart1(userId);
    getDataChart2(userId);
    getDataTable(userId);
  }, [userId])

  useEffect(() => {
    if(!list.length){
      setReload(true)
    }
  },[list])


  function getDataChart1(userId) {
    dataProvider('get', `/chart1/${userId}`).then((res) => {
      setErrorDataChart1(false)
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var data = [];
      res.map((item) => {
        data.push({ label: months[item.month - 1], value: "O" + item.totalOrder })
      })
      setDataHorizontalBar(data)
    }).catch(err => {
      if (err) setErrorDataChart1(true)
    })
  }

  function getDataChart2(userId) {
    dataProvider('get', `/chart2/${userId}`).then((res) => {
      setErrorDataChart2(false)
      var data = [];
      res.map(item => {
        data.push({ value: item.total, label: item.category === 'kaos' ? 0 : 1 })
      })
      setDataBar(data)
    }).catch(err => {
      if (err) setErrorDataChart2(true)
    })
  }

  function getDataTable(userId) {
    dataProvider('get', `/table/${userId}`).then((res) => {
      setErrorDataTable(false)
      var tempList = [];
      res.map(item => {
        tempList.push({ ...item, checked: false, availability: item.available ? 'Available' : 'FULL', arrival: item.arrival ? 'Arrived' : `Hast'n arrived` })
      })
      setList(tempList)

    }).catch(err => {
      if (err) setErrorDataTable(true)
    })
  }

  function selectOne(row) {
    var tempList = [];
    var checkList = false;
    var checkToast = false;
    list.map((item) => {
      tempList.push(item)
    })
    tempList[row].checked = !tempList[row].checked
    tempList.map((item, index) => {
      if (!item.checked) {
        checkList = true;
      } else {
        checkToast = true
      }
    })
    setShowToast(checkToast)
    setCheckedAll(!checkList)
    setList(tempList)
    var timestamp = new Date().toISOString()
    trackEvent(
      [
        { user_id: userId, app: "dashboard", action: tempList[row].checked ? "select-one" : "unselect-one", timestamp, data: [tempList[row]], components: "table" }
      ]
    )
  }

  function selectAll() {
    var checkList = false;
    var tempList = []
    list.map((item, index) => {
      tempList.push(item)
      if (!item.checked) {
        checkList = true;
      }
    })
    setShowToast(checkList)
    setCheckedAll(checkList);
    tempList.map((item) => {
      item.checked = checkList;
    })
    setList(tempList)
    var timestamp = new Date().toISOString()
    trackEvent(
      [
        { user_id: userId, app: "dashboard", action: checkList ? "select-all" : "unselect-all", timestamp, data: tempList, components: "table" }
      ]
    )

  }

  function unSelectAll() {

    setShowToast(false)
    setCheckedAll(false);
    var tempList = [];
    list.map((item) => {
      tempList.push({ ...item, checked: false })
    })
    tempList.map((item) => {
      item.checked = false;
    })
    var timestamp = new Date().toISOString()
    trackEvent(
      [
        { user_id: userId, app: "dashboard", action: "unselect-all", timestamp, data: tempList, components: "float-button" }
      ]
    )
    setList(tempList)
  }

  function doDelete() {
    var deleteIds = [];
    var tempList = []
    list.map(item => {
      item.checked && deleteIds.push({ _id: item._id });
      item.checked && tempList.push(item)
    })
    dataProvider('delete', `/table`, { deleteIds }).then((res) => {
      var timestamp = new Date().toISOString()
      trackEvent(
        [
          { user_id: userId, app: "dashboard", action: "delete", timestamp, data: tempList, components: "float-button" }
        ]
      )
      setReload(true)
      setShowToast(false);
      unSelectAll()
      getDataTable(userId);
      getDataChart1(userId);
      getDataChart2(userId);
    }).catch(err => {
      if (err) console.log_content('error:', err)
    })

  }

  function openToastExtend() {
    var timestamp = new Date().toISOString()
    trackEvent(
      [
        { user_id: userId, app: "dashboard", action: "click-assign-category", timestamp, components: "float-button" }
      ]
    )
    setShowToastExtend(true)
  }

  function closeToastExtend() {
    setShowToastExtend(false)
  }

  function updateCategory(text) {
    var updateIds = [];
    var tempList = [];
    list.map(item => {
      item.checked && updateIds.push({ _id: item._id });
      item.checked && tempList.push(item);
    })
    dataProvider('put', `/table`, { updateIds, category: text }).then((res) => {
      var timestamp = new Date().toISOString()
      trackEvent(
        [
          { user_id: userId, app: "dashboard", action: "update-category", timestamp, data: tempList, update: { category: text }, components: "toast-extends" }
        ]
      )
      setReload(true)
      setShowToast(false);
      setShowToastExtend(false)
      unSelectAll()
      getDataTable(userId);
    }).catch(err => {
      if (err) console.log('error:', err)
    })
  }

  function reloadData() {
    dataProvider('get', `/reload`).then((res) => {
      var timestamp = new Date().toISOString()
      trackEvent(
        [
          { user_id: userId, app: "dashboard", action: "reload-data", timestamp, components: "button-reload-page" }
        ]
      )
      setReload(false)
      getDataChart1(userId);
      getDataChart2(userId);
      getDataTable(userId);
    }).catch(err => {
      if (err) console.log('error:', err)
    })
  }

  function getLogs() {
    dataProvider('get', `/logs/${userId}`).then((res) => {
      var timestamp = new Date().toISOString()
      trackEvent(
        [
          { user_id: userId, app: "dashboard", action: "reload-data", timestamp, components: "button-reload-page" }
        ]
      )
      setLogsList(JSON.stringify(res))
      setShowLogs(true)
    }).catch(err => {
      if (err) console.log('error:', err)
    })
  }

  const cols = [
    {
      title: 'Name',
      render: (rowData) => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: 'Category',
      render: (rowData) => {
        return <span>{rowData.category}</span>;
      },
    },
    {
      title: 'Availability',
      render: (rowData) => {
        return <span>{rowData.availability}</span>;
      },

    },
    {
      title: 'Arrival',
      render: (rowData) => {
        return <span>{rowData.arrival}</span>;
      },

    }

  ];

  return (
    <div style={{ width: '1280px' }}>
      <div className={right_to_left}>
        <div className={title_dashboard} >
          Charts Visualization
            <div style={{ float: "right" }}>
            {reload && <div className={reload_button} onClick={reloadData}>
              Reload Data
            </div>}

            <div className={log_button} onClick={getLogs}>
              Logs
            </div>
          </div>
        </div>

        <div className="container">
          <div style={{ width: '590px', display: 'inline-block' }}>
            <HorizontalBarChart label={'Chart 1'} data={dataHorizontalBar} pattern={['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9']} errorDataChart={errorDataChart1} />
          </div>
          <div style={{ width: '590px', display: 'inline-block', marginLeft: '20px', verticalAlign: 'top', height: '100%' }}>
            <BarChart
              errorDataChart={errorDataChart2}
              label={'Chart 2'}
              data={dataBar}
              pattern={[{ background: '#DAD7FE', label: 'Kaos' }, { background: '#4339F2', label: 'Kemeja' }]}
            />
          </div>
        </div>

      </div>
      <div className={`container ${from_bottom}`}>
        <Table cols={cols} list={list} selecOne={selectOne} checkedAll={checkedAll} selectAll={selectAll} errorDataTable={errorDataTable} />
      </div>
      <Toast showToast={showToast} list={list} unSelectAll={unSelectAll} doDelete={doDelete} openToastExtend={openToastExtend} />
      {showLogs && <div >
        <div className={log_overlay} onClick={() => { setShowLogs(false) }}>
        </div>
        <div className={log_content}>
          Logs <br />
          {logsList}
        </div>
      </div>}
      {showToastExtend && <ToastExtend closeToastExtend={closeToastExtend} updateCategory={updateCategory} />}
    </div>
  );
}

const trackDispatch = (data) => {
  var userId = data[0].user_id
  dataProvider('post', `/track/${userId}`, { data }).then((res) => {
    return;
  })
}
export default track({}, { dispatch: trackDispatch })(App);
