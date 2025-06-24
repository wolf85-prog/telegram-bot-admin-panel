import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader, AppRightbar } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
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
  CModalFooter,
  CFormSelect,
  CToast, 
  CToastBody,
  CToastClose,
  CToaster,

} from '@coreui/react'
import Icon from "./../chat-app-worker/components/Icon";
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getSpecialist, getSpecCount, editSpecialist, addSpecialist, deleteSpecialist } from './../http/specAPI'
import { getWContacts} from '../http/workerAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';

import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import Pencil from "./../assets/images/pen.png";
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
  const location = useLocation()
  const workerId= location.state?.workerId
  //console.log("workerId: ", workerId)

  const { specialist, setSpecialist, specialistAll, setSpecialistAll, specialistsCount, setSpecialistsCount, addNewSpecialist } = useUsersContext();
  //const { userWorkers: specusers } = useUsersContext();

  const [specialistCount, setSpecialistCount] = useState([]);
  const [filterAll, setFilterAll] = useState([]);

  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(false);
  const [text, setText]= useState("");
  const [filteredUsers, setFilteredUsers] = useState(specialistAll)

  //const [spec, setSpec] = useState([]); 
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
  //const [blockW, setBlockW] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [krest, setKrest] = useState(false)
  
  const [cityValue, setCityValue] = useState(0)
  
  const [showSave, setShowSave] = useState(false)
  const [showSave2, setShowSave2] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [age2, setAge2] = useState(0);
  const [projectAll, setProjectAll] = useState(0);
  const [projectMonth, setProjectMonth] = useState(0);
  const [lateness, setLateness] = useState(0);
  const [noExit, setNoExit] = useState(0);
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

  const [pasCode, setPasCode] = useState('');
  const [pasData, setPasData] = useState('');
  const [pasAddress, setPasAddress] = useState('');
  const [pasPlaceBorn, setPasPlaceBorn] = useState('');
  const [pasKemVidan, setPasKemVidan] = useState('');
  const [pasDataBorn, setPasDataBorn] = useState('');
  const [pasName, setPasName] = useState('');
  const [pasSecondName, setPasSecondName] = useState('');
  const [pasLastName, setPasLastName] = useState('');
  const [pasSeria, setPasSeria] = useState('');
  const [pasNumber, setPasNumber] = useState('');
  const [projects, setProjects] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);
  const [countPressCategory, setCountPressCategory] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visiblePassport, setVisiblePassport] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [sortedCities, setSortedCities] = useState([])

  const customTooltipStyle = {
    '--cui-tooltip-bg': '#2e4053',
    '--cui-tootip-color': '#fff'
  }

  let mask = '12.34.5678';
  let formatChars = {
    '1': '[0-3]',
    '2': '[0-9]',
    '3': '[0-1]',
    '4': '[0-9]',
    '5': '[1-2]',
    '6': '[0-0]',
    '7': '[0-3]',
    '8': '[0-9]'
  };

  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;

    // Conditional mask for the 2nd digit base on the first digit
    if(value.startsWith('0')) {
      console.log(0)
      formatChars['2'] = '[1-9]'; // To block 24, 25, etc.
      if (value.startsWith('1', 3)) {
        formatChars['4'] = '[0-2]'; 
        console.log(1)
      } 
    }  
    else if(value.startsWith('1'))
      formatChars['2'] = '[0-9]'; // To allow 05, 12, etc.
    else if(value.startsWith('2'))
      formatChars['2'] = '[0-9]'; // To allow 05, 12, etc.      
    else 
      formatChars['2'] = '[0-1]'; // To allow 05, 12, etc.
    return {value, selection: newState.selection};
  }

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно сохранены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const deleteToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно удалены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  //поле поиска
  const handleInputChange = (e) => {
    setShowClear(true)
    const searchTerm = e.target.value;
    setText(searchTerm)

    // const filteredItems = specialistAll.filter((user) =>
    //   user.fio.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // setFilteredUsers(filteredItems);
  }

  const clearSearch = () => {
    setText('')
  }


  //поиск
  useEffect(() => {
    console.log("search text: ", text)

    setLoading(text === '' ? false : true)
    //let filteredData = []

    //setTimeout(()=> {
      //setLoading(true)

      const filteredData = specialistAll.filter(user=> 
        (user.fio + user.chatId + user.phone + user.speclist)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase())
        //(user.fio + user.chatId + user.phone)?.toLowerCase().includes(text.toLowerCase())
      );
      

      setSpecialistsCount(text === '' ? specialistAll.length : filteredData.length)
      //console.log("specialist", specialist)
      setShowClear(text === '' ? false : true)
      setLoading(filteredData ? false : true)
    //}, [3000])

    setSpecialist(text === '' ? specialistCount : filteredData); 
		
  }, [text]);

  useEffect(()=> {
    //setSpecialist(specialistCount)
  }, [specialistCount])

  useEffect(()=> {

    if (workerId) {
      const res = specialistAll.find((item)=>item.id === workerId)
      console.log("res: ", res)
      clickFio(res)
    }

    // сортировка городов
    const newCities = cities.map((item)=> { 
      const newArr = item.label
      return newArr
    })
    const one = [...newCities].slice(0, 4)
    const city = [...newCities].slice(5)
    const sorted = city.sort((a, b) => {       
      var cityA = a, cityB = b
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    const newSorted = [...one, ...city]
    setSortedCities(newSorted)

    const fetchData = async() => {
      console.log("Загрузка специалистов...")
      setLoading(true)

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
          str_comment2 = str_comment2 + item.content
        })
        //console.log("str_comment2: ", str_comment2)

        let str_projects = ''
        worker.projects && JSON.parse(worker.projects).map((item, index)=> {
          str_projects = str_projects + item.content
        })

        const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          speclist: str_spec,
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
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
          passeria: worker.passeria,
          pasnumber: worker.pasnumber,
          paskemvidan: worker.paskemvidan,
          pasdatevidan: worker.pasdatevidan,
          pascode: worker.pascode,
          pasbornplace: worker.pasbornplace,
          pasaddress: worker.pasaddress,
          surname: worker.surname,
          name: worker.name,
          secondname: worker.secondname,
          projects: str_projects,
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
					
				}

      })  

      setLoading(false)

      let wuserbots = await getWContacts();
      console.log("wuserbots: ", wuserbots?.length)
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
  

  //Добавить специалиста
  const clickAdd = async()=> {   

    const data = {
      fio: 'ФИО',
      specialization: JSON.stringify([{
        spec: 'Вне категории',
        cat: 'NoTag'
      }]),
    }
    const res = await addSpecialist(data)
    console.log("res: ", res)

    // if (res) {
    //   await addNewSpecialist(res?.id, res?.fio, res?.profile)
    // }

    specialist.push(
      {
        id: res?.id, 
        fio: res?.fio, 
        speclist: '',
        skill: '',
        merch: '',  
        company: '', 
        comteg: '', 
        comteg2: '', 
        comment: '', 
        comment2: '', 
    })

    const sortedUser = [...specialist].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по возрастанию 
    })

    setSpecialist(sortedUser)
  }

  const clickFio = (worker)=> {
    console.log("worker: ", worker)
    //setVisibleXL(true)
    setShowProfile(true)
    setModalWorker(worker)
    setShowSearch(false)
    setShowClear(false)

    const Val = cities.find(item=> item.label === worker.city)
    if (Val) {
      setCityValue(Val.value)
      console.log(worker.city, Val)
    }   

    const currentYear = new Date().getFullYear()

    setId(worker.id)
    setFio(worker.fio)
    setCity(worker.city ? worker.city : '')
    setAge(worker.age ? worker.age.split('-')[0] : '')
    setAge2(worker.age ? parseInt(currentYear) - parseInt(worker.age ? worker.age.split('-')[0] : 0) : '')

    setProjectAll(worker.projectAll ? worker.projectAll : '0')
    setProjectMonth(worker.projectMonth ? worker.projectMonth : '0')
    setLateness(worker.lateness ? worker.lateness : '0')
    setNoExit(worker.noExit ? worker.noExit : '0')

    setSpeclist(worker.speclist ? worker.speclist.split(', ') : [])

    setShowBlacklist(worker.speclist.includes('Blacklist'))

    setPhone(worker.phone)
    setPhone2(worker.phone2)
    setTelegram(worker.chatId)
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


    setPasName(worker.name)
    setPasSecondName(worker.secondname)
    setPasLastName(worker.surname)
    setPasSeria(worker.passeria)
    setPasNumber(worker.pasnumber)
    setPasAddress(worker.pasaddress)
    setPasCode(worker.pascode)
    setPasData(worker.pasdatevidan)
    setPasDataBorn(worker.pasdateborn)
    setPasKemVidan(worker.paskemvidan)
    setPasPlaceBorn(worker.pasbornplace)
    setProjects(worker.projects)

    
    if (userbots) {
      setNik(userbots.find((user) => user.chatId?.toString() === worker.chatId?.toString())?.username)
      //setDateReg(userbots.find((user) => user.chatId?.toString() === worker.chatId?.toString())?.createdAt)
      //setDateReg(worker.createdAt)
    }
    setDateReg(worker.createdAt)

    //setBlockW(worker.blockW)
    setBlock18(worker.block18)
    setKrest(worker.krest)

    setShowBlock18(worker.block18)
    console.log("user", userbots.find((user) => user.chatId === worker.chatId))
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

  //сортировка по Специальности
  const onSortCategory = () => {
    setCountPressCategory(countPressCategory + 1)
    
    if (countPressCategory + 1 >= 3) {
      setCountPressCity(0)
    }
    //console.log("check sort", countPressTG + 1)

    if (countPressCategory + 1 === 1) {
      const sortedWorker = [...specialist].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
    } else if (countPressCategory + 1 === 2) {
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
          str_comment2 = str_comment2 + item.content + (index+1 !== JSON.parse(worker.comment2).length ? '' : '')
        })
        

				const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          phone2: worker.phone2,
          speclist: str_spec,
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
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
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
    setCityValue(0)
  }

  

  //сохранить профиль
  const saveProfile = async(id) => { 
    setShowModal(true)

    //setShowClose(true)
    console.log(id)

    let specArr = []
    let strSpec = ''

    speclist.map((item, index) => {
      specData.map((category)=> {
          category.models.map((work)=> {
              if (work.name === item){
                  const obj = {
                      spec: item,
                      cat: category.icon,
                  }
                  strSpec = strSpec + item + (index+1 !== speclist.length ? ', ' : '')
                  specArr.push(obj)
              }
          })
      })
      if (item === 'Blacklist') {
        const obj = {
            spec: item,
            cat: 'Blacklist',
        }
        strSpec = strSpec + item + (index+1 !== speclist.length ? ', ' : '')
        specArr.push(obj) 
      }
    })

    //console.log("specArr: ", specArr)

    let skillArr = []
    let strSkill = ''
    skill.map((item, index)=> {
      const obj = {
        name: item,
      }
      strSkill = strSkill + item + (index+1 !== skill.length ? ', ' : '')
      skillArr.push(obj)
    })

    let companyArr = []
    let strCompany = ''
    company.map((item, index)=> {
      const obj = {
        name: item,
      }
      strCompany = strCompany + item + (index+1 !== company.length ? ', ' : '')
      companyArr.push(obj)
    })

    let merchArr = []
    let strMerch = ''
    merch.map((item, index)=> {
      const obj = {
        name: item,
      }
      strMerch = strMerch + item + (index+1 !== merch.length ? ', ' : '')
      merchArr.push(obj)
    })

    let comtegArr = []
    let strComteg = ''
    comteg.map((item, index)=> {
      const obj = {
        name: item,
      }
      strComteg = strComteg + item + (index+1 !== comteg.length ? ', ' : '')
      comtegArr.push(obj)
    })

    let comtegArr2 = []
    let strComteg2 = ''
    comteg2.map((item, index)=> {
      const obj = {
        name: item,
      }
      strComteg2 = strComteg2 + item + (index+1 !== comteg2.length ? ', ' : '')
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
      city: city,
      age: age ? age+'-01-01' : '', 
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
      //blockW,
      block18,
      krest
    }
    //console.log(saveData)

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
        //blockW,
        block18,
        krest,
      };

      console.log("update user: ", usersCopy[userIndex])

			return usersCopy;
    });

    setSpecialistAll((specialist) => {	

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
        //blockW,
        block18,
        krest,
      };

			return usersCopy;
    });

    setSpecialistCount((specialist) => {	

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
        //blockW,
        block18,
        krest,
      };

			return usersCopy;
    });

    //сохранить изменения в базе
    const resSave = await editSpecialist(saveData, id)
    console.log("resSave: ", resSave)

    //addToast(exampleToast) //ваши данные сохранены

    setTimeout(()=> {
      setShowModal(false)
      closeProfile()
    }, 2000)
  }

  const blockedProfile = () => { 
    setBlockProfile(!blockProfile)
  }


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

    //убрать из списка специальностей Blacklist
    const res = speclist.filter(item=>item !== 'Blacklist')
    console.log("speclist: ", res)

    setSpeclist(res)
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
    setBlock18(!block18)
  }  

  const onChangeKrest = () => {
    setKrest(!krest)
    setShowMenuKrest(false)
    //setBlockW(!blockW)
  } 

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }

  
  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }


  //удаление специалиста
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    await deleteSpecialist(id)
    addToast(deleteToast) //ваши данные сохранены

    setSpecialist([...specialist].filter(item=>item.id !== id))

    setShowProfile(false)
  }

  const addCity = (e) => {
    //console.log(e.target.value)
    const city = cities.find(item=> parseInt(item.value) === parseInt(e.target.value))
    //console.log(city.label)
    setCity(city.label)
    setCityValue(e.target.value)
  }

  const clearCity = () => {
    setCity('')
    setCityValue(0)
  }

  const pressEditPassport = () => {
    setVisiblePassport(!visiblePassport)
  } 
  
  const handleCode = event => {
    const result = event.target.value;
    setPasCode(result);
  };

  const handleData = event => {
    const result = event.target.value;
    setPasData(result);
  };

  const handleAddress = event => {
    const result = event.target.value;
    setPasAddress(result);
  };

  const handleBorn = event => {
    const result = event.target.value;
    setPasPlaceBorn(result);
  };

  const handleKemVidan = event => {
    const result = event.target.value;
    setPasKemVidan(result);
  };

  const handleDataBorn = event => {
    const result = event.target.value;
    setPasDataBorn(result);
  };

  const handleSeria = event => {
    const result = event.target.value.replace(/\D/g, '');
    setPasSeria(result);
  };

  const handleNumber = event => {
    const result = event.target.value.replace(/\D/g, '');
    setPasNumber(result);
  };


  const savePassport = async(id) => {

    const pass_str = `${pasLastName} ${pasName} ${pasSecondName} 
                            
Паспорт: ${pasSeria} ${pasNumber}
Дата рождения: ${pasDataBorn}
Выдан: ${pasKemVidan} 
Дата выдачи: ${pasData}   
Код подразделения: ${pasCode}
                            
Место рождения: ${pasPlaceBorn}
                            
Адрес регистрации: ${pasAddress}` 
    
      const data = {
        passeria: pasSeria,
        pasnumber: pasNumber,
        paskemvidan: pasKemVidan,
        pasdatevidan: pasData,
        pascode: pasCode,
        pasbornplace: pasPlaceBorn,
        pasaddress: pasAddress,
        surname: pasLastName,
        name: pasName,
        secondname: pasSecondName,
        pasdateborn: pasDataBorn,
        passport: pass_str,
      }

      console.log("saveData: ", data, id)


      setSpecialist((specialist) => {	
        let userIndex = specialist.findIndex((spec) => spec.id === id);
        const usersCopy = JSON.parse(JSON.stringify(specialist));

        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          passport: pass_str, 
        };

        return usersCopy;
      });

      setPassport(pass_str)

      setVisiblePassport(false)
      setShowModal(true)

      //сохранить изменения в базе
      const res = await editSpecialist(data, id)
      //console.log("res save: ", res)

      setTimeout(()=> {
        setShowModal(false)
      }, 2000)
  };



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
                          onChange={handleInputChange} 
                          aria-label="spec"
                          value={text}
                          style={{display: showSearch ? 'block' : 'none'}}
                        >   
                        </CFormInput>
                        <img src={Close} alt='' onClick={clearSearch} width={10} style={{display: showClear ? 'block' : 'none', position: 'absolute', top: '15px', right: '20px', cursor: 'pointer'}}/>
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
                              Всего: {specialistsCount}
                            </p>
                            <CCardBody>
                              {!showProfile ?
                              
                              (loading ? 
                                      
                                <CSpinner/> :
                                <div className='scrooll-table'>
                                  <div className="table-head-content"></div>
                                  <div className="table-head-content2"></div>
                                  <div className="table-head-content3"></div>
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
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон №2</CTableHeaderCell>                         
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
                                            {item.chatId}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.speclist ? (item.speclist.length > 30 ? item.speclist.substr(0, 30) + '...' : item.speclist) : ''}
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
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px', objectFit: 'cover'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
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
                                      <div style={{width: '250px', display: 'flex', justifyContent: 'center'}}>
                                        {showBlacklist ?
                                        <span onClick={()=>setShowMenu2(true)} style={{cursor: 'pointer', color: 'red', fontSize: '24px', fontWeight: '700', marginBottom: '3px'}}>Blacklist</span>
                                        :<div className="star-block" style={{cursor: 'pointer', marginBottom: '8px'}} onClick={()=>setShowMenu1(true)}>
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

                                  
                                  
                                  <label className='title-label'>В системе</label>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" value={dateReg && dateReg.length >0 ? dateReg.split('-')[2].split('T')[0] + '.' + dateReg.split('-')[1] + '.' + dateReg.split('-')[0] : ''} style={{width: '250px'}}/>
                                    </div>
                                  </div> 

                                  <div style={{display: 'flex'}}>
                                    <div>
                                      <label className='title-label'>Самозанятость</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2025' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="dogovor" id="dogovor" value={dogovor} onChange={(e) => setDogovor(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div>
                                      </div> 
                                    </div>
                                    <div style={{width: '15px'}}></div>
                                    <div>
                                      <label className='title-label'>Договор</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2025' onChange={(e) => setInn(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="samozanjatost" id="samozanjatost" value={samozanjatost} onChange={(e) => setSamozanjatost(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div> 
                                      </div>
                                    </div>
                                    
                                    
                                  </div>

                                   
                                  <div style={{position:'relative'}}>
                                    <label className='title-label'>Паспорт</label>
                                    <div className="text-field" style={{marginBottom: '0px'}}>
                                      <textarea 
                                        className="text-field__input" 
                                        type="text" 
                                        name="passport" 
                                        id="passport" 
                                        value={passport} 
                                        onChange={(e) => setPassport(e.target.value)} 
                                        style={{resize: 'none', width: '250px', height: '270px', whiteSpace: 'pre-line', textAlign: 'left', borderRadius:'6px'}}/>
                                    </div> 
                                    <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(passport)}} alt="" style={{position: 'absolute', top: '40px', left: '205px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                                    <img src={Pencil} onClick={pressEditPassport} alt="" style={{position: 'absolute', top: '80px', left: '205px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                                  </div>
                                  
                                </div>
                                  <img src={imgBlock18} className="block-img"  width={50} alt='' style={{position: 'absolute', top: '0px', left: '195px', opacity: block18 ? '1' : '0' }}/>                                 
                                  <div className="menu-content-block">
                                    <span onClick={onChangeBlock18} style={{cursor: 'pointer'}}>{block18 ? 'Убрать' : 'Добавить'} 18+</span>
                                  </div>
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: krest ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{krest ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e)=>setFio(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      <Icon id="delete" onClick={()=>clickDelete(id)} />
                                      <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>
{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '320px', position: 'relative'}}>
                                  {/* Город */}
                                  <label className='title-label' style={{position: 'absolute', top: '-25px', left: '140px'}}>Город</label>
                                  <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative'}}> 
                                      {/* <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={cities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      /> */}
                                      {/* <CFormSelect 
                                        aria-label="Default select example"
                                        style={{backgroundColor: '#131c21'}}
                                        options={sortedCities}
                                        value={cityValue}
                                        onChange={(e)=>addCity(e)}
                                      /> */}
                                      <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '700',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                  }
                                              }}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={sortedCities}
                                              noOptionsText={'Пусто'}
                                              style={{width: '100%', padding: '0'}}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>setCity(e.target.value)}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  setCity(newValue)
                                                }  
                                              }}
                                              value={city} 
                                              inputValue={city}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <input 
                                                      className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder=''
                                                  />
                                              </div>
                                              )}
                                      />
                                      <img src={Close} onClick={clearCity} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img>
                                  </div>

                                  <label className='title-label'>Специальность</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={speclist.filter(item=>item !== 'Blacklist')}
                                        setTags={setSpeclist}
                                        options={specOnlyData}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Компания</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={company}
                                        setTags={setCompany}
                                        options={companys}
                                        //onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Комтеги</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                        //onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', width: '320px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 
                                  
                                </div>
{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div className="uley-line" style={{left: '670px', top: '60px', width: '70px'}}></div>
                                  <div className="uley-line" style={{left: '805px', top: '60px', width: '50px'}}></div>
                                  <div className="uley-line" style={{left: '900px', top: '60px', width: '50px'}}></div>
                                  <div style={{display: 'flex'}}>
                                    {/* возраст */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="age2" id="age2" value={age2}  onChange={(e) => setAge2(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* год рождения */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} style={{width: '80px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты за месяц */}
                                    <div className="text-field">
                                      <div className="text-field__input" type="text" name="reyting" id="reyting"  style={{width: '40px', marginRight: '8px', paddingTop: '8px'}}>{projectMonth}</div>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <div className="text-field__input" type="text" name="rank" id="rank"  style={{width: '40px', marginRight: '8px', paddingTop: '8px'}}>{projectAll}</div>
                                    </div>
                                    {/* опоздания */}
                                    <div className="text-field">
                                      <div className="text-field__input" type="text" name="rank" id="rank"  style={{width: '40px', marginRight: '8px', color: 'red', paddingTop: '8px'}}>{lateness}</div>
                                    </div>
                                    {/* невыходы */}
                                    <div className="text-field">
                                      <div className="text-field__input" type="text" name="rank" id="rank"  style={{width: '40px', color: 'red', paddingTop: '8px'}}>{noExit}</div>
                                    </div>
                                  </div>
                                  
                                  <label className='title-label'>Навык</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={skill}
                                        setTags={setSkill}
                                        options={skills}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Мерч</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={merch}
                                        setTags={setMerch}
                                        options={merchData}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Комтеги 2.0</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg2}
                                        setTags={setComteg2}
                                        options={comtegs}
                                        onChange={changeSpec}
                                      />
                                  </div>

                                  <label className='title-label'>Комментарии 2.0</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment2" 
                                      id="comment2" 
                                      value={comment2} onChange={(e) => setComment2(e.target.value)} 
                                      style={{resize: 'none', width: '320px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}/>
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '250px', position: 'relative'}}>

                                  {/* phone */}
                                  <label className='title-label' style={{position: 'absolute', top: '-25px', left: '90px'}}>Телефон</label>
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

                                  <label className='title-label'>Telegram</label>
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

                                  <label className='title-label'>ИНН</label>
                                  <div className="text-field">
                                    <InputMask
                                        className="text-field__input" 
                                        style={{width: '250px'}}
                                        type="text" 
                                        name="inn" 
                                        id="inn"
                                        mask="999-999-999-999"
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

                                  <label className='title-label'>Промокод</label>
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

                                  {/* проекты */}
                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '170px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', paddingLeft: '10px', overflowY: 'scroll'}}>
                                      {projects}
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

                    <CModal
                      alignment="center"
                      visible={showModal}
                      onClose={() => setShowModal(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                         Данные успешно сохранены
                      </CModalBody>
                    </CModal>

                    <CModal
                      backdrop="static"
                      visible={visibleDelete}
                      onClose={() => setVisibleDelete(false)}
                      aria-labelledby="StaticBackdropExampleLabel"
                    >
                      <CModalHeader>
                        <CModalTitle id="StaticBackdropExampleLabel">Предупреждение</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Пользователь будет удален из базы!
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary" onClick={()=>deleteProfile(id)}>Удалить</CButton>
                      </CModalFooter>
                    </CModal>


                    <CModal
                      alignment="center"
                      size="lg"
                      visible={visiblePassport}
                      onClose={() => setVisiblePassport(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">Редактирование паспорта</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '240px', position: 'relative'}}>
                            <label className='title-label'>Фамилия</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                name="promo" 
                                id="promo" 
                                value={pasLastName} 
                                onChange={(e)=>setPasLastName(e.target.value)} 
                                style={{width: '240px'}}
                                pattern="[0-9]*"
                              />
                            </div>

                            <label className='title-label'>Серия</label>
                            <div className="text-field">
                              <InputMask
                                className="text-field__input" 
                                type="text" 
                                mask="9999"
                                maskChar=""
                                value={pasSeria} 
                                onChange={handleSeria} 
                                style={{width: '240px'}}
                                placeholder=''
                              >
                              </InputMask>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '240px', position: 'relative', marginLeft: '15px'}}>
                            <label className='title-label'>Имя</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                value={pasName} 
                                onChange={(e)=>setPasName(e.target.value)} 
                                style={{width: '240px'}}
                              />
                            </div>

                            <label className='title-label'>Номер</label>
                            <div className="text-field">
                              <InputMask
                                className="text-field__input" 
                                type="text" 
                                mask="999999"
                                maskChar=""
                                value={pasNumber} 
                                onChange={handleNumber} 
                                style={{width: '240px'}}
                                placeholder=''
                              >
                              </InputMask>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '240px', position: 'relative', marginLeft: '20px'}}>
                            <label className='title-label'>Отчество</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                value={pasSecondName} 
                                onChange={(e)=>setPasSecondName(e.target.value)} 
                                style={{width: '250px'}}
                              />
                            </div>

                            <label className='title-label'>Дата рождения</label>
                            <div className="text-field">
                              <InputMask
                                mask={mask}
                                className="text-field__input" 
                                value={pasDataBorn} 
                                onChange={handleDataBorn} 
                                style={{width: '250px'}}
                                formatChars={formatChars}
                                beforeMaskedValueChange={beforeMaskedValueChange}
                              ></InputMask>
                            </div>
                          </div>

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '500px', position: 'relative'}}>
                            <label className='title-label'>Выдан</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                value={pasKemVidan} 
                                onChange={handleKemVidan} 
                                style={{width: '500px'}}
                              />
                            </div>

                            <label className='title-label'>Место рождения</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                value={pasPlaceBorn} 
                                onChange={handleBorn} 
                                style={{width: '500px'}}
                              />
                            </div>

                            
                            <label className='title-label'>Адрес регистрации</label>
                            <div className="text-field">
                              <input 
                                className="text-field__input" 
                                type="text" 
                                value={pasAddress} 
                                onChange={handleAddress} 
                                style={{width: '500px'}}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '250px', position: 'relative', marginLeft: '15px'}}>
                            <label className='title-label'>Дата выдачи</label>
                            <div className="text-field">
                              <InputMask
                                mask={mask}
                                formatChars={formatChars}
                                beforeMaskedValueChange={beforeMaskedValueChange}
                                className="text-field__input" 
                                value={pasData} 
                                onChange={handleData} 
                                style={{width: '250px'}}
                              ></InputMask>
                            </div>

                            <label className='title-label'>Код подразделения</label>
                            <div className="text-field">
                              <InputMask
                                className="text-field__input" 
                                style={{width: '250px'}}
                                type="text" 
                                mask="999-999"
                                maskChar=""
                                onChange={(e) => setPasCode(e.target.value)} 
                                value={pasCode}
                                placeholder=''
                              >
                              </InputMask>
                            </div>

                            <div className="text-field" style={{marginTop: '24px'}}>
                              <div onClick={()=>savePassport(id)} className="text-field__input"  style={{width: '250px', border: '1px solid green'}}>
                                Сохранить
                              </div>  
                            </div>
                          </div>
                        </div>

                      </CModalBody>
                      
                      {/* <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisiblePassport(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary">Сохранить</CButton>
                      </CModalFooter> */}
                    </CModal>

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
