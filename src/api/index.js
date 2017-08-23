import axios from 'axios';

const postConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
};

export const runBatch = (name) => {
  let data = {
    body: "{ name:\"" + name + "\"}"
  };
  let url = 'http://localhost:8000/api/run/';
  return axios.post(url, data, postConfig);
}

export const getUserlListAxios = (filter) => {
  console.log("filter:" + filter)
  let data = {
    body: "{ name: { $regex: \"" + filter + "\"}}"
  };
  let url = 'http://localhost:8000/api/batches/find/';

  return axios.post(url, data, postConfig);
}

export const getBatchLogsAxios = (filter) => {
  let data = {
    body: "{ name: { $regex: \"" + filter + "\"}}"
  };
  let url = 'http://localhost:8000/api/logs/find/';

  return axios.post(url, data, postConfig);
}
