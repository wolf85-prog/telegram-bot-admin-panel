import {$authHost, $host} from "./index";

export const getProjects = async () =>{
    try {
       let response = await $host.get('api/projectnew/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialist api", error.message);
    }
}

export const getProjectsDel = async () =>{
    try {
       let response = await $host.get('api/projectnew/delete/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsDel api", error.message);
    }
}

export const getProjectCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/projectnew/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectCount api", error.message);
    }
}

export const editProject = async (data, id) =>{
    try {
        await $host.patch(`api/projectnew/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editProject api",error.message);
    }
}

export const addProject = async (data) =>{
    try {
        let response = await $host.post(`api/projectnew/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addProject api",error.message);
    }
}

export const deleteProject = async (id) =>{
    try {
        await $host.get(`api/projectnew/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteProject api",error.message);
    }
}

export const getProjectId = async (id) =>{
    try {
       let response = await $host.get(`api/projectnew/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
    }
}
