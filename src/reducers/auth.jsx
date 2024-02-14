import {
LOGIN_SUCCESS,
LOGIN_FAIL,
USER_LOADED_SUCCESS,
USER_LOADED_FAIL,
AUTHENTICATED_FAIL,
AUTHENTICATED_SUCCESS,
LOGOUT,
PASSWORD_RESET_CONFIRM_FAIL ,
PASSWORD_RESET_CONFIRM_SUCCESS,
PASSWORD_RESET_FAIL,
PASSWORD_RESET_SUCCESS,
SIGNUP_SUCCESS,
SIGNUP_FAIL,
ACTIVATION_SUCCESS,
ACTIVATION_FAIL


}from '../actions/types'
const initialState = {
    access:  localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated:null,
    user : null
};

export default function (state = initialState, action) {
    const { type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS: 
        localStorage.setItem('access', payload.access)
        //console.log('written data - access:', localStorage.getItem('access'))
        //console.log('data writen refresh :',payload.refresh)
            return {
                ...state,
                isAuthenticated : true,
                access :payload.access,
                refresh :payload.refresh
            }
        case USER_LOADED_SUCCESS:
            //{<home profile={initialState}   />}
            //console.log('data from,:', initialState)
            return {
                ...state,
                user: payload,

            }

        case AUTHENTICATED_SUCCESS :
            return {
                ...state,
                isAuthenticated : true
            }
        case AUTHENTICATED_FAIL :
            return {
                ...state,
                isAuthenticated : false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null

            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isAuthenticated: null,
                refresh: null,
                access:null,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isAuthenticated: null,
                refresh: null,
                access:null,
                user: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_SUCCESS:
        case SIGNUP_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }



        default:
            return state
    }
}