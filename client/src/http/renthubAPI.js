import {$authHost, $host, $host_renthub, $host_worker} from "./index";

export const getRManagers = async () =>{
    try {
       let response = await $host.get('api/rmanagers/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const getRManagerCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/rmanagers/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkersCount api", error.message);
    }
}

export const getRManager = async (id) =>{
    try {
       let response = await $host.get(`api/rmanagers/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorker api", error.message);
    }
}

export const getRContacts = async () =>{
    try {
       let response = await $host.get('api/ruserbots/get');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getRContacts api", error.message);
    }
}

export const getRContactId = async (id) =>{
    try {
       let response = await $host.get(`api/ruserbots/get/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUser api", error.message);
    }
}

export const editRContact = async (data, id) =>{
    try {
       let response = await $host.patch(`api/ruserbots/update/${id}`, data);
       console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContact api", error.message);
    }
}

export const editContactAvatar = async (data, id) =>{
    try {
       let response = await $host.patch(`api/ruserbots/updatefile/${id}`, data);
       console.log("response: ", response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContactAvatar api", error.message);
    }
}

export const setRConversation= async (data)=>{
    try {
        await $host.post('api/rconversation/add', data);
    } catch (error) {
        console.log("error while calling setConversation api", error.message);
        
    }
}

export const getRConversation= async (id)=>{
    try {
       let response= await $host_renthub.get(`api/conversation/get/${id}`);
       if (response.data === null) {
            return null;
       }
        return response.data.id
    } catch (error) {
        console.log("error while calling getConversation api", error.message);       
    }
}

export const getRConversations= async ()=>{
    try {
       let response= await $host_renthub.get(`api/conversations/get`);
       return response.data;
    } catch (error) {
        console.log("error while calling getConversation api", error.message);       
    }
}

// message
export const newRMessage = async (data) =>{
    try {
        await $host_renthub.post(`api/message/add`, data); 
    } catch (error) {
        console.log("error while calling newMessage api",error.message);
    }
}

export const delRMessage = async (id) =>{
    try {
        await $host_renthub.delete(`api/message/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}


export const getRMessages = async(id)=>{
    try {
        let response
        if (id !== null) {
            response = await $host_renthub.get(`api/message/get/${id}`);
        } else {
            return [] 
        }
         
        return response.data;
    } catch (error) {
        console.log("error while calling getMessages api",error.message);
        
    }
}

export const getRMessages2 = async(id, count, prev)=>{
    try {
        let response
        if (id !== null) {
            response = await $host.get(`api/rmessage2/get/${id}/${count}/${prev}`);
        } else {
            return [] 
        }
         
        return response.data;
    } catch (error) {
        console.log("error while calling getMessages api",error.message);
        
    }
}

export const getAllRMessages = async()=>{
    try {
        let response= await $host.get(`api/rmessage/get`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getAllWMessages api",error.message);
        
    }
}

export const getRMessagesCount = async(count)=>{
    try {
        let response= await $host.get(`api/rmessage/get/count/${count}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getRMessagesCount api",error.message);
        
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
