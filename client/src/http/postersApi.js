import {$host_smeta} from "./index";


export const getPosters = async (srmId) =>{
    try {
        console.log(srmId)
       let response = await $host_smeta.get(`poster/${srmId}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getPosters api", error.message);
    }
}