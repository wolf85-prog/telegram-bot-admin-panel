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
