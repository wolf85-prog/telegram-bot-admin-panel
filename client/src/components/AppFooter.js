import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {

  return (
    <CFooter>
      <div>
        <a href="https://uley.team/" target="_blank" rel="noopener noreferrer">
          U.L.E.Y TEAM
        </a>
        <span className="ms-1">&copy; 2024 Все права защищены.</span>
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
