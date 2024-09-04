import {$authHost, $host} from "./index";

export const getWorkers = async () =>{
    try {
       let response = await $host.get('api/specialist/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}
