import {$authHost, $host} from "./index";

export const getCompany = async () =>{
    try {
       let response = await $host.get('api/companys/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getCompany api", error.message);
    }
}

export const getCompanyCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/companys/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyCount api", error.message);
    }
}

export const editCompany = async (data, id) =>{
    try {
        await $host.patch(`api/companys/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editCompany api",error.message);
    }
}

export const addCompany = async (data) =>{
    try {
        let response = await $host.post(`api/companys/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addCompany api",error.message);
    }
}

export const deleteCompany = async (id) =>{
    try {
        await $host.get(`api/companys/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteCompany api",error.message);
    }
}


export const getCompanyCountAll = async () =>{
    try {
        let response = await $host.get(`api/companys/count/get`); 
        return response.data; 
    } catch (error) {
        console.log("error while calling getCompanyCountAll api",error.message);
    }
}