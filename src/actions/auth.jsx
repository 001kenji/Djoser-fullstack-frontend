import { useState } from 'react'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL ,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL

    
    }from './types'
import axios from 'axios'




export const CheckAuthenticated = () => async dispatch => {
    if(localStorage.getItem('access')) {

        function AuthFunc(data) {
            const res = JSON.parse(data)
           if(res.code !== 'token_not_valid'){
               // console.log('authenitcated')
                dispatch ({
                    type: AUTHENTICATED_SUCCESS
                })
                
            
            } else {
                console.log(' not authenticated')
                dispatch ({
                    type: AUTHENTICATED_FAIL
                })
            }
        }
        

        try{
            var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Accept', 'application/json')
        var raw = JSON.stringify({
            "token": String(localStorage.getItem('access'))
          });
          
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
        //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/verify/`, requestOptions)
        .then(response => response.text())
        .then(result => AuthFunc(result))
            
             
         }catch(err) {
             console.log(err)
             dispatch ({
                 type: AUTHENTICATED_FAIL
             })
     
         }



    }else {
        dispatch({
            type : AUTHENTICATED_FAIL
        })
    }

}

 
export const load_user = () =>  async dispatch => {
    function LoaderResponse(date) {
       // console.log('authentication request is', JSON.parse(date))
        dispatch({
            type : USER_LOADED_SUCCESS,
            payload : JSON.parse(date)
        })

        
       
        
       
    }
    //console.log(localStorage.getItem('access'), typeof(localStorage.getItem('access')))
    if (localStorage.getItem('access')  != 'undefined'){
            console.log('making the loaduser request')
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        }
        try {
           //const res = await axios.get(`${process.env.VITE_APP_API_URL}/auth/users/me/`, config);
            //myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: {
                            'Content-Type' : 'application/json',
                            'Authorization' : `JWT ${localStorage.getItem('access')}`,
                            'Accept' : 'application/json'
                        },
            
                redirect: 'follow'
            };
            //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
            fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users/me/`, requestOptions)
            .then(response => response.text())
            .then(result => LoaderResponse(result))
    
           

            
        }catch(err) {
            console.log(err)
            dispatch ({
                type: USER_LOADED_FAIL
            })
    
        }
    
    }
    else {
        dispatch ({
            type: USER_LOADED_FAIL
        })

    }

}

export const login = (email, password) =>  async dispatch => {
    //const [responsedata, setresponsedata] = useState()
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({
        "email": String(email),
        "password": String(password)
    });

    function Responser(data) {
        //console.log('data to payload: ', JSON.parse(data))
        const val = JSON.parse(data)
        //console.log(val,typeof(val))
        if(val['detail'] != 'No active account found with the given credentials'){
            console.log('dispatch proceeding ')
            dispatch({
                type : LOGIN_SUCCESS,
                payload : JSON.parse(data)
            })
            dispatch(load_user())
            
        }
        else{
            console.log('failed to proceed with dispatch load user')
            dispatch ({
                type: LOGIN_FAIL
            })
        }
        

        console.log('dispatching load user success')
    }

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
        //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`, requestOptions)
        .then(response => response.text())
        .then(result => Responser(result))
       
        
    }catch(err) {
        console.log('error is:',err)
        dispatch ({
            type: LOGIN_FAIL
        })

    }

}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({
        "email": String(email)
    });

    function Reset_Responser(data) {
        dispatch({
            type : PASSWORD_RESET_SUCCESS
        })

    }

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
        //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users/reset_password/`, requestOptions)
        .then(response => response.text())
        .then(result => Reset_Responser(result))
       
        
    }catch(err) {
        console.log(err)
        dispatch ({
            type: PASSWORD_RESET_FAIL
        })

    }
}

export const reset_passoword_confirm = (uid,token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({
        "uid": uid,
        'token' : token,
        //'token': localStorage.getItem('access'),
        'new_password': new_password[0],
        're_new_password': re_new_password[0]
    });
    console.log(body)
    function Reset_Responser_Confirm(data) {
        console.log(data)
        dispatch({
            type : PASSWORD_RESET_CONFIRM_SUCCESS
        })

    }

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
        //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users/reset_password_confirm/`, requestOptions)
        .then(response => response.text())
        .then(result => Reset_Responser_Confirm(result))
       
        
    }catch(err) {
        console.log(err)
        dispatch ({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })

    }
}


export const logout = () => dispatch => {
    dispatch ({
        type: LOGOUT
    })
}


export const signupAuth = (name, email, password,re_password) =>  async dispatch => {
    //const [responsedata, setresponsedata] = useState()
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({
        "email": String(email),
        'name': String(name),
        "password": String(password),
        're_password': String(re_password)
    });

    function SingupResponse(data) {
        //console.log('data to payload: ', JSON.parse(data))
        dispatch({
            type : SIGNUP_SUCCESS,
            payload : JSON.parse(data)
        })

    }

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
        //const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/jwt/create/`,config, body );
        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users/`, requestOptions)
        .then(response => response.text())
        .then(result => SingupResponse(result))
       
        
    }catch(err) {
        console.log(err)
        dispatch ({
            type: SIGNUP_FAIL
        })

    }

}

export const verify = (uid, token) => async dispatch => {

    function VerifyResponse(data) {
        dispatch({
            type : ACTIVATION_SUCCESS,
        })
    }

    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "uid": String(uid),
        "token": String(token)
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users/activation/`, requestOptions)
        .then((response) => response.text())
        .then((result) => VerifyResponse(result))
        //.catch((error) => console.error(error));

    }catch(err) {
        console.log(err)
        dispatch ({
            type: ACTIVATION_FAIL
        })

    }
}