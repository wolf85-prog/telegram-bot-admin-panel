import {$authHost, $host, $host_renthub} from "./index";

export const getCompany = async () =>{
    try {
       let response = await $host_renthub.get('api/companys/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getCompany api", error.message);
    }
}

export const getCompanyCount = async (count, prev) =>{
    try {
       let response = await $host_renthub.get(`api/companys/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyCount api", error.message);
    }
}

export const editCompany = async (data, id) =>{
    try {
        await $host_renthub.patch(`api/companys/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editCompany api",error.message);
    }
}

export const addCompany = async (data) =>{
    try {
        let response = await $host_renthub.post(`api/companys/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addCompany api",error.message);
    }
}

export const deleteCompany = async (id) =>{
    try {
        await $host_renthub.get(`api/companys/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteCompany api",error.message);
    }
}


export const getCompanyCountAll = async () =>{
    try {
        let response = await $host_renthub.get(`api/companys/count/get`); 
        return response.data; 
    } catch (error) {
        console.log("error while calling getCompanyCountAll api",error.message);
    }
}

//file
export const uploadAvatar = async (data) =>{
    try {
        return await $host.post(`api/file/avatar`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadFile api",error.message);
        
    }
}