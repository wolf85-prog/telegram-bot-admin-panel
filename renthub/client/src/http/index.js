import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $host_renthub = axios.create({
    baseURL: process.env.REACT_APP_RENTHUB_API_URL
})

const $host_call = axios.create({
    baseURL: process.env.REACT_APP_WEBAPP_CALL
})



export {
    $host,
    $host_renthub,
    $host_call,
}