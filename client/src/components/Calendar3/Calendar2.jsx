import { React, useEffect, useState, useRef  } from 'react'

import {
    CButton,
  } from '@coreui/react'

import './Calendar2.css'
import Select from 'react-select'

import { useUsersContext } from "../../chat-app-new/context/usersContext";
import { addProject } from '../../http/projectAPI'
import statusData from 'src/data/statusData';

export default function Calendar2({projects, setProjects, openProject, setHeight, showSidebar, setShowSidebar, setShowProject, setShowCalendar, setShowCalendar2}) {
    //const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays, DAYS_OF_THE_WEEK } = useUsersContext();
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const manthList = [
        { value: 'Январь', label: 'Январь' },
        { value: 'Февраль', label: 'Февраль' },
        { value: 'Март', label: 'Март' },
        { value: 'Апрель', label: 'Апрель' },
        { value: 'Май', label: 'Май' },
        { value: 'Июнь', label: 'Июнь' },
        { value: 'Июль', label: 'Июль' },
        { value: 'Август', label: 'Август' },
        { value: 'Сентябрь', label: 'Сентябрь' },
        { value: 'Октябрь', label: 'Октябрь' },
        { value: 'Ноябрь', label: 'Ноябрь' },
        { value: 'Декабрь', label: 'Декабрь' },
    ]
    // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [currentDays, setCurrentDays] = useState([]);
    const [showButtonAdd, setShowButtonAdd] = useState([])
    const [showButtonAdd2, setShowButtonAdd2] = useState([])
    const [showButtonAdd3, setShowButtonAdd3] = useState([])
    const [showButtonAdd4, setShowButtonAdd4] = useState([])
    const [showButtonAdd5, setShowButtonAdd5] = useState([])
    const [showButtonAdd6, setShowButtonAdd6] = useState([])
    const [showButtonAdd7, setShowButtonAdd7] = useState([])

    const [project, setProject] = useState([])
    const [project2, setProject2] = useState([])
    const [project3, setProject3] = useState([])
    const [project4, setProject4] = useState([])
    const [project5, setProject5] = useState([])
    const [project6, setProject6] = useState([])
    const [project7, setProject7] = useState([])

    const [projectName, setProjectName] = useState([])
    const [projectName2, setProjectName2] = useState([])
    const [projectName3, setProjectName3] = useState([])
    const [projectName4, setProjectName4] = useState([])
    const [projectName5, setProjectName5] = useState([])
    const [projectName6, setProjectName6] = useState([])
    const [projectName7, setProjectName7] = useState([])

    const [projectEnd, setProjectEnd] = useState([])
    const [projectEnd2, setProjectEnd2] = useState([])
    const [projectEnd3, setProjectEnd3] = useState([])
    const [projectEnd4, setProjectEnd4] = useState([])
    const [projectEnd5, setProjectEnd5] = useState([])
    const [projectEnd6, setProjectEnd6] = useState([])
    const [projectEnd7, setProjectEnd7] = useState([])

    const [projectStatus, setProjectStatus] = useState([])
    const [projectStatus2, setProjectStatus2] = useState([])
    const [projectStatus3, setProjectStatus3] = useState([])
    const [projectStatus4, setProjectStatus4] = useState([])
    const [projectStatus5, setProjectStatus5] = useState([])
    const [projectStatus6, setProjectStatus6] = useState([])
    const [projectStatus7, setProjectStatus7] = useState([])

    const [projectColor, setProjectColor] = useState([])
    const [projectColor2, setProjectColor2] = useState([])
    const [projectColor3, setProjectColor3] = useState([])
    const [projectColor4, setProjectColor4] = useState([])
    const [projectColor5, setProjectColor5] = useState([])
    const [projectColor6, setProjectColor6] = useState([])
    const [projectColor7, setProjectColor7] = useState([])

    const [projectTime, setProjectTime] = useState([])
    const [projectTime2, setProjectTime2] = useState([])
    const [projectTime3, setProjectTime3] = useState([])
    const [projectTime4, setProjectTime4] = useState([])
    const [projectTime5, setProjectTime5] = useState([])
    const [projectTime6, setProjectTime6] = useState([])
    const [projectTime7, setProjectTime7] = useState([])

    const [projectSpecifika, setProjectSpecifika] = useState([])
    const [projectSpecifika2, setProjectSpecifika2] = useState([])
    const [projectSpecifika3, setProjectSpecifika3] = useState([])
    const [projectSpecifika4, setProjectSpecifika4] = useState([])
    const [projectSpecifika5, setProjectSpecifika5] = useState([])
    const [projectSpecifika6, setProjectSpecifika6] = useState([])
    const [projectSpecifika7, setProjectSpecifika7] = useState([])

    const [projectComment, setProjectComment] = useState([])
    const [projectComment2, setProjectComment2] = useState([])
    const [projectComment3, setProjectComment3] = useState([])
    const [projectComment4, setProjectComment4] = useState([])
    const [projectComment5, setProjectComment5] = useState([])
    const [projectComment6, setProjectComment6] = useState([])
    const [projectComment7, setProjectComment7] = useState([])

    const [projectCity, setProjectCity] = useState([])
    const [projectCity2, setProjectCity2] = useState([])
    const [projectCity3, setProjectCity3] = useState([])
    const [projectCity4, setProjectCity4] = useState([])
    const [projectCity5, setProjectCity5] = useState([])
    const [projectCity6, setProjectCity6] = useState([])
    const [projectCity7, setProjectCity7] = useState([])

    const [projectTehText, setProjectTehText] = useState([])
    const [projectTehText2, setProjectTehText2] = useState([])
    const [projectTehText3, setProjectTehText3] = useState([])
    const [projectTehText4, setProjectTehText4] = useState([])
    const [projectTehText5, setProjectTehText5] = useState([])
    const [projectTehText6, setProjectTehText6] = useState([])
    const [projectTehText7, setProjectTehText7] = useState([])

    const [projectCompanyId, setProjectCompanyId] = useState([])
    const [projectCompanyId2, setProjectCompanyId2] = useState([])
    const [projectCompanyId3, setProjectCompanyId3] = useState([])
    const [projectCompanyId4, setProjectCompanyId4] = useState([])
    const [projectCompanyId5, setProjectCompanyId5] = useState([])
    const [projectCompanyId6, setProjectCompanyId6] = useState([])
    const [projectCompanyId7, setProjectCompanyId7] = useState([])

    const [projectId, setProjectId] = useState([])
    const [projectId2, setProjectId2] = useState([])
    const [projectId3, setProjectId3] = useState([])
    const [projectId4, setProjectId4] = useState([])
    const [projectId5, setProjectId5] = useState([])
    const [projectId6, setProjectId6] = useState([])
    const [projectId7, setProjectId7] = useState([])

    const ref = useRef(null)

    useEffect(() => {
        console.log("projects: ", projects)

        let arr = [] 
        let arr2 = []
        let arr3 = []
        let arr4 = []
        let arr5 = []
        let arr6 = []
        let arr7 = []

        let nameProj = [] 
        let nameProj2 = []
        let nameProj3 = []
        let nameProj4 = []
        let nameProj5 = []
        let nameProj6 = []
        let nameProj7 = []

        let statusProj = [] 
        let statusProj2 = []
        let statusProj3 = []
        let statusProj4 = []
        let statusProj5 = []
        let statusProj6 = []
        let statusProj7 = []

        let colorProj = [] 
        let colorProj2 = []
        let colorProj3 = []
        let colorProj4 = []
        let colorProj5 = []
        let colorProj6 = []
        let colorProj7 = []

        let timeProj = [] 
        let timeProj2 = []
        let timeProj3 = []
        let timeProj4 = []
        let timeProj5 = []
        let timeProj6 = []
        let timeProj7 = []

        let cityProj = [] 
        let cityProj2 = []
        let cityProj3 = []
        let cityProj4 = []
        let cityProj5 = []
        let cityProj6 = []
        let cityProj7 = []

        let commentProj = [] 
        let commentProj2 = []
        let commentProj3 = []
        let commentProj4 = []
        let commentProj5 = []
        let commentProj6 = []
        let commentProj7 = []

        let tehProj = [] 
        let tehProj2 = []
        let tehProj3 = []
        let tehProj4 = []
        let tehProj5 = []
        let tehProj6 = []
        let tehProj7 = []

        let specifProj = [] 
        let specifProj2 = []
        let specifProj3 = []
        let specifProj4 = []
        let specifProj5 = []
        let specifProj6 = []
        let specifProj7 = []

        let endProj = [] 
        let endProj2 = []
        let endProj3 = []
        let endProj4 = []
        let endProj5 = []
        let endProj6 = []
        let endProj7 = []

        let idProj = [] 
        let idProj2 = []
        let idProj3 = []
        let idProj4 = []
        let idProj5 = []
        let idProj6 = []
        let idProj7 = []

        Array(days[month] + (startDay - 1)).fill(null).map((_, index) => {
            const d = index - (startDay - 2);
                
            projects.map((item, ind)=> {
                if (item?.dateEnd) {
                    if (new Date(item?.dateStart.split('T')[0]).toISOString() === new Date(item?.dateEnd?.split('T')[0]).toISOString() || 
                        new Date(item?.dateStart.split('T')[0]).getTime() > new Date(item?.dateEnd?.split('T')[0]).getTime()) {
                        // console.log("d==: ", ind,
                        //     new Date(item?.dateStart.split('T')[0]).toISOString(),
                        //     new Date(item?.dateEnd.split('T')[0]).toISOString(), //.setHours(new Date(item?.dateStart).getHours()))
                        // ) 
                        if ((new Date(new Date(2024, month, d).setHours(new Date(2024, month, d).getHours()+3)).toISOString() === new Date(item?.dateStart.split('T')[0]).toISOString()) ) {
                            // console.log("d: ", ind,
                            //     new Date(new Date(2024, month, d).setHours(new Date(2024, month, d).getHours()+3)).toISOString(),
                            //     new Date(item?.dateEnd.split('T')[0]).toISOString() //.setHours(new Date(item?.dateStart).getHours()))
                            // )  

                            if (!nameProj[index]) {
                            arr[index] = true 
                            nameProj[index] = item.name
                            setProjectName(nameProj)

                            endProj[index] = item.dateEnd 
                            setProjectEnd(endProj)

                            statusProj[index] = item.status 
                            setProjectStatus(statusProj)

                            colorProj[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor(colorProj)

                            //console.log("timeProj: ", item)
                            timeProj[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime(timeProj)


                            cityProj[index] = item.city 
                            setProjectCity(cityProj)

                            commentProj[index] = item.comment
                            setProjectComment(commentProj)

                            specifProj[index] = item.specifika
                            setProjectSpecifika(specifProj)

                            idProj[index] = item.id
                            setProjectId(idProj)
                            } 
                            else if (!nameProj2[index]) {
                                arr2[index] = true 
                                nameProj2[index] = item.name
                                setProjectName2(nameProj2)

                                endProj2[index] = item.dateEnd 
                                setProjectEnd2(endProj2)

                                statusProj2[index] = item.status 
                                setProjectStatus2(statusProj2)

                                colorProj2[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor2(colorProj2)

                                timeProj2[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime2(timeProj2)

                                cityProj2[index] = item.city 
                                setProjectCity2(cityProj2)

                                commentProj2[index] = item.comment
                                setProjectComment2(commentProj2)

                                specifProj2[index] = item.specifika
                                setProjectSpecifika2(specifProj2)

                                idProj2[index] = item.id
                                setProjectId2(idProj2)
                            } 
                            else if (!nameProj3[index]) {
                                arr3[index] = true 
                                nameProj3[index] = item.name
                                setProjectName3(nameProj3)

                                endProj3[index] = item.dateEnd 
                                setProjectEnd3(endProj3)

                                statusProj3[index] = item.status 
                                setProjectStatus3(statusProj3)

                                colorProj3[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor3(colorProj3)

                                timeProj3[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime3(timeProj3)

                                cityProj3[index] = item.city 
                                setProjectCity3(cityProj3)

                                commentProj3[index] = item.comment
                                setProjectComment3(commentProj3)

                                specifProj3[index] = item.specifika
                                setProjectSpecifika3(specifProj3)

                                idProj3[index] = item.id
                                setProjectId3(idProj3)
                            } 
                            else if (!nameProj4[index]) { 
                                arr4[index] = true 
                                nameProj4[index] = item.name
                                setProjectName4(nameProj4)

                                endProj4[index] = item.dateEnd 
                                setProjectEnd4(endProj4)

                                statusProj4[index] = item.status 
                                setProjectStatus4(statusProj4)

                                colorProj4[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor4(colorProj4)

                                timeProj4[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime4(timeProj4)

                                cityProj4[index] = item.city 
                                setProjectCity4(cityProj4)

                                commentProj4[index] = item.comment
                                setProjectComment4(commentProj4)

                                specifProj4[index] = item.specifika
                                setProjectSpecifika4(specifProj4)

                                idProj4[index] = item.id
                                setProjectId4(idProj4)
                            } 
                            else if (!nameProj5[index]) {
                                arr5[index] = true 
                                nameProj5[index] = item.name
                                setProjectName5(nameProj5)

                                endProj5[index] = item.dateEnd 
                                setProjectEnd5(endProj5)

                                statusProj5[index] = item.status 
                                setProjectStatus5(statusProj5)

                                colorProj5[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor5(colorProj5)

                                timeProj5[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime5(timeProj5)

                                cityProj5[index] = item.city 
                                setProjectCity5(cityProj5)

                                commentProj5[index] = item.comment
                                setProjectComment5(commentProj5)

                                specifProj5[index] = item.specifika
                                setProjectSpecifika5(specifProj5)

                                idProj5[index] = item.id
                                setProjectId5(idProj5)
                            }  
                            else if (!nameProj6[index]) {
                                arr6[index] = true 
                                nameProj6[index] = item.name
                                setProjectName6(nameProj6)

                                endProj6[index] = item.dateEnd 
                                setProjectEnd6(endProj6)

                                statusProj6[index] = item.status 
                                setProjectStatus6(statusProj6)

                                colorProj6[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor6(colorProj6)

                                timeProj6[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime6(timeProj6)

                                cityProj6[index] = item.city 
                                setProjectCity6(cityProj6)

                                commentProj6[index] = item.comment
                                setProjectComment6(commentProj6)

                                specifProj6[index] = item.specifika
                                setProjectSpecifika6(specifProj6)

                                idProj6[index] = item.id
                                setProjectId6(idProj6)
                            } 
                            else if (!nameProj7[index]) {
                                arr7[index] = true 
                                nameProj7[index] = item.name
                                setProjectName7(nameProj7)

                                endProj7[index] = item.dateEnd 
                                setProjectEnd7(endProj7)

                                statusProj7[index] = item.status 
                                setProjectStatus7(statusProj7)

                                colorProj7[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor7(colorProj7)

                                timeProj7[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime7(timeProj7)

                                cityProj7[index] = item.city 
                                setProjectCity7(cityProj7)

                                commentProj7[index] = item.comment
                                setProjectComment7(commentProj7)

                                specifProj7[index] = item.specifika
                                setProjectSpecifika7(specifProj7)

                                idProj7[index] = item.id
                                setProjectId7(idProj7)
                            }                 
                        }

                    } else {
                        if ((new Date(new Date(2024, month, d).setHours(new Date(2024, month, d).getHours()+3)).getTime() >= new Date(item?.dateStart.split('T')[0]).getTime()) && 
                            (new Date(new Date(2024, month, d).setHours(new Date(2024, month, d).getHours()+3)).getTime() <= new Date(item?.dateEnd?.split('T')[0]).getTime()) ) {

                            if (!nameProj[index]) {
                            arr[index] = true 
                            nameProj[index] = item.name
                            setProjectName(nameProj)

                            endProj[index] = item.dateEnd 
                            setProjectEnd(endProj)

                            statusProj[index] = item.status 
                            setProjectStatus(statusProj)

                            colorProj[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor(colorProj)

                            //console.log("timeProj: ", item)
                            timeProj[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime(timeProj)


                            cityProj[index] = item.city 
                            setProjectCity(cityProj)

                            commentProj[index] = item.comment
                            setProjectComment(commentProj)

                            specifProj[index] = item.specifika
                            setProjectSpecifika(specifProj)

                            idProj[index] = item.id
                            setProjectId(idProj)
                            } 
                            else if (!nameProj2[index]) {
                                arr2[index] = true 
                                nameProj2[index] = item.name
                                setProjectName2(nameProj2)

                                endProj2[index] = item.dateEnd 
                                setProjectEnd2(endProj2)

                                statusProj2[index] = item.status 
                                setProjectStatus2(statusProj2)

                                colorProj2[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor2(colorProj2)

                                timeProj2[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime2(timeProj2)

                                cityProj2[index] = item.city 
                                setProjectCity2(cityProj2)

                                commentProj2[index] = item.comment
                                setProjectComment2(commentProj2)

                                specifProj2[index] = item.specifika
                                setProjectSpecifika2(specifProj2)

                                idProj2[index] = item.id
                                setProjectId2(idProj2)
                            } 
                            else if (!nameProj3[index]) {
                                arr3[index] = true 
                                nameProj3[index] = item.name
                                setProjectName3(nameProj3)

                                endProj3[index] = item.dateEnd 
                                setProjectEnd3(endProj3)

                                statusProj3[index] = item.status 
                                setProjectStatus3(statusProj3)

                                colorProj3[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor3(colorProj3)

                                timeProj3[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime3(timeProj3)

                                cityProj3[index] = item.city 
                                setProjectCity3(cityProj3)

                                commentProj3[index] = item.comment
                                setProjectComment3(commentProj3)

                                specifProj3[index] = item.specifika
                                setProjectSpecifika3(specifProj3)

                                idProj3[index] = item.id
                                setProjectId3(idProj3)
                            } 
                            else if (!nameProj4[index]) { 
                                arr4[index] = true 
                                nameProj4[index] = item.name
                                setProjectName4(nameProj4)

                                endProj4[index] = item.dateEnd 
                                setProjectEnd4(endProj4)

                                statusProj4[index] = item.status 
                                setProjectStatus4(statusProj4)

                                colorProj4[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor4(colorProj4)

                                timeProj4[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime4(timeProj4)

                                cityProj4[index] = item.city 
                                setProjectCity4(cityProj4)

                                commentProj4[index] = item.comment
                                setProjectComment4(commentProj4)

                                specifProj4[index] = item.specifika
                                setProjectSpecifika4(specifProj4)

                                idProj4[index] = item.id
                                setProjectId4(idProj4)
                            } 
                            else if (!nameProj5[index]) {
                                arr5[index] = true 
                                nameProj5[index] = item.name
                                setProjectName5(nameProj5)

                                endProj5[index] = item.dateEnd 
                                setProjectEnd5(endProj5)

                                statusProj5[index] = item.status 
                                setProjectStatus5(statusProj5)

                                colorProj5[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor5(colorProj5)

                                timeProj5[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime5(timeProj5)

                                cityProj5[index] = item.city 
                                setProjectCity5(cityProj5)

                                commentProj5[index] = item.comment
                                setProjectComment5(commentProj5)

                                specifProj5[index] = item.specifika
                                setProjectSpecifika5(specifProj5)

                                idProj5[index] = item.id
                                setProjectId5(idProj5)
                            }  
                            else if (!nameProj6[index]) {
                                arr6[index] = true 
                                nameProj6[index] = item.name
                                setProjectName6(nameProj6)

                                endProj6[index] = item.dateEnd 
                                setProjectEnd6(endProj6)

                                statusProj6[index] = item.status 
                                setProjectStatus6(statusProj6)

                                colorProj6[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor6(colorProj6)

                                timeProj6[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime6(timeProj6)

                                cityProj6[index] = item.city 
                                setProjectCity6(cityProj6)

                                commentProj6[index] = item.comment
                                setProjectComment6(commentProj6)

                                specifProj6[index] = item.specifika
                                setProjectSpecifika6(specifProj6)

                                idProj6[index] = item.id
                                setProjectId6(idProj6)
                            } 
                            else if (!nameProj7[index]) {
                                arr7[index] = true 
                                nameProj7[index] = item.name
                                setProjectName7(nameProj7)

                                endProj7[index] = item.dateEnd 
                                setProjectEnd7(endProj7)

                                statusProj7[index] = item.status 
                                setProjectStatus7(statusProj7)

                                colorProj7[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                                setProjectColor7(colorProj7)

                                timeProj7[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                                setProjectTime7(timeProj7)

                                cityProj7[index] = item.city 
                                setProjectCity7(cityProj7)

                                commentProj7[index] = item.comment
                                setProjectComment7(commentProj7)

                                specifProj7[index] = item.specifika
                                setProjectSpecifika7(specifProj7)

                                idProj7[index] = item.id
                                setProjectId7(idProj7)
                            }                 
                        }
                    } 
                } else {
                    if ((new Date(new Date(2024, month, d).setHours(new Date(2024, month, d).getHours()+3)).toISOString() === new Date(item?.dateStart.split('T')[0]).toISOString()) ) {
                        if (!nameProj[index]) {
                            arr[index] = true 
                            nameProj[index] = item.name
                            setProjectName(nameProj)

                            endProj[index] = item.dateEnd 
                            setProjectEnd(endProj)

                            statusProj[index] = item.status 
                            setProjectStatus(statusProj)

                            colorProj[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor(colorProj)

                            //console.log("timeProj: ", item)
                            timeProj[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime(timeProj)


                            cityProj[index] = item.city 
                            setProjectCity(cityProj)

                            commentProj[index] = item.comment
                            setProjectComment(commentProj)

                            specifProj[index] = item.specifika
                            setProjectSpecifika(specifProj)

                            idProj[index] = item.id
                            setProjectId(idProj)
                        } 
                        else if (!nameProj2[index]) {
                            arr2[index] = true 
                            nameProj2[index] = item.name
                            setProjectName2(nameProj2)

                            endProj2[index] = item.dateEnd 
                            setProjectEnd2(endProj2)

                            statusProj2[index] = item.status 
                            setProjectStatus2(statusProj2)

                            colorProj2[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor2(colorProj2)

                            timeProj2[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime2(timeProj2)

                            cityProj2[index] = item.city 
                            setProjectCity2(cityProj2)

                            commentProj2[index] = item.comment
                            setProjectComment2(commentProj2)

                            specifProj2[index] = item.specifika
                            setProjectSpecifika2(specifProj2)

                            idProj2[index] = item.id
                            setProjectId2(idProj2)
                        } 
                        else if (!nameProj3[index]) {
                            arr3[index] = true 
                            nameProj3[index] = item.name
                            setProjectName3(nameProj3)

                            endProj3[index] = item.dateEnd 
                            setProjectEnd3(endProj3)

                            statusProj3[index] = item.status 
                            setProjectStatus3(statusProj3)

                            colorProj3[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor3(colorProj3)

                            timeProj3[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime3(timeProj3)

                            cityProj3[index] = item.city 
                            setProjectCity3(cityProj3)

                            commentProj3[index] = item.comment
                            setProjectComment3(commentProj3)

                            specifProj3[index] = item.specifika
                            setProjectSpecifika3(specifProj3)

                            idProj3[index] = item.id
                            setProjectId3(idProj3)
                        } 
                        else if (!nameProj4[index]) { 
                            arr4[index] = true 
                            nameProj4[index] = item.name
                            setProjectName4(nameProj4)

                            endProj4[index] = item.dateEnd 
                            setProjectEnd4(endProj4)

                            statusProj4[index] = item.status 
                            setProjectStatus4(statusProj4)

                            colorProj4[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor4(colorProj4)

                            timeProj4[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime4(timeProj4)

                            cityProj4[index] = item.city 
                            setProjectCity4(cityProj4)

                            commentProj4[index] = item.comment
                            setProjectComment4(commentProj4)

                            specifProj4[index] = item.specifika
                            setProjectSpecifika4(specifProj4)

                            idProj4[index] = item.id
                            setProjectId4(idProj4)
                        } 
                        else if (!nameProj5[index]) {
                            arr5[index] = true 
                            nameProj5[index] = item.name
                            setProjectName5(nameProj5)

                            endProj5[index] = item.dateEnd 
                            setProjectEnd5(endProj5)

                            statusProj5[index] = item.status 
                            setProjectStatus5(statusProj5)

                            colorProj5[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor5(colorProj5)

                            timeProj5[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime5(timeProj5)

                            cityProj5[index] = item.city 
                            setProjectCity5(cityProj5)

                            commentProj5[index] = item.comment
                            setProjectComment5(commentProj5)

                            specifProj5[index] = item.specifika
                            setProjectSpecifika5(specifProj5)

                            idProj5[index] = item.id
                            setProjectId5(idProj5)
                        }  
                        else if (!nameProj6[index]) {
                            arr6[index] = true 
                            nameProj6[index] = item.name
                            setProjectName6(nameProj6)

                            endProj6[index] = item.dateEnd 
                            setProjectEnd6(endProj6)

                            statusProj6[index] = item.status 
                            setProjectStatus6(statusProj6)

                            colorProj6[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor6(colorProj6)

                            timeProj6[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime6(timeProj6)

                            cityProj6[index] = item.city 
                            setProjectCity6(cityProj6)

                            commentProj6[index] = item.comment
                            setProjectComment6(commentProj6)

                            specifProj6[index] = item.specifika
                            setProjectSpecifika6(specifProj6)

                            idProj6[index] = item.id
                            setProjectId6(idProj6)
                        } 
                        else if (!nameProj7[index]) {
                            arr7[index] = true 
                            nameProj7[index] = item.name
                            setProjectName7(nameProj7)

                            endProj7[index] = item.dateEnd 
                            setProjectEnd7(endProj7)

                            statusProj7[index] = item.status 
                            setProjectStatus7(statusProj7)

                            colorProj7[index] = statusData.find((stat)=> stat.label === item.status)?.color 
                            setProjectColor7(colorProj7)

                            timeProj7[index] = item.dateStart.split('T')[1]?.slice(0, 5) 
                            setProjectTime7(timeProj7)

                            cityProj7[index] = item.city 
                            setProjectCity7(cityProj7)

                            commentProj7[index] = item.comment
                            setProjectComment7(commentProj7)

                            specifProj7[index] = item.specifika
                            setProjectSpecifika7(specifProj7)

                            idProj7[index] = item.id
                            setProjectId7(idProj7)
                        }                 
                    }
                }
                           
            })
            

            setProject(arr)     
            setProject2(arr2) 
            setProject3(arr3) 
            setProject4(arr4) 
            setProject5(arr5) 
            setProject6(arr6) 
            setProject7(arr7) 
        })

    }, [projects, month])




    // Создание проекта
    const addNewProject = async(item, number, day) => {
        console.log("day: ", day)

        day.setHours(day.getHours() + 3); //00:00

        const projectTitle = 'Название проекта'
        const projectStatus = 'Новый'
        const projectColor = '#1E90FF'

        const data = {
            name: projectTitle, 
            status: projectStatus,
            specifika: '',
            city: '',
            datestart: day, 
            dateend: null, //new Date(endDay.setDate(endDay.getDate() + 1)).toISOString(), 
            teh: '', 
            managerId: '', 
            companyId: '', 
            chatId: '1775583141', 
            spec: '', 
            geo: '',
            index: 1,
            number: number,
        }

        //добавить проект в базу данных
        const res = await addProject(data)

        console.log("res: ", res)

        //setProjectName(projectTitle)

        if (number === 1) {
            let arr = [...project]
            arr[item] = true
            setProject(arr)

            let nameProj = [...projectName]
            nameProj[item] = projectTitle
            setProjectName(nameProj)

            let statusProj = [...projectStatus]
            statusProj[item] = projectStatus
            setProjectStatus(statusProj)

            let colorProj = [...projectColor]
            colorProj[item] = projectColor
            setProjectColor(colorProj)

            let idProj = [...projectId]
            idProj[item] = res?.id
            setProjectId(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd]
            // endProj[item] =  endDay //new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd(arr2)
        } 
        if (number === 2) {
            let arr = [...project2]
            arr[item] = true
            setProject2(arr)

            let nameProj = [...projectName2]
            nameProj[item] = projectTitle
            setProjectName2(nameProj)

            let statusProj2 = [...projectStatus2]
            statusProj2[item] = projectStatus
            setProjectStatus2(statusProj2)

            let colorProj2 = [...projectColor2]
            colorProj2[item] = projectColor
            setProjectColor2(colorProj2)

            let idProj = [...projectId2]
            idProj[item] = res?.id
            setProjectId2(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd2]
            // endProj[item] =  endDay //new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd2(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime2(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd2(arr2)
        } 
        if (number === 3) {
            let arr = [...project3]
            arr[item] = true
            setProject3(arr)

            let nameProj = [...projectName3]
            nameProj[item] = projectTitle
            setProjectName3(nameProj)

            let statusProj3 = [...projectStatus3]
            statusProj3[item] = projectStatus
            setProjectStatus3(statusProj3)

            let colorProj3 = [...projectColor3]
            colorProj3[item] = projectColor
            setProjectColor3(colorProj3)

            let idProj = [...projectId3]
            idProj[item] = res?.id
            setProjectId3(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd3]
            // endProj[item] = endDay // new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd3(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime3(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd3(arr2)
        } 
        if (number === 4) {
            let arr = [...project4]
            arr[item] = true
            setProject4(arr)

            let nameProj = [...projectName4]
            nameProj[item] = projectTitle
            setProjectName4(nameProj)

            let statusProj4 = [...projectStatus4]
            statusProj4[item] = projectStatus
            setProjectStatus4(statusProj4)

            let colorProj4 = [...projectColor4]
            colorProj4[item] = projectColor
            setProjectColor4(colorProj4)

            let idProj = [...projectId4]
            idProj[item] = res?.id
            setProjectId4(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd4]
            // endProj[item] = endDay // new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd4(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime4(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd4(arr2)
        }
        if (number === 5) {
            let arr = [...project5]
            arr[item] = true
            setProject5(arr)

            let nameProj = [...projectName5]
            nameProj[item] = projectTitle
            setProjectName5(nameProj)

            let statusProj5 = [...projectStatus5]
            statusProj5[item] = projectStatus
            setProjectStatus5(statusProj5)

            let colorProj5 = [...projectColor5]
            colorProj5[item] = projectColor
            setProjectColor5(colorProj5)

            let idProj = [...projectId5]
            idProj[item] = res?.id
            setProjectId5(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd5]
            // endProj[item] = endDay // new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd5(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime5(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd5(arr2)
        } 
        if (number === 6) {
            let arr = [...project6]
            arr[item] = true
            setProject6(arr)

            let nameProj = [...projectName6]
            nameProj[item] = projectTitle
            setProjectName6(nameProj)

            let statusProj6 = [...projectStatus6]
            statusProj6[item] = projectStatus
            setProjectStatus6(statusProj6)

            let colorProj6 = [...projectColor6]
            colorProj6[item] = projectColor
            setProjectColor6(colorProj6)

            let idProj = [...projectId6]
            idProj[item] = res?.id
            setProjectId6(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd6]
            // endProj[item] = endDay // new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd6(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime6(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd6(arr2)
        } 
        if (number === 7) {
            let arr = [...project7]
            arr[item] = true
            setProject7(arr)

            let nameProj = [...projectName7]
            nameProj[item] = projectTitle
            setProjectName7(nameProj)

            let statusProj7 = [...projectStatus7]
            statusProj7[item] = projectStatus
            setProjectStatus7(statusProj7)

            let colorProj7 = [...projectColor7]
            colorProj7[item] = projectColor
            setProjectColor7(colorProj7)

            let idProj = [...projectId7]
            idProj[item] = res?.id
            setProjectId7(idProj)

            // let endDay = new Date(day.getTime());
            // let endProj = [...projectEnd7]
            // endProj[item] = endDay // new Date(endDay.setDate(endDay.getDate() + 1)).toISOString() 
            // setProjectEnd7(endProj)

            let timeProj = []
            timeProj[item] = "00:00" 
            setProjectTime7(timeProj)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd7(arr2)
        }


        setTimeout(()=> {
            setProjects((projects) => {	
                const usersCopy = JSON.parse(JSON.stringify(projects));
                usersCopy.push(res)

                return usersCopy;
            });
        }, 10000)
        
        
    }


    useEffect(() => {
        //console.log(ref.current.clientHeight)
        setHeight(ref.current.clientHeight + 74)
        
    })

    useEffect(() => {
        //console.log(today)
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getUTCDay();
        
        let arr = []
        for (let day = 0; day < 35; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
    
        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === date.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
    
        arr.push(calendarDay);
        setCurrentDays(arr)
        //console.log(currentDays)
        }
    }, [date]);

    function getStartDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

    const overDay = (index, td) => {
        let arr = []
        arr[index] = true

        if (td === 1) {
            if (!project[index]) {
                setShowButtonAdd(arr)
            }           
        } else if (td === 2) {
            if (!project2[index]) {
                setShowButtonAdd2(arr)
            } 
        } else if (td === 3) {
            if (!project3[index]) {
                setShowButtonAdd3(arr)
            } 
        } else if (td === 4) {
            if (!project4[index]) {
                setShowButtonAdd4(arr)
            } 
        } else if (td === 5) {
            if (!project5[index]) {
                setShowButtonAdd5(arr)
            }  
        } else if (td === 6) {
            if (!project6[index]) {
                setShowButtonAdd6(arr)
            }  
        } else if (td === 7) {
            if (!project7[index]) {
                setShowButtonAdd7(arr)
            }  
        }
    }

    const outDay = (index, td) => {
        let arr = []
        arr[index] = false
        if (td === 1) {           
            setShowButtonAdd(arr)
        } else if (td === 2) {
            setShowButtonAdd2(arr) 
        } else if (td === 3) {
            setShowButtonAdd3(arr) 
        } else if (td === 4) {
            setShowButtonAdd4(arr) 
        } else if (td === 5) {
            setShowButtonAdd5(arr) 
        } else if (td === 6) {
            setShowButtonAdd6(arr) 
        } else if (td === 7) {
            setShowButtonAdd7(arr) 
        }
        
    }

    const nextMonth = () => {
        setDate(new Date(year, month + 1, day))
        //setMonth(month + 1)
    }

    const prevMonth = () => {
        setDate(new Date(year, month - 1, day))
    }


    const changeMonth = (selectedOption) => {
        //console.log(manthList.findIndex(el => el.value === selectedOption.value)); 
        let index = manthList.findIndex(el => el.value === selectedOption.value)
        setDate(new Date(year, index, day))
    }
    
  return (
    <div className='frame2' ref={ref} style={{overflow: 'scroll', height: '640px'}}>
        <div className='calendar-header'>
            <CButton onClick={prevMonth} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-14px', left: '11px'}}>
                -</span>
              </CButton>
            <Select
                className="uley_react_select"
                options={manthList}
                //defaultValue={manthList[month]}
                value={manthList[month]}
                onChange={changeMonth}
                classNamePrefix="custom-select_3"
            />
            <CButton onClick={nextMonth} className='uley_add_user uley_select_reset' style={{marginLeft: '0px', padding: '18px'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-13px', left: '6px'}}>
                +</span>
            </CButton>
        </div>
        <table className='frame2'>
            <tr style={{position: 'sticky', top: '0px', backgroundColor: '#131c21', zIndex: '100'}}>
                <th className='table-header'>1</th>
                <th className='table-header'>2</th>
                <th className='table-header'>3</th>
                <th className='table-header'>4</th>
                <th className='table-header'>5</th>
                <th className='table-header'>6</th>
                <th className='table-header'>7</th>
            </tr>
            {Array(days[month] + (startDay - 1)).fill(null).map((_, index) => {
                const d = index - (startDay - 2);
                const isWeekend = new Date(2024, month, d) 
                //console.log("index: ", index, startDay, d)

                if (d > 0) {
                    return (
                        <><tr key={index}>
                            <td className='day2' onMouseOver={()=>overDay(index, 1)} onMouseOut={()=>outDay(index, 1)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 1, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 1, projectId[index], projectName[index], projectEnd[index], projectStatus[index], projectTime[index], projectSpecifika[index])} 
                                        style={{border: `1px solid ${projectColor[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName[index] && projectName[index].length > 15 ? projectName[index].substr(0, 15) + '...' : projectName[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor[index]}`}}>{projectStatus[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor[index]}`}}>{projectTime[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 2)} onMouseOut={()=>outDay(index, 2)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 2, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd2[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project2[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor2[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 2, projectId2[index], projectName2[index], projectEnd2[index], projectStatus2[index], projectTime2[index], projectSpecifika2[index])} 
                                        style={{border: `1px solid ${projectColor2[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName2[index] && projectName2[index].length > 15 ? projectName2[index].substr(0, 15) + '...' : projectName2[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor2[index]}`}}>{projectStatus2[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor2[index]}`}}>{projectTime2[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 3)} onMouseOut={()=>outDay(index, 3)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 3, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd3[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project3[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor3[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 3, projectId3[index], projectName3[index], projectEnd3[index], projectStatus3[index], projectTime3[index], projectSpecifika3[index])} 
                                        style={{border: `1px solid ${projectColor3[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName3[index] && projectName3[index].length > 15 ? projectName3[index].substr(0, 15) + '...' : projectName3[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor3[index]}`}}>{projectStatus3[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor3[index]}`}}>{projectTime3[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 4)} onMouseOut={()=>outDay(index, 4)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 4, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd4[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project4[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor4[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 4, projectId4[index], projectName4[index], projectEnd4[index], projectStatus4[index], projectTime4[index], projectSpecifika4[index])} 
                                        style={{border: `1px solid ${projectColor4[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName4[index] && projectName4[index].length > 15 ? projectName4[index].substr(0, 15) + '...' : projectName4[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor4[index]}`}}>{projectStatus4[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor4[index]}`}}>{projectTime4[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 5)} onMouseOut={()=>outDay(index, 5)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 5, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd5[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project5[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor5[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 5, projectId5[index], projectName5[index], projectEnd5[index], projectStatus5[index], projectTime5[index], projectSpecifika5[index])} 
                                        style={{border: `1px solid ${projectColor5[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName5[index] && projectName5[index].length > 15 ? projectName5[index].substr(0, 15) + '...' : projectName5[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor5[index]}`}}>{projectStatus5[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor5[index]}`}}>{projectTime5[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 6)} onMouseOut={()=>outDay(index, 6)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 6, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd6[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project6[index] ?
                                    <><p className='date-proj-day2' style={{color: `${projectColor6[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 6, projectId6[index], projectName6[index], projectEnd6[index], projectStatus6[index], projectTime6[index], projectSpecifika6[index])} 
                                        style={{border: `1px solid ${projectColor6[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName6[index] && projectName6[index].length > 15 ? projectName6[index].substr(0, 15) + '...' : projectName6[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor6[index]}`}}>{projectStatus6[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor6[index]}`}}>{projectTime6[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 7)} onMouseOut={()=>outDay(index, 7)} style={{backgroundColor: isWeekend.getDay() == 6 || isWeekend.getDay() == 0 ? '#11171a' : ''}}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 7, new Date(2024, month, d))} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd7[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project7[index] ? 
                                    <><p className='date-proj-day2' style={{color: `${projectColor7[index]}`}}>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' 
                                        onClick={()=>openProject(month, index, 7, projectId7[index], projectName7[index], projectEnd7[index], projectStatus7[index], projectTime7[index], projectSpecifika7[index])} 
                                        style={{border: `1px solid ${projectColor7[index]}`}}
                                    >
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName7[index] && projectName7[index].length > 15 ? projectName7[index].substr(0, 15) + '...' : projectName7[index]}</p>   
                                        <p className='viewStatus' style={{color: `${projectColor7[index]}`}}>{projectStatus7[index]}</p>

                                        <p className='time-project' style={{color: `${projectColor7[index]}`}}>{projectTime7[index]}</p>
                                    </div></>
                                    : <></>
                                }
                            </td>

                        </tr>
                        <tr style={{height: '20px'}}></tr>
                        </>
                    )
                }
            }) 
            }
            
        </table>
        <p onClick={()=>setShowSidebar(true)} style={{position: 'absolute', top: '50%', right: '2px'}}>^</p>
    </div>
  );
}