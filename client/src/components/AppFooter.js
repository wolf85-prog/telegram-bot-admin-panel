import React from 'react'
import { CFooter } from '@coreui/react'

import { getProject3 } from '../http/adminAPI';

const AppFooter = () => {

  var options = {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  var date = new Date('2023-08-03T17:43');
  var timeDiff = date.getTime() - 720000000;
  //console.log("Дата и время: ", timeDiff.toISOString());

  return (
    <CFooter>
      <div>
        <a href="https://uley.team/" target="_blank" rel="noopener noreferrer">
          U.L.E.Y TEAM
        </a>
        <span className="ms-1">&copy; 2023 Все права защищены.</span>
      </div>
      <div className="ms-auto">
        {/* <span className="me-1">Сделано</span> */}
        {/* <a href="https://uley.team/" target="_blank" rel="noopener noreferrer">
            U.L.E.Y TEAM
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
