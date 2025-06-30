import {$authHost, $host} from "./index";

export const sendMessageToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/sendmessage', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendMessageToTelegram api", error.message);
    }
}

export const delMessageToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/delmessage', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling delMessageToTelegram api", error.message);
    }
}

export const sendPhotoToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/sendphoto', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendPhotoToTelegram api", error.message);
    }
}

export const sendDocumentToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/senddocument', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendDocumentToTelegram api", error.message);
    }
}

export const sendDocumentFormToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/senddocumentform', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendDocumentFormToTelegram api", error.message);
    }
}

export const sendVideoToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/sendvideo', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendVideoToTelegram api", error.message);
    }
}

export const sendAudioToTelegram = async (data) =>{
    try {
       let response = await $host.post('api/botworhub/sendaudio', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendAudioToTelegram api", error.message);
    }
}

//-------------------------------------- Renthub ----------------------------------

export const sendMessageToTelegram2 = async (data) =>{
    try {
       let response = await $host.post('api/botrenthub/sendmessage', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendMessageToTelegram2 api", error.message);
    }
}

export const sendPhotoToTelegram2 = async (data) =>{
    try {
       let response = await $host.post('api/botrenthub/sendphoto', data);
       //console.log(response);
       return response;
    } catch (error) {
        console.log("error while calling sendPhotoToTelegram2 api", error.message);
    }
}