import axios from "axios";
import Cookies from "js-cookie"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $host_bot = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_URL
})

const $host_bottest = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_URL_TEST
})

const $host_worker = axios.create({
    baseURL: process.env.REACT_APP_WORKER_API_URL
})

const $host_renthub = axios.create({
    baseURL: process.env.REACT_APP_API_URL_RENT
})

const $host_call = axios.create({
    baseURL: process.env.REACT_APP_WEBAPP_CALL
})

const $host_smeta = axios.create({
    baseURL: process.env.REACT_APP_WEBAPP_SMETA
})

const $host_person = axios.create({
    baseURL: process.env.REACT_APP_PERSON_ADMIN_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    //config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.authorization = `Bearer ${Cookies.get("token")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $host_renthub,
    $host_bot,
    $host_bottest,
    $host_worker,
    $host_call,
    $host_smeta,
    $host_person,
    $authHost
}