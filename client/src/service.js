import axios from 'axios';

const apiUrl = "http://localhost:5273/"
axios.defaults.baseURL="`http://localhost:5273/"

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
    await axios.post(`http://localhost:5273/${name}`)    
    return {};
  },

  setCompleted: async(id, isComplete)=>{
        await axios.put(`http://localhost:5273/${id}/${isComplete}`)
        return{};
  },

  deleteTask:async(id)=>{
        await axios.delete(`http://localhost:5273/id/${id}`)
        return{};
  }
};
