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


export const getWorkersReport = async (srmId) =>{
    try {
        console.log(srmId)
       let response = await axiosInstance.get(`api/report/workers/${srmId}`);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkersReport api", error.message);
    }
}

export const createWorkersReport = async (data) =>{
    try {
        
       let response = await axiosInstance.post(`api/report/workers`, data);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkersReport api", error.message);
    }
}

export const deleteWorkersReport = async (reportId) =>{
    try {
        console.log(reportId)
       let response = await axiosInstance.delete(`api/report/workers/report/${reportId}`);
       //console.log(response);
       console.log(response.data)
       return response.data;
    } catch (error) {
        console.log("error while calling getPosters api", error.message);
    }
}