import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import vehicleReducer from './vehicleReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    vehicle: vehicleReducer
})


export default createStore(rootReducer)