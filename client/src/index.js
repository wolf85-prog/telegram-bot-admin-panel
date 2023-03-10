import 'react-app-polyfill/stable'
import 'core-js'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { UsersProvider } from "./chat-app-new/context/usersContext";
import { SocketProvider } from "./chat-app-new/context/socketContext";
import AccountProvider from './chat-app-new/context/AccountProvider';

export const Context = createContext(null)
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL)
console.log('REACT_APP_CHAT_ADMIN_ID:', process.env.REACT_APP_CHAT_ADMIN_ID)


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <SocketProvider>
          <UsersProvider>
            <AccountProvider>
              <App />
            </AccountProvider>        
          </UsersProvider>
        </SocketProvider>
    </Provider>
  </React.StrictMode> 
)
