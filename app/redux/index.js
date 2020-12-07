import { combineReducers, createStore } from 'redux'
import userReducer from './user'

const rootReducer = combineReducers({
    user: userReducer
})

const configureStore =()=> createStore(rootReducer)
// store.subscribe(() => {
//     console.log(store.getState())
// })
export default configureStore