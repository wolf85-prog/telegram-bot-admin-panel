import 'react-app-polyfill/stable'
import 'core-js'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import UserStore from "./store/UserStore";
import { UsersProvider } from "./chat-app-new/context/usersContext";
import { SocketProvider } from "./chat-app-new/context/socketContext";
import { SocketSupportProvider } from "./chat-app-new/context/socketContextSupport";
import AccountProvider from './chat-app-new/context/AccountProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Context = createContext(null)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Context.Provider value={{
        user: new UserStore(),
    }}>

      <Provider store={store}>
        <SocketProvider>
          <SocketSupportProvider>
            <QueryClientProvider client={queryClient}>
              <UsersProvider>
                <AccountProvider>
                  <App />
                </AccountProvider>
                
              </UsersProvider>
            </QueryClientProvider>  
          </SocketSupportProvider>     
        </SocketProvider>
      </Provider>

    </Context.Provider>
    
  </React.StrictMode> 
)
