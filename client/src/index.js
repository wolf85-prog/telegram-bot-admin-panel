import 'react-app-polyfill/stable'
import 'core-js'
import React, {createContext} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import UserStore from "./store/UserStore";

export const Context = createContext(null)
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Context.Provider value={{
          user: new UserStore(),
      }}>
        <App />
      </Context.Provider>  
    </Provider>,
  </React.StrictMode> 
)
