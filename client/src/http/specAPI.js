import {$authHost, $host, $host_worker} from "./index";

export const getSpecialist = async () =>{
    try {
       let response = await $host.get('api/specialist/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialist api", error.message);
    }
}

export const getSpecCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/specialist/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecCount api", error.message);
    }
}

export const editSpecialist = async (data, id) =>{
    try {
        await $host.patch(`api/specialist/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editSpecialist api",error.message);
    }
}

export const addSpecialist = async (data) =>{
    try {
        let response = await $host.post(`api/specialist/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addSpecialist api",error.message);
    }
}

export const deleteSpecialist = async (id) =>{
    try {
        await $host.get(`api/specialist/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteSpecialist api",error.message);
    }
}

export const getSpecCountAll = async () =>{
    try {
        let response = await $host.get(`api/specialist/count/get`);
        return response.data; 
    } catch (error) {
        console.log("error while calling getSpecCountAll api",error.message);
    }
}

export const getSpecialistId = async (id) =>{
    try {
       let response = await $host.get(`api/specialist/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialistId api", error.message);
    }
}

export const getSpecialistChatId = async (id) =>{
    try {
       let response = await $host.get(`api/specialist/chat/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialistChatId api", error.message);
    }
}

export const blockedSpecialist = async (id) =>{
    try {
       let response = await $host.get(`api/specialist/block/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling blockedSpecialist api", error.message);
    }
}


export const sendSpecialistOtkaz = async (id, data) =>{
    try {
       let response = await $host_worker.post(`api/specialist/otkaz/send/${id}`, data);
       return response.data;
    } catch (error) {
        console.log("error while calling sendSpecialistOtkaz api", error.message);
    }
}
