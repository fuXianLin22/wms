import axios from 'axios'
import store from '@/store'
// console.log(store)

const request = axios.create({
  baseURL: 'http://localhost:3000/'
})
request.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    // console.log(store)
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error)
)
export default request
