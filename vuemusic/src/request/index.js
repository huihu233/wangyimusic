import axios from 'axios'

export let server = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000,
})