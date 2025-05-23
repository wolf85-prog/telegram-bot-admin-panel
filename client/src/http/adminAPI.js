import {$authHost, $host, $host_bot, $host_bottest, $host_call, $host_person, $host_renthub, $host_smeta} from "./index";

export const getProjects = async () =>{
    try {
       let response = await $host_bot.get('projects');
       //console.log("projects: ", response.data);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjects api", error.message);
    }
}

export const getProjects2 = async () =>{
    try {
       let response = await $host_bot.get('projects2');
       console.log("projects: ", response.data.results);
       return response.data.results;
    } catch (error) {
        console.log("error while calling getProjects2 api", error.message);
    }
}


//api notion
export const getProjectAll = async () =>{
    try {
        let response = await $host_bot.get('projectall');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectAll api", error.message);
    }
}

//api notion
export const getProjectNewDate = async () =>{
    try {
        let response = await $host_bot.get('projectnewdate');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewDate api", error.message);
    }
}

//api бд
export const getProjectNewCash = async () =>{
    try {
        let response = await $host_bot.get('projectsnewcash');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewCash api", error.message);
    }
}

//api бд
export const getProjectCash = async () =>{
    try {
        let response = await $host_bot.get('projectscash');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectCash api", error.message);
    }
}

//api notion
export const getProjectCrmId = async (id) =>{
    try {
        let response = await $host_bot.get('project/crm/' + id);
        console.log("projectCrmIdAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectCrmId api", error.message);
    }
}

//api id notion
export const getProjectId = async (id) =>{
    try {
        let response = await $host_bot.get('project/' + id);
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
    }
}

export const newPlan = async (data) => {
    try {
        let response =  await $host.post(`api/plan/add`, data); 
        console.log("planAPI: ", response.data);
    } catch (error) {
        console.log("error while calling newPlan api", error.message);
    }
}

export const getPlan = async (date) => {
    try {
        let response =  await $host.get('api/plan/get/' + date); 
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getPlan api", error.message);
    }
}

export const addTimer = async (data) => {
    try {
        let response =  await $host.post(`api/plan/timer/add`, data);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling addTimer api", error.message);
    }
}

export const getProjectNew = async () => {
    try {
        let response =  await $host.get(`api/projectnew/get`);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNew api", error.message);
    }
}

export const getProjectNewId = async (id) => {
    try {
        let response =  await $host.get(`api/projectnew/get/` + id);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewId api", error.message);
    }
}

export const getProjectNewCreate = async (data) => {
    try {
        let response =  await $host.post(`api/projectnew/add`, data);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewCreate api", error.message);
    }
}

export const getProjectNewUpdate = async (data) => {
    try {
        let response =  await $host.post(`api/projectnew/update`, data);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewUpdate api", error.message);
    }
}

export const getProjectNewDel = async (data) => {
    try {
        let response =  await $host.post(`api/projectnew/del`, data);
        //console.log("planAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectNewDel api", error.message);
    }
}


export const getProjectsAllNotion = async () =>{
    try {
       let response = await $host_bot.get('projectsallnotion');
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsAllNotion api", error.message);
    }
}


