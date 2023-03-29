import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { 
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea
} from '@coreui/react'

import { MultiSelect } from "react-multi-select-component";
import { useUsersContext } from "./../chat-app-new/context/usersContext";

const DistributionAdd = () => {

  const { users: clients } = useUsersContext();
  const [contacts, setContacts]= useState([]);

  // const options = [
  //   { label: "Grapes 🍇", value: "grapes" },
  //   { label: "Mango 🥭", value: "mango" },
  //   { label: "Strawberry 🍓", value: "strawberry" },
  //   { label: "Watermelon 🍉", value: "watermelon" },
  //   { label: "Pear 🍐", value: "pear", disabled: true },
  //   { label: "Apple 🍎", value: "apple" },
  //   { label: "Tangerine 🍊", value: "tangerine" },
  //   { label: "Pineapple 🍍", value: "pineapple" },
  //   { label: "Peach 🍑", value: "peach" }
  // ];

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const arrClients = []
    
    clients.map((client) => {
      const newObj = {
        label: client.name, 
        value: client.chatId,
      }
      arrClients.push(newObj)
    })
    setContacts(arrClients)      
  }, [clients]);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <>
                    <h2>Новая рассылка</h2>

                    <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            {/* <CCardHeader>Рассылки</CCardHeader> */}
                            <CCardBody>
                              <CForm>
                                <div className="mb-3">
                                  <CFormLabel htmlFor="exampleFormControlInput1">Выберите получателей:</CFormLabel>
                                  <MultiSelect
                                    options={contacts}
                                    value={selected}
                                    onChange={setSelected}
                                    overrideStrings={{
                                      "allItemsAreSelected": "Все поля выбраны",
                                      "clearSearch": "Очистить поиск",
                                      "clearSelected": "Очистить выбор",
                                      "noOptions": "No options",
                                      "search": "Поиск",
                                      "selectAll": "Выбрать всё",
                                      "selectAllFiltered": "Выбрать всё (Filtered)",
                                      "selectSomeItems": "Выбрать...",
                                      "create": "Создать",
                                    }}   
                                  />
                                  <h6>Получателей: <span>{selected.length}</span></h6>
                                </div>
                                <div className="mb-3">
                                  {/* <CFormLabel htmlFor="exampleFormControlTextarea1">Текст сообщения</CFormLabel> */}
                                  <CFormTextarea id="exampleFormControlTextarea1" rows={3} placeholder='Введите текст сообщения'></CFormTextarea>
                                </div>
                              </CForm>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                  </>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DistributionAdd
