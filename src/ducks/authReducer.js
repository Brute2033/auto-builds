const initialState = {
    user: null
}
const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function setUser(user){
    return{
        type: SET_USER,
        payload: user
    }
}
export function logout(){
    return{
        type: LOGOUT_USER,
        payload: null
    }
}
export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}
        case LOGOUT_USER:
            return {...state, user: action.payload}
        default:
            return {...state}
    }
}