//get Workers
export const getWorkers = async () =>{
    try {
       let response = await $host_bottest.get('workers');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const getWorkerId = async (chatId) =>{
    try {
       let response = await $host_bottest.get('workers/chat/' + chatId);
       //console.log("database: ", response);
       return response;
    } catch (error) {
        console.log("error while calling getWorkerId api", error.message);
    }
}


export const getBlocks = async (projectId) =>{
    try {
       let response = await $host_bot.get('blocks/' + projectId);
       //console.log("blockId: ", response);
       return response;
    } catch (error) {
        console.log("error while calling getBlocks api", error.message);
    }
}

export const getDatabaseId = async (blockId) =>{
    try {
       let response = await $host_bot.get('database/' + blockId);
       //console.log("database: ", response);
       return response;
    } catch (error) {
        console.log("error while calling getDatabase api", error.message);
    }
}



export const getProjectsApi = async () =>{
    try {
       let response = await $host.get('api/projects/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsApi api", error.message);
    }
}

export const getProjectsNewApi = async () =>{
    try {
       let response = await $host.get('api/projects/new/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsApi api", error.message);
    }
}

export const getProjectsNewApi2 = async () =>{
    try {
       let response = await $host.get('api/projectnew/get');
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsNewApi2 api", error.message);
    }
}

export const getCompanys = async () =>{
    try {
       let response = await $host_renthub.get('companys');
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanys api", error.message);
    }
}

export const getCompanyId = async (id) =>{
    try {
       let response = await $host_renthub.get(`company/${id}`);
       //console.log("getCompanyId: ", response.data);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompany api", error.message);
    }
}

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


//distribution
export const newDistribution = async (data) =>{
    try {
        let response = await $host.post(`api/distribution/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling newDistribution api",error.message);
    }
}

export const getDistributions = async()=>{
    try {
        let response = await $host.get('api/distributions/get');
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getDistributions api", error.message);
     }
}

export const delDistribution = async (id) =>{
    try {
        await $host.delete(`api/distributions/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}

export const editDistribution = async (data, id) =>{
    try {
        await $host.patch(`api/distributions/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editDistribution api",error.message);
    }
}

//--------------------------------------------------------------------------
//distribution2
//--------------------------------------------------------------------------
export const newDistributionW = async (data) =>{
    try {
        let response = await $host.post(`api/distributionw/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling newDistributionW api",error.message);
    }
}

export const getDistributionsW = async()=>{
    try {
        let response = await $host.get('api/distributionsw/get');
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getDistributionsW api", error.message);
     }
}

export const getDistributionsCountW = async(count, prev)=>{
    try {
        let response = await $host.get(`api/distributionsw/count/get/${count}/${prev}`);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getDistributionsW api", error.message);
     }
}

export const getDistributionsWPlan = async()=>{
    try {
        let response = await $host.get(`api/distributionsw/plan/get`);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getDistributionsWPlan api", error.message);
     }
}

export const getDistributionW = async(id)=>{
    try {
        let response = await $host.get(`api/distributionw/get/${id}`)
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getDistribution api", error.message);
     }
}

export const delDistributionW = async (id) =>{
    try {
        await $host.delete(`api/distributionsw/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}

export const delDistributionWPlan = async (data) =>{
    try {
        await $host.post(`api/distributionsw/delete`, data); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}

export const editDistributionW = async (data, id) =>{
    try {
        await $host.patch(`api/distributionsw/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editDistributionW api",error.message);
    }
}

export const editDistributionW2 = async (data, id) =>{
    try {
        await $host.patch(`api/distributionsw2/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editDistributionW2 api",error.message);
    }
}

export const editDistributionWAll = async (data, id) =>{
    try {
        await $host.patch(`api/distributionswall/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editDistributionW2 api",error.message);
    }
}

export const editDistributionWPlan = async (data) =>{
    try {
        await $host.post(`api/distributionsw/plan/update`, data); 
    } catch (error) {
        console.log("error while calling editDistributionW api",error.message);
    }
}


//pretendent
export const newPretendent = async (data) =>{
    try {
        let response = await $host.post(`api/pretendent/add`, data);
        return response.data; 
    } catch (error) {
        console.log("error while calling newDistribution api",error.message);
    }
}

export const getPretendentId = async(id)=>{
    try {
        let response = await $host.get(`api/pretendent/get/${id}`);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getPretendentId api", error.message);
     }
}

export const getPretendentProjectId = async(id)=>{
    try {
        let response = await $host.get(`api/pretendent/project/get/${id}`);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getPretendentProjectId api", error.message);
     }
}

export const editPretendent = async(id, data)=>{
    try {
        let response = await $host.patch(`api/pretendent/update/${id}`, data);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling editPretendent api", error.message);
     }
}


export const getCountMessage = async()=>{
    try {
        let response = await $host.get(`api/message/count/get`);
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getCountMessage api", error.message);
     }
}

// message
export const newCountMessage = async (count) =>{
    try {
        await $host.get(`api/message/count/add/${count}`); 
    } catch (error) {
        console.log("error while calling newCountMessage api",error.message);
    }
}

// wmessage
export const newCountWMessage = async (count) =>{
    try {
        await $host.get(`api/wmessage/count/add/${count}`); 
    } catch (error) {
        console.log("error while calling newCountWMessage api",error.message);
    }
}

// projects
export const newCountProjects = async (count) =>{
    try {
        await $host.get(`api/projects/count/add/${count}`); 
    } catch (error) {
        console.log("error while calling newCountProjects api",error.message);
    }
}

// pretendent
export const newCountMessagePretendent = async (count) =>{
    try {
        await $host.get(`api/pretendent/count/add/${count}`); 
    } catch (error) {
        console.log("error while calling newCountMessagePretendent api",error.message);
    }
}


//--------------------------------------------------------------------------------------

// message
export const editCountMessage = async (count) =>{
    try {
        await $host.get(`api/message/count/update`); 
    } catch (error) {
        console.log("error while calling newCountMessage api",error.message);
    }
}

// wmessage
export const editCountWMessage = async (count) =>{
    try {
        await $host.get(`api/wmessage/count/update`); 
    } catch (error) {
        console.log("error while calling newCountWMessage api",error.message);
    }
}

// pretendent
export const editCountMessagePretendent = async (count) =>{
    try {
        await $host.get(`api/pretendent/count/update`); 
    } catch (error) {
        console.log("error while calling newCountMessagePretendent api",error.message);
    }
}


//------------------------------------------------------------------------------------------

//notif
export const getSoundNotif = async()=>{
    try {
        let response = await $host.get('api/soundnotif/get');
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling getSoundNotif api", error.message);
     }
}

export const delSoundNotif = async()=>{
    try {
        let response = await $host.get('api/soundnotif/del');
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling delSoundNotif api", error.message);
     }
}


export const startSoundNotif = async()=>{
    try {
        let response = await $host_bot.get('api/startsoundnotif');
        //console.log(response);
        return response.data;
     } catch (error) {
         console.log("error while calling startSoundNotif api", error.message);
     }
}


//------------------------------------------------------------------------------------------

//call
export const getSendCall = async(tg_id)=>{
    try {
        const response = await $host_call.post('/calls', {
            "tg_id": tg_id,
            "type": "s"
        });
        console.log("call: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getSendCall api", error.message);
    }
}

//call
export const getSendCallRaut = async(tg_id)=>{
    try {
        const response = await $host_call.post('/calls/wake', {
            "tg_id": tg_id,
        });
        console.log("call raut: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getSendCallRaut api", error.message);
    }
}

//------------------------------------------------------------------------------------------

//update
export const getUpdateWorkers = async()=>{
    try {
        const response = await $host.get('api/workers/update/get');
        //console.log("update: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getUpdateWorkers api", error.message);
    }
}

//update avatar
export const getUpdateAvatars= async()=>{
    try {
        const response = await $host.get('api/workers/update/avatar/get');
        //console.log("update: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getUpdateAvatars api", error.message);
    }
}

//-------------------------------------------------------------------

//api бд
export const getPretendent= async (data) =>{
    try {
        let response = await $host.post('api/pretendent/get', data);
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getPretendent api", error.message);
    }
}


//-------------------------------------------------------------------

//api бд
export const getProcess= async (count, on) =>{
    try {
        let response = await $host_bot.get(`api/process/update/${count}/${on}`);
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProcess api", error.message);
    }
}


//create pred smeta
export const getCreatePredSmeta = async(id)=>{
    try {
        const response = await $host_smeta.post('/api/estimate/pre', {
            "srm_id": id.toString()
        });
        console.log("call: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getCreatePredSmeta api", error.message);
    }
}

//create pred smeta
export const getCreateFinSmeta = async(id)=>{
    try {
        const response = await $host_smeta.post('/api/estimate/pre-final', {
            "srm_id": id.toString()
        });
        console.log("call: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getCreatePredSmeta api", error.message);
    }
}

//create poster
export const getCreatePoster = async(id)=>{
    try {
        const response = await $host_smeta.post('/api/poster', {
            "srm_id": id.toString()
        });
        console.log("call: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getCreatePoster api", error.message);
    }
}


//-----------------------------------------------------------
//api бд
export const getManagerPerson= async () =>{
    try {
        let response = await $host_person.get('api/managers/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getManagerPerson api", error.message);
    }
}


export const getManagerCompany = async () =>{
    try {
        let response = await $host_person.get('api/companyprof/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getManagerCompany api", error.message);
    }
}


export const getManagerCount = async () =>{
    try {
        let response = await $host_person.get('api/managers/count/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getManagerCount api", error.message);
    }
}

export const getCompanyCount = async () =>{
    try {
        let response = await $host_person.get('api/companyprof/count/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getCompanyCount api", error.message);
    }
}

export const getClientCount = async () =>{
    try {
        let response = await $host_person.get('api/client/count/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getClientCount api", error.message);
    }
}

export const getWorkerCount = async () =>{
    try {
        let response = await $host_person.get('api/workers/count/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getWorkerCount api", error.message);
    }
}

export const getProjectCount = async () =>{
    try {
        let response = await $host_person.get('api/projects/count/get');
        //console.log("projectsAPI: ", response.data);
        return response.data;
    } catch (error) {
        console.log("error while calling getProjectCount api", error.message);
    }
}