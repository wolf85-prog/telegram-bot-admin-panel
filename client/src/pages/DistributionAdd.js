import React, { Suspense } from 'react'
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
  CFormTextarea
} from '@coreui/react'

const DistributionAdd = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <>
                    <h2>Создание рассылки</h2>
                    <h5>Раздел находится в разработке</h5>

                    <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            {/* <CCardHeader>Рассылки</CCardHeader> */}
                            <CCardBody>
                              <CForm>
                                <div className="mb-3">
                                  <CFormLabel htmlFor="exampleFormControlInput1">Email адрес</CFormLabel>
                                  <CFormInput type="email" id="exampleFormControlInput1" placeholder="name@example.com"/>
                                </div>
                                <div className="mb-3">
                                  <CFormLabel htmlFor="exampleFormControlTextarea1">Текст сообщения</CFormLabel>
                                  <CFormTextarea id="exampleFormControlTextarea1" rows={3}></CFormTextarea>
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
