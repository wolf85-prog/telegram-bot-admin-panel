import axios from "axios";
import {$host_smeta} from "./index";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_WEBAPP_SMETA
})

export const getPosters = async (srmId) =>{
    try {
        console.log(srmId)
       let response = await axiosInstance.get(`api/poster/${srmId}`);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getPosters api", error.message);
    }
}

export const deletePoster = async (posterId) =>{
    try {
        console.log(posterId)
       let response = await axiosInstance.delete(`api/poster/${posterId}`);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getPosters api", error.message);
    }
}

export const getPostersAll = async (srmId) =>{
    try {
        console.log(srmId)
       let response = await axiosInstance.get(`api/poster/posters`);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getPosters api", error.message);
    }
}