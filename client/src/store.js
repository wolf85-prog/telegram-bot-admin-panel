import { createStore, combineReducers } from 'redux'

// Ваши редюсеры
import changeState from './reducers/changeState.jsx';
import counterReducer from './reducers/counterReducer.jsx';

const rootReducer = combineReducers({
  state: changeState,
  counter: counterReducer,
});



const store = createStore(rootReducer)
export default store
