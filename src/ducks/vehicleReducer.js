const initialState = {
    builds: []
}
const SET_VEHICLES = 'SET_VEHICLES'

export function setVehicles(builds){
    return{
        type: SET_VEHICLES,
        payload: builds
    }
}
export default function vehicleReducer(state = initialState, action){
    switch(action.type){
        case SET_VEHICLES:
            return {...state, builds: action.payload}
        default:
            return {...state}
    }
}