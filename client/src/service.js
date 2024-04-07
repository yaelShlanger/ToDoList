import axios from 'axios';

const apiUrl = process.env.REACT_APP_API
axios.defaults.baseURL=process.env.REACT_APP_API

//errors
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
 console.log(error)
  //return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  console.log(error)
  //return Promise.reject(error);
});


export default {
  getTasks: async () => {
    const result = await axios.get(apiUrl)    
    return result.data;
  },

  addTask: async(name)=>{
    await axios.post(`${apiUrl}${name}`)    
    return {};
  },

  setCompleted: async(id, isComplete)=>{
        await axios.put(`${apiUrl}${id}/${isComplete}`)
        return{};
  },

  deleteTask:async(id)=>{
        await axios.delete(`${apiUrl}${id}`)
        return{};
  }
};
