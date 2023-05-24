import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $host_bot = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_URL
})

const $host_worker = axios.create({
    baseURL: process.env.REACT_APP_WORKER_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $host_bot,
    $authHost
}