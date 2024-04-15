import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'

import Promo from "./../../assets/images/spec/6_catering.png";
import Catering from "./../../assets/images/spec/6_catering.png";
import Stagehands from "./../../assets/images/spec/7_stagehands.png";
import Riggers from "./../../assets/images/spec/8_riggers.png";

const WidgetsDropdown4 = ({
  promoUsers,
  cateringUsers,
  stagehandsUsers, 
  riggerUsers,
  
}) => {

  return (
    <CRow>
      {/* Promo */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 box-top"
          color="primary"
          value={
            <>
              {promoUsers} {/*{' '}
               <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title={"Промо / Кастинг"}
          action={<img src={Promo} alt='' width={35}/>}
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                datasets: [
                  {
                    label: 'Специалисты',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [
                      (promoUsers-10)*100/promoUsers, 
                      (promoUsers-10)*100/promoUsers, 
                      (promoUsers-10)*100/promoUsers, 
                      (promoUsers-10)*100/promoUsers, 
                      0, 0, 0],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

      {/* Catering */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 box-top"
          color="info"
          value={
            <>
              {cateringUsers} 
              {/* <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title={"Кейтеринг"}
          action={<img src={Catering} alt='' width={35}/>}
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                datasets: [
                  {
                    label: 'Специалисты',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [
                      Math.floor((cateringUsers-10)*100/cateringUsers), 
                      Math.floor((cateringUsers-10)*100/cateringUsers), 
                      Math.floor((cateringUsers-10)*100/cateringUsers), 
                      Math.floor((cateringUsers-10)*100/cateringUsers), 
                      0, 0, 0],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    max: 500,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

      {/* Stagehands */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 box-top"
          color="warning"
          value={
            <>
              {stagehandsUsers}
            </>
          }
          title={"Помощники / Грузчики"}
          action={<img src={Stagehands} alt='' width={35}/>}
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'Январь', 
                  'Февраль', 
                  'Март', 
                  'Апрель', 
                  'Май', 
                  'Июнь', 
                  'Июль',
                  'Август',
                  'Сентябрь',
                  'Октябрь',
                  'Ноябрь',
                  'Декабрь',
                ],
                datasets: [
                  {
                    label: 'Специалисты',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [
                      Math.floor((stagehandsUsers-30)*100/stagehandsUsers), 
                      Math.floor((stagehandsUsers-30)*100/stagehandsUsers), 
                      Math.floor((stagehandsUsers-30)*100/stagehandsUsers), 
                      Math.floor((stagehandsUsers-30)*100/stagehandsUsers), 
                      0, 0, 0, 0, 0, 0, 0, 0],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>

      {/* Rigger */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 box-top"
          color="danger"
          value={
            <>
              {riggerUsers} {/*{' '}
               <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title={"Риггер / Граунд"}
          action={<img src={Riggers} alt='' width={35}/>}
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                datasets: [
                  {
                    label: 'Специалисты',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [
                      (riggerUsers-10)*100/riggerUsers, 
                      (riggerUsers-10)*100/riggerUsers, 
                      (riggerUsers-10)*100/riggerUsers, 
                      (riggerUsers-10)*100/riggerUsers, 
                      0, 0, 0],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    max: 500,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown4
