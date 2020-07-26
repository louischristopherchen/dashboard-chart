export default function dataProvider(method, endpoint, data) {
  var options = {};
  switch (method) {
    case 'put':
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }

      break;
    case 'post':
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }
      break;
    case 'get':
      options = {
        method: method,
        headers: new Headers()
      }

      break;
    case 'delete':
      options = {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }

      break;
    default: throw new Error('Please Check Your Method PUT/POST/GET')
  }


  return fetch(process.env.REACT_APP_API_URL + endpoint, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw (res)
    }
  })
}