import {$authHost, $host} from "./index";

export const getManager = async () =>{
    try {
       let response = await $host.get('api/managers/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getManager api", error.message);
    }
}

export const getManagerCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/managers/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerCount api", error.message);
    }
}

export const editManager = async (data, id) =>{
    try {
        await $host.patch(`api/managers/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editManager api",error.message);
    }
}

export const addManager = async (data) =>{
    try {
        let response = await $host.post(`api/managers/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addManager api",error.message);
    }
}

export const deleteManager = async (id) =>{
    try {
        await $host.get(`api/managers/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteManager api",error.message);
    }
}


export const getManagerCountAll = async () =>{
    try {
        await $host.get(`api/managers/count/get`); 
    } catch (error) {
        console.log("error while calling getManagerCountAll api",error.message);
    }
}