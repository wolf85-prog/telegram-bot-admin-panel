import {$authHost, $host} from "./index";

export const getUsers = async () =>{
    try {
       let response = await $host.get('api/userbots/get');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getUsers api", error.message);
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
        return response.data;
    } catch (error) {
        console.log("error while calling getConversation api", error.message);
        
    }
}


export const newMessage = async (data) =>{
    try {
        await $host.post(`api/message/add`, data); 
    } catch (error) {
        console.log("error while calling newMessage api",error.message);
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

// export const uploadFile = async (data) =>{
//     try {
//         return await $host.post(`${url}/file/upload`, data);
//     } catch (error) {
//         console.log("error while calling uploadFile api",error.message);
        
//     }
// }