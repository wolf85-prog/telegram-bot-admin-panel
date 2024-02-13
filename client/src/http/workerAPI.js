import {$authHost, $host, $host_worker} from "./index";

export const getWorkerNotionId = async (id) =>{
    try {
       let response = await $host_worker.get(`api/workers/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkerNotionId api", error.message);
    }
}

export const getWorkersNotion = async (id) =>{
    try {
       let response = await $host_worker.get(`api/workers`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkersNotion api", error.message);
    }
}

export const getWorkerChildrenId = async (id) =>{
    try {
       let response = await $host_worker.get(`api/workers/children/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkerChildrenId api", error.message);
    }
}

export const getWorkers = async () =>{
    try {
       let response = await $host.get('api/workers/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const getAllPretendent = async () =>{
    try {
       let response = await $host.get('api/pretendents/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getAllPretendent api", error.message);
    }
}

export const getLastPretendent = async (id) =>{
    try {
       let response = await $host.get(`api/pretendent/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getAllPretendent api", error.message);
    }
}

export const getWContacts = async () =>{
    try {
       let response = await $host.get('api/wuserbots/get');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUsers api", error.message);
    }
}

export const getWContactId = async (id) =>{
    try {
       let response = await $host.get(`api/wuserbots/get/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUser api", error.message);
    }
}

export const editContact = async (data, id) =>{
    try {
       let response = await $host.patch(`api/wuserbots/update/${id}`, data);
       console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContact api", error.message);
    }
}

export const editContactAvatar = async (data, id) =>{
    try {
       let response = await $host.patch(`api/wuserbots/updatefile/${id}`, data);
       console.log("response: ", response);
       return response.data;
    } catch (error) {
        console.log("error while calling editContactAvatar api", error.message);
    }
}

export const setWConversation= async (data)=>{
    try {
        await $host.post('api/wconversation/add', data);
    } catch (error) {
        console.log("error while calling setConversation api", error.message);
        
    }
}

export const getWConversation= async (id)=>{
    try {
       let response= await $host.get(`api/wconversation/get/${id}`);
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
        await $host.post(`api/wmessage/add`, data); 
    } catch (error) {
        console.log("error while calling newMessage api",error.message);
    }
}

export const delMessage = async (id) =>{
    try {
        await $host.delete(`api/wmessage/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}


export const getWMessages = async(id)=>{
    try {
        let response
        if (id !== null) {
            response = await $host.get(`api/wmessage/get/${id}`);
        } else {
            return [] 
        }
         
        return response.data;
    } catch (error) {
        console.log("error while calling getMessages api",error.message);
        
    }
}

export const getAllMessages = async()=>{
    try {
        let response= await $host.get(`api/wmessage/get`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getAllMessages api",error.message);
        
    }
}


//api notion получить данные проекта по его id
export const getProjectId = async (id) =>{
    try {
        let response = await $host_worker.get('api/project/' + id);
        console.log("projectIdAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
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