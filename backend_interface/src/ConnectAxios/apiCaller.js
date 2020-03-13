import axios from 'axios'


export default function callApi(endpoint, method ,body){
  return axios({
    method: method,
    url: `/${endpoint}`,
    data: body
  })
  .catch((error) => { console.log(error); return Promise.reject(error)});
}

