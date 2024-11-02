import {$authHost, $host} from "./index";

export const getMainSpecProject = async (id) =>{
    try {
       let response = await $host.get(`api/mainspec/project/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getMainSpecProject api", error.message);
    }
}

export const editMainspec = async (data, id) =>{
    try {
        await $host.patch(`api/mainspec/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editMainspec api",error.message);
    }
}

export const addMainspec = async (data) =>{
    try {
        let response = await $host.post(`api/mainspec/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addMainspec api",error.message);
    }
}

export const deleteMainspec = async (id) =>{
    try {
        await $host.get(`api/mainspec/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteMainspec api",error.message);
    }
}

export const getMainSpecId = async (id) =>{
    try {
       let response = await $host.get(`api/mainspec/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getMainSpecId api", error.message);
    }
}
