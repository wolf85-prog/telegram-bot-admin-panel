import {$authHost, $host} from "./index";

export const getContacts = async () =>{
    try {
       let response = await $host.get('api/userbots/get');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUsers api", error.message);
    }
}

export const getContactId = async (id) =>{
    try {
       let response = await $host.get(`api/userbots/get/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUser api", error.message);
    }
}

export const editContact = async (data, id) =>{
    try {
       let response = await $host.patch(`api/userbots/update/${id}`, data);
       console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContact api", error.message);
    }
}

export const editContactAvatar = async (data, id) =>{
    try {
       let response = await $host.patch(`api/userbots/updatefile/${id}`, data);
       console.log("response: ", response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContactAvatar api", error.message);
    }
}

export const setConversation= async (data)=>{
    try {
        await $host.post('api/conversation/add', data);
    } catch (error) {
        console.log("error while calling setConversation api", error.message);
        
    }
}

export const getConversation= async (id)=>{
    try {
       let response= await $host.get(`api/conversation/get/${id}`);
       if (response.data === null) {
            return null;
       }
        return response.data.id
    } catch (error) {
        console.log("error while calling getConversation api", error.message);
        
    }
}

// message
export const newMessage = async (data) =>{
    try {
        await $host.post(`api/message/add`, data); 
    } catch (error) {
        console.log("error while calling newMessage api",error.message);
    }
}

export const delMessage = async (id) =>{
    try {
        await $host.delete(`api/message/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}


export const getMessages = async(id)=>{
    try {
        let response= await $host.get(`api/message/get/${id}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getMessages api",error.message);
        
    }
}

export const getLastMessages = async(id)=>{
    try {
        let response= await $host.get(`api/message/last/get/${id}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getLastMessages api",error.message);
        
    }
}

export const getAllMessages = async()=>{
    try {
        let response= await $host.get(`api/message/get`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getAllMessages api",error.message);
        
    }
}

//file
export const uploadFile = async (data) =>{
    try {
        return await $host.post(`api/file/upload`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadFile api",error.message);
        
    }
}