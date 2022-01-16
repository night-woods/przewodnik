import axios from 'axios'

const client = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
})

export default client