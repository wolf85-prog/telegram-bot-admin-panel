import {$authHost, $host} from "./index";

export const getSpecialist = async () =>{
    try {
       let response = await $host.get('api/specialist/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const getSpecCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/specialist/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const editSpecialist = async (data, id) =>{
    try {
        await $host.patch(`api/specialist/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editSpecialist api",error.message);
    }
}
