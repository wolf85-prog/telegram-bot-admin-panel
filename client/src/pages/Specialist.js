import React, { Suspense, useEffect, useState, useRef } from 'react'
import { AppSidebar, AppFooter, AppHeader, AppRightbar } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux'
import InputMask from 'react-input-mask';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCollapse,
  CButton, 
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CToast, 
  CToastBody,
  CToastClose,
  CToaster,

} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getSpecialist, getSpecCount, editSpecialist, addSpecialist } from './../http/specAPI'
import { getWContacts} from '../http/workerAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';

import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import block18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'

import { array } from 'prop-types';

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';

import specData from 'src/data/specData';
import specOnlyData from 'src/data/specOnlyData';
import comtegs from 'src/data/comtegs';
import skills from 'src/data/skills';
import merchData from 'src/data/merchData';
import companys from 'src/data/companys';
import cities from 'src/data/cities';

//Workers.js
const Specialist = () => {

  const { specialist, setSpecialist, specialistAll, setSpecialistAll, addNewSpecialist } = useUsersContext();
  //const { userWorkers: specusers } = useUsersContext();

  const [specialistCount, setSpecialistCount] = useState([]);
  const [filterAll, setFilterAll] = useState([]);

  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [spec, setSpec] = useState([]); 
  const [visibleSm, setVisibleSm] = useState(false)
  const [modalWorker, setModalWorker] = useState({})
  const [showProfile, setShowProfile] = useState(false)
  const [showSpec, setShowSpec] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [showMenuBlock18, setShowMenuBlock18] = useState(false)
  const [showBlock18, setShowBlock18] = useState(false)
  const [block18, setBlock18] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  
  const [showSave, setShowSave] = useState(false)
  const [showSave2, setShowSave2] = useState(false)
  const [showSave3, setShowSave3] = useState(false)

  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState([]);
  const [age, setAge] = useState('');
  const [age2, setAge2] = useState(0);
  const [speclist, setSpeclist] = useState([]);
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [skill, setSkill] = useState('');
  const [reyting, setReyting] = useState('');
  const [promo, setPromo] = useState('');
  const [rank, setRank] = useState('');
  const [merch, setMerch] = useState('');
  const [company, setCompany] = useState('');
  const [inn, setInn] = useState('');
  const [comteg, setComteg] = useState('');
  const [comteg2, setComteg2] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comment2, setComment2] = useState('');
  const [passport, setPassport] = useState('');
  const [dogovor, setDogovor] = useState('');
  const [samozanjatost, setSamozanjatost] = useState('');
  const [passportScan, setPassportScan] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно сохранены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )


  //поиск
  useEffect(() => {
		const filteredData = specialistAll.filter(user=> (user.fio + user.telegram + user.phone)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    setSpecialist(text === '' ? specialistCount : filteredData); 
    //console.log("specialist", specialist)
    setShowClear(text === '' ? false : true)
  }, [text]);


  useEffect(()=> {

    const fetchData = async() => {

      // 2 специалисты 20 чел.
      let workers = await getSpecCount(20, specialist.length)
      console.log("specialist: ", workers)

      let arrWorkers = []

      workers.map(async (worker, i) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_spec = ''
        worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
          str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        })

        let str_skill = ''
        worker.skill && JSON.parse(worker.skill).map((item, index)=> {
          str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        })

        let str_merch = ''
        worker.merch && JSON.parse(worker.merch).map((item, index)=> {
          str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
        })

        let str_komteg = ''
        worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        })

        let str_komteg2 = ''
        worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
          str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
        })

        let str_company = ''
        worker.company && JSON.parse(worker.company).map((item, index)=> {
          str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        })

        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })

        let str_comment2 = ''
        worker.comment2 && JSON.parse(worker.comment2).map((item, index)=> {
          str_comment2 = str_comment2 + item.content + (index+1 !== JSON.parse(worker.comment2).length ? ', ' : '')
        })

        const newWorker = {
          id: worker.id,
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          spec: str_spec,
          city: worker.city, 
          skill: str_skill,
          promo: worker.promoId === '0' ? '' : worker.promoId, 
          rank: worker.rank, 
          merch: str_merch,  
          company: str_company, 
          comteg: str_komteg, 
          comteg2: str_komteg2, 
          comment: str_comment, 
          comment2: str_comment2, 
          age: worker.age, 
          reyting: worker.reyting, 
          inn: worker.inn, 
          passport: worker.passport, 
          profile: worker.profile, 
          dogovor: worker.dogovor ? '🟢' : '🔴', 
          samozanjatost: worker.samozanjatost ? '🟢' : '🔴', 
          passportScan: worker.passportScan, 
          email: worker.email, 
        }
        arrWorkers.push(newWorker)

        //если элемент массива последний
				if (i === workers.length-1) {
          const sortedWorker = [...arrWorkers].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

					setSpecialistCount(sortedWorker)
          setSpecialist(sortedWorker)
					
					//сохранить кэш
					localStorage.setItem("specialist", JSON.stringify(sortedWorker));
				}

      })  

      setLoading(false)

      let wuserbots = await getWContacts();
      setUserbots(wuserbots)

      
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getImage = async () => {
        if (file) {
          //setShowUpload(true)
          console.log("file:", file)
          const data = new FormData();
          data.append("name", file.name);
          data.append("avatar", file);
          
          let response = await uploadAvatar(data) //distribFile(data) // uploadFile(data)
          console.log("response: ", response.data.path)

          setImage(response.data.path.split('.team')[1]);
          //сообщение с ссылкой на файл
          console.log("Путь к файлу: ", host + response.data.path.split('.team')[1])
          setProfile(host + response.data.path.split('.team')[1])
          //setValue(host + response.data.path)
          //setPoster(host + response.data.path.split('.team')[1])
        }
    }
    getImage();
  }, [file])
  
  const clickAdd = async()=> {
    const data = {
      fio: 'ФИО',
    }
    const res = await addSpecialist(data)

    console.log("res: ", res)
    //await addNewSpecialist(res.id, 'ФИО')
  }

  const clickFio = (worker)=> {
    console.log(worker)
    //setVisibleXL(true)
    setShowProfile(true)
    setModalWorker(worker)
    setShowSearch(false)
    setShowClear(false)

    const currentYear = new Date().getFullYear()

    setId(worker.id)
    setFio(worker.fio)
    setCity(worker.city ? worker.city.split(',') : [])
    setAge(worker.age ? worker.age.split('-')[0] : '')
    setAge2(worker.age ? parseInt(currentYear) - parseInt(worker.age ? worker.age.split('-')[0] : 0) : '')

    setSpeclist(worker.spec ? worker.spec.split(', ') : [])

    setPhone(worker.phone)
    setPhone2(worker.phone2)
    setTelegram(worker.telegram)
    setSkill(worker.skill ? worker.skill.split(', ') : [])

    setReyting(worker.reyting === null ? '' : worker.reyting)
    setPromo(worker.promo)
    setRank(worker.rank === null ? '' : worker.rank)
    setMerch(worker.merch ? worker.merch.split(',') : [])
    setCompany(worker.company ? worker.company.split(',') : [])
    setInn(worker.inn === null ? '' : worker.inn)
    setComteg(worker.comteg ? worker.comteg.split(',') : [])
    setComteg2(worker.comteg2 ? worker.comteg2.split(',') : [])
    setEmail(worker.email)
    setComment(worker.comment)
    setComment2(worker.comment2)
    setProfile(worker.profile)

    setPassport(worker.passport)
    setDogovor(worker.dogovor)
    setSamozanjatost(worker.samozanjatost)
    setPassportScan(worker.passportScan)
    setNik(userbots.find((user) => user.chatId === worker.telegram)?.username)
    setDateReg(userbots.find((user) => user.chatId === worker.telegram)?.createdAt)

    setBlock(worker.block)
    setBlock18(worker.block18)

    setShowKrest(worker.block)
    setShowBlock18(worker.block18)
    console.log("user", userbots.find((user) => user.chatId === worker.telegram))
  }

  const copyText = (text)=> {
    window.prompt("", text);
  }

  //сортировка по ФИО
  const onSortFio = () => {
    setCountPress(countPress + 1)
    
    if (countPress + 1 >= 3) {
      setCountPress(0)
    }
    console.log("check sort", countPress + 1)

    if (countPress + 1 === 1) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else if (countPress + 1 === 2) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })
      setSpecialist(sortedWorker)
    }
    
  }

  //сортировка по telegram
  const onSortTG = () => {
    setCountPressTG(countPressTG + 1)
    
    if (countPressTG + 1 >= 3) {
      setCountPressTG(0)
    }
    console.log("check sort", countPressTG + 1)

    if (countPressTG + 1 === 1) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var tgA = a.telegram, tgB = b.telegram 
        return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else if (countPressTG + 1 === 2) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var tgA = a.telegram, tgB = b.telegram 
        return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })

      //setSpecialistCount(sortedWorker)
      setSpecialist(sortedWorker)
    }
    
  }

  //сортировка по Городу
  const onSortCity = () => {
    setCountPressCity(countPressCity + 1)
    
    if (countPressCity + 1 >= 3) {
      setCountPressCity(0)
    }
    //console.log("check sort", countPressTG + 1)

    if (countPressCity + 1 === 1) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else if (countPressCity + 1 === 2) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по убыванию 
      })

      //setSpecialistCount(sortedWorker)
      setSpecialist(sortedWorker)
    }
    
  }

  //ЕЩЁ
  const clickNext = async() => {
    //1 все специалисты
		let response = await getSpecCount(20, specialist.length);
    //console.log("workers size: ", response)

    const arrayWorker = []
		
			response.reverse().map(async (worker) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_spec = ''
        worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
          str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        })

        let str_skill = ''
        worker.skill && JSON.parse(worker.skill).map((item, index)=> {
          str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        })

        let str_merch = ''
        worker.skill && JSON.parse(worker.merch).map((item, index)=> {
          str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
        })

        let str_komteg = ''
        worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        })

        let str_komteg2 = ''
        worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
          str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
        })

        let str_company = ''
        worker.company && JSON.parse(worker.company).map((item, index)=> {
          str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        })

        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })

        let str_comment2 = ''
        worker.comment2 && JSON.parse(worker.comment2).map((item, index)=> {
          str_comment2 = str_comment2 + item.content + (index+1 !== JSON.parse(worker.comment2).length ? ', ' : '')
        })
        

				const newWorker = {
          id: worker.id,
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          spec: str_spec,
          city: worker.city, 
          skill: str_skill,
          promo: worker.promoId === '0' ? '' : worker.promoId, 
          rank: worker.rank, 
          merch: str_merch,  
          company: str_company, 
          comteg: str_komteg, 
          comteg2: str_komteg, 
          comment: str_comment, 
          comment2: str_comment2, 
          age: worker.age, 
          reyting: worker.reyting, 
          inn: worker.inn, 
          passport: worker.passport, 
          profile: worker.profile, 
          dogovor: worker.dogovor ? '🟢' : '🔴', 
          samozanjatost: worker.samozanjatost ? '🟢' : '🔴', 
          passportScan: worker.passportScan, 
          email: worker.email, 
        }
		
				arrayWorker.push(newWorker)
			})    

      //console.log("Всего сейчас: ", arrayWorker.length)
			
      const sortedWorker = [...arrayWorker].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
      setSpecialistCount(sortedWorker)
  }

  const closeProfile = () => { 
    setShowProfile(false)
    setShowClose(false)
    setShowSearch(true)

    setShowClear(true)
    setFilePreview('')
  }

  //сохранить профиль
  const saveProfile = async(id) => { 
    setShowClose(true)
    console.log(id)

    let specArr = []
    let strSpec = ''
    speclist.map((item) => {
      specData.map((category)=> {
          category.models.map((work)=> {
              if (work.name === item){
                  const obj = {
                      spec: item,
                      cat: category.icon,
                  }
                  strSpec = strSpec + ', ' + item
                  specArr.push(obj)
              }
          })
      })
    })

    let skillArr = []
    let strSkill = ''
    skill.map((item)=> {
      const obj = {
        name: item,
      }
      strSkill = strSkill + ', ' + item
      skillArr.push(obj)
    })

    let companyArr = []
    let strCompany = ''
    company.map((item)=> {
      const obj = {
        name: item,
      }
      strCompany = strCompany + ', ' + item
      companyArr.push(obj)
    })

    let merchArr = []
    let strMerch = ''
    merch.map((item)=> {
      const obj = {
        name: item,
      }
      strMerch = strMerch + ', ' + item
      merchArr.push(obj)
    })

    let comtegArr = []
    let strComteg = ''
    comteg.map((item)=> {
      const obj = {
        name: item,
      }
      strComteg = strComteg + ', ' + item
      comtegArr.push(obj)
    })

    let comtegArr2 = []
    let strComteg2 = ''
    comteg2.map((item)=> {
      const obj = {
        name: item,
      }
      strComteg2 = strComteg2 + ', ' + item
      comtegArr2.push(obj)
    })

    //комментарии 1
    let commentArr = []
    let strComment = ''
    const obj1 = {
       content: comment,
    }
    strComment = comment
    commentArr.push(obj1)

    //комментарии 2
    let commentArr2 = []
    let strComment2 = ''
    const obj2 = {
       content: comment2,
    }
    strComment2 = comment2
    commentArr2.push(obj2)


    const saveData = {
      fio,
      phone,
      chatId: telegram,
      city: city[0],
      age: age+'-01-01',
      speclist: JSON.stringify(specArr),
      company: JSON.stringify(companyArr),
      skill: JSON.stringify(skillArr),
      merch: JSON.stringify(merchArr),
      comteg: JSON.stringify(comtegArr),
      comteg2: JSON.stringify(comtegArr2),
      comment: JSON.stringify(commentArr),
      comment2: JSON.stringify(commentArr2),
      profile,
      inn,
      email,
      promo,
      passport,
      block,
      block18
    }
    console.log(saveData)

    setSpecialist((specialist) => {	

			let userIndex = specialist.findIndex((spec) => spec.id === id);
			const usersCopy = JSON.parse(JSON.stringify(specialist));

      const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, 
        fio, 
        phone, 
        city: city, 
        age: age ? age+'-01-01' : '', 
        speclist: strSpec,
        company: strCompany,
        skill: strSkill,
        merch: strMerch,
        comteg: strComteg,
        comteg2: strComteg2,
        comment: strComment,
        comment2: strComment2,
        chatId: telegram,
        profile,
        inn,
        email,
        promo,
        passport,
        block,
        block18,
      };


			return usersCopy;
    });

    //сохранить изменения в базе
    await editSpecialist(saveData, id)

    addToast(exampleToast) //ваши данные сохранены
  }

  const blockedProfile = () => { 
    setBlockProfile(!blockProfile)
  }


  useEffect(() => {
    console.log("city: ", city)

  }, [city]);


  const handleTg = event => {
    const result = event.target.value.replace(/\D/g, '');
    setTelegram(result);
  };

  const handleInn = event => {
    const result = event.target.value.replace(/\D/g, '');
    setInn(result);
  };

  const handlePromo = event => {
    const result = event.target.value.replace(/\D/g, '');
    setPromo(result);
  };

  const changeSpec = (e) => {
    console.log(e.target.innerText)
    setSpeclist([...specialist, e.target.innerText])
    setShowSpec(false)
  }

  const onChangeReyting = () => {
    setShowBlacklist(false)
    setShowMenu2(false)
  }

  const onChangeBlacklist = () => {
    setShowBlacklist(true)
    setShowMenu1(false)

    //добавить в список специальностей Blacklist
    speclist.push('Blacklist')
    console.log("speclist: ", speclist)

    setSpeclist(speclist)
  }

  const onChangeBlock18 = () => {
    setShowBlock18(!showBlock18)
    setShowMenuBlock18(false)
    setBlock18(!showBlock18)
  }  

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }

  const clickSearch = (e) => {
    setShowClear(true)
    setText(e.target.value)
  }

  const clearSearch = () => {
    setText('')
  }


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Специалисты</h2> */}
                    <CToaster ref={toaster} push={toast} placement="top-end" /> 
                    <CRow className="mb-3">
                      <CCol sm={3} style={{position: 'relative'}}>
                        <CFormInput 
                          placeholder="Поиск..." 
                          onChange={(e)=>clickSearch(e)} 
                          aria-label="spec"
                          value={text}
                          style={{display: showSearch ? 'block' : 'none'}}
                        >   
                        </CFormInput>
                        <img src={Close} alt='' onClick={clearSearch} width={10} style={{display: showClear ? 'block' : 'none', position: 'absolute', top: '15px', right: '20px'}}/>
                      </CCol>
                      <CCol>
                        <CButton onClick={clickAdd} className='uley_add_user' style={{display: showSearch ? 'block' : 'none'}}>
                          <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                          +</span>
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                              Всего: {specialistAll.length}
                            </p>
                            <CCardBody>
                              {!showProfile ?
                              
                              (loading ? 
                                      
                                <CSpinner/> :
                                <div className='scrooll-table'>
                                  <div className="table-head-content"></div>
                                  <div className="table-head-content2"></div>
                                  {/* <div className="table-col-content"></div> */}
                                  <CTable align="middle" className="mb-0 border my-table" hover bordered>
                                    <CTableHead className='table-light'>
                                      <CTableRow>
                                        <CTableHeaderCell className='myid-th widthSpace'>№</CTableHeaderCell> 
                                        <CTableHeaderCell className='myfio-th widthSpace' onClick={onSortFio}>ФИО</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthTg' onClick={onSortTG}>Телеграм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Специальность</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace' onClick={onSortCity}>Город</CTableHeaderCell>   
                                        <CTableHeaderCell className='my-th widthSpace'>Год</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Телефон №2</CTableHeaderCell>                         
                                        <CTableHeaderCell className='my-th widthSpace'>Навык</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Промокод</CTableHeaderCell>                                       
                                        <CTableHeaderCell className='my-th widthSpace'>Мерч</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Прокатная компания</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег №2</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии №2</CTableHeaderCell>                                        
                                        <CTableHeaderCell className='my-th widthSpace'>Рейтинг</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>ИНН</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Д</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>С</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт [скан]</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody >                                  
                                    {specialist.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index+1} style={{lineHeight: '14px'}}>
                                          <CTableDataCell className="text-center widthSpace my-td">
                                            {index+1}
                                          </CTableDataCell>
                                          <CTableDataCell onClick={()=>clickFio(item)} className="widthSpace myfio-td" style={{cursor: 'pointer', textAlign: 'left'}}>
                                          {item.fio ? (item.fio.length > 30 ? item.fio.substr(0, 30) + '...' : item.fio) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.telegram}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.spec ? (item.spec.length > 30 ? item.spec.substr(0, 30) + '...' : item.spec) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.city ? (item.city.length > 30 ? item.city.substr(0, 30) + '...' : item.city) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.age ? item.age.split('-')[0] : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.rank}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.phone2}
                                          </CTableDataCell> 
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.skill}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.promo}
                                          </CTableDataCell>                                         
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.merch}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.company ? (item.company.length > 20 ? item.company.substr(0, 20) + '...' : item.company) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg ? (item.comteg.length > 30 ? item.comteg.substr(0, 30) + '...' : item.comteg) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg2 ? (item.comteg2.length > 30 ? item.comteg2.substr(0, 30) + '...' : item.comteg2) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment2 ? (item.comment2.length > 30 ? item.comment2.substr(0, 30) + '...' : item.comment2) : ''}
                                          </CTableDataCell>                                         
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.reyting}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.inn}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.passport ? (item.passport.length > 30 ? item.passport.substr(0, 30) + '...' : item.passport) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.profile ? (item.profile.length > 30 ? item.profile.substr(0, 30) + '...' : item.profile) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.dogovor}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.samozanjatost}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.passportScan}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.email}
                                          </CTableDataCell>

                                        </CTableRow>
                                        ))
                                    }
                                    
                                  </CTableBody>                   
                                  </CTable>
                                </div>
                                
                                
                              )
                              :
                              <div style={{position: 'relative', height: '765px', display: 'flex', flexDirection: 'row'}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '15px'}}>
                                    <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="photo"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
                                  </div>

                                  <div className="menu-reyting">
                                      <div style={{width: '250px', display: 'flex', justifyContent: 'center', marginBottom: '3px'}}>
                                        {showBlacklist ?
                                        <span onClick={()=>setShowMenu2(true)} style={{cursor: 'pointer', color: 'red', fontSize: '18px', fontWeight: '700'}}>Blacklist</span>
                                        :<div className="star-block" style={{cursor: 'pointer'}} onClick={()=>setShowMenu1(true)}>
                                          <img className='star-icon' src={StarActive} alt='' /> 
                                          <img className='star-icon' src={StarActive} alt='' />
                                          <img className='star-icon' src={StarActive} alt='' />
                                          <img className='star-icon' src={Star} alt='' />
                                          <img className='star-icon' src={Star} alt='' />
                                        </div>
                                        }
                                      </div>
                                      <div className="menu-content" style={{display: showMenu1 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeBlacklist} style={{cursor: 'pointer'}}>Blacklist</span>
                                      </div>
                                      <div className="menu-content" style={{display: showMenu2 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeReyting} style={{cursor: 'pointer'}}>Рейтинг</span>
                                      </div>
                                  </div>

                                  
                                  
                                  <label>В системе</label>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" value={dateReg && dateReg.length >0 ? dateReg.split('-')[2].split('T')[0] + '.' + dateReg.split('-')[1] + '.' + dateReg.split('-')[0] : ''} style={{width: '250px'}}/>
                                    </div>
                                  </div> 

                                  <div style={{display: 'flex'}}>
                                    <div>
                                      <label>Самозанятость</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="dogovor" id="dogovor" value={dogovor} onChange={(e) => setDogovor(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div>
                                      </div> 
                                    </div>
                                    <div style={{width: '15px'}}></div>
                                    <div>
                                      <label>Договор</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="samozanjatost" id="samozanjatost" value={samozanjatost} onChange={(e) => setSamozanjatost(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div> 
                                      </div>
                                    </div>
                                    
                                    
                                  </div>

                                   
                                  <div style={{position:'relative'}}>
                                    <label>Паспорт</label>
                                    <div className="text-field" style={{marginBottom: '0px'}}>
                                      <textarea className="text-field__input" type="text" name="passport" id="passport" value={passport} onChange={(e) => setPassport(e.target.value)} style={{width: '250px', height: '270px', whiteSpace: 'pre-line', textAlign: 'left', borderRadius:'6px'}}/>
                                    </div> 
                                    <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(passport)}} alt="" style={{position: 'absolute', top: '40px', left: '205px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                                  </div>
                                  
                                </div>
                                  <img src={block18} className="block-img"  width={50} alt='' style={{position: 'absolute', top: '0px', left: '195px', opacity: showBlock18 ? '1' : '0' }}/>                                 
                                  <div className="menu-content-block">
                                    <span onClick={onChangeBlock18} style={{cursor: 'pointer'}}>{block18 ? 'Убрать' : 'Добавить'} 18+</span>
                                  </div>
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: showKrest ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{block ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '285px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e)=>setFio(e.target.value)} style={{backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>
{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* Город */}
                                  <div className="text-field"> 
                                      <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={cities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      />
                                  </div>

                                  <label>Специальность</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={speclist}
                                        setTags={setSpeclist}
                                        options={specOnlyData}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Компания</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={company}
                                        setTags={setCompany}
                                        options={companys}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Комтеги</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{width: '320px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 
                                  
                                </div>
{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div className="uley-line" style={{left: '670px', width: '70px'}}></div>
                                  <div className="uley-line" style={{left: '805px', width: '50px'}}></div>
                                  <div className="uley-line" style={{left: '900px', width: '50px'}}></div>
                                  <div style={{display: 'flex'}}>
                                    {/* возраст */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="age" id="age" value={age2}  onChange={(e) => setAge2(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* год рождения */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} style={{width: '80px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты за месяц */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* опоздания */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px', color: 'red'}}/>
                                    </div>
                                    {/* невыходы */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', color: 'red'}}/>
                                    </div>
                                  </div>
                                  
                                  <label>Навык</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={skill}
                                        setTags={setSkill}
                                        options={skills}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Мерч</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={merch}
                                        setTags={setMerch}
                                        options={merchData}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Комтеги 2.0</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg2}
                                        setTags={setComteg2}
                                        options={comtegs}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label>Комментарии 2.0</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea className="text-field__input" type="text" name="comment2" id="comment2" value={comment2} onChange={(e) => setComment2(e.target.value)} style={{width: '320px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}/>
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  {/* phone */}
                                  <div className="text-field" onMouseOver={()=>setShowSave(true)} onMouseOut={()=>setShowSave(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(phone)}} 
                                      alt="" 
                                      style={{visibility: showSave ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                    <InputMask
                                        className="text-field__input" 
                                        style={{width: '250px'}}
                                        type="text" 
                                        name="phone" 
                                        id="phone"
                                        mask="+7 (999) 999-99-99"
                                        disabled={!blockProfile}
                                        maskChar=""
                                        onChange={(e) => setPhone(e.target.value)} 
                                        value={phone}
                                        placeholder=''
                                    >
                                    </InputMask>
                                    
                                  </div> 

                                  <label>Telegram</label>
                                  <div className="text-field" onMouseOver={()=>setShowSave2(true)} onMouseOut={()=>setShowSave2(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(telegram)}} 
                                      alt="" 
                                      style={{visibility: showSave2 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      pattern="[0-9]*"
                                      name="telegram" 
                                      id="telegram" 
                                      value={telegram} 
                                      onChange={handleTg} 
                                      style={{width: '250px'}}
                                    />
                                  </div>

                                  {/* ник */}
                                  <label> </label>
                                  <div className="text-field" onMouseOver={()=>setShowSave3(true)} onMouseOut={()=>setShowSave3(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(nik)}} 
                                      alt="" 
                                      style={{visibility: showSave3 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input disabled className="text-field__input" type="text" name="nik" id="nik" value={nik} onChange={(e) => setNik(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label>ИНН</label>
                                  <div className="text-field">
                                    <InputMask
                                        className="text-field__input" 
                                        style={{width: '250px'}}
                                        type="text" 
                                        name="inn" 
                                        id="inn"
                                        mask="9999-999999-99"
                                        maskChar=""
                                        onChange={(e) => setInn(e.target.value)} 
                                        value={inn}
                                        placeholder=''
                                    >
                                    </InputMask>
                                  </div> 

                                  {/* email */}
                                  <label></label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  <label>Промокод</label>
                                  <div className="text-field">
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      name="promo" 
                                      id="promo" 
                                      value={promo} 
                                      onChange={handlePromo} 
                                      style={{width: '250px'}}
                                      pattern="[0-9]*"
                                    />
                                  </div>

                                  {/* скан паспорта */}
                                  <label></label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="passportScan" id="passportScan" value={passportScan} onChange={(e) => setPassportScan(e.target.value)} style={{width: '250px', overflow: 'hidden', textOverflow: 'ellipsis'}}/>
                                  </div> 

                                  <label>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 
                                </div>

                              </div>
                              }
                            </CCardBody>

                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{display: !showProfile ? 'block' : 'none', width: '50px', marginBottom: '15px', cursor: 'pointer'}}></img>
                              </div> 
                          </CCard>
                        </CCol>
                    </CRow>
                  </Suspense>
            </CContainer>
        </div>
        <AppFooter />
      </div>
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Specialist
