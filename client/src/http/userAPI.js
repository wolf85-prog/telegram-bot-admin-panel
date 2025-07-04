import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie"

//const [cookies, setCookie] = useCookie("token", "")

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    //localStorage.setItem('token', data.token)
    Cookies.set('token', data.token)

    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    //const [token, setToken] = useCookie("token", "")

    const {data} = await $host.post('api/user/login', {email, password})
    //localStorage.setItem('token', data.token)
    Cookies.set('token', data.token)

    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    //localStorage.setItem('token', data.token)
    Cookies.set('token', data.token)

    return jwt_decode(data.token)
}