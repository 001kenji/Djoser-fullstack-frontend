import React, { useState } from "react";
import {CheckAuthenticated, load_user} from '../actions/auth'
import '../App.css'
import Navbar from "../Components/navbar";
import axios from 'axios'
import {connect} from 'react-redux'
import { login } from "../actions/auth";
import {useForm} from 'react-hook-form'
import {  Navigate } from "react-router-dom";
import { reset_password } from "../actions/auth";
const ResetPassword = ({reset_password, isAuthenticated}) => {
    const {register, handleSubmit,formState,getValues} = useForm({
        defaultValues :{
            'email' : ""
        },
        mode :'all'
    })
    const {errors, isDirty, isValid, isSubmitting} = formState
    const [requestsent, setrequestsent] = useState(false)
    // const [formData, setFrormData] = useState({
    //     email: ''
    // })
    // const {email} = formData;
    // const Change = e => setFrormData({...formData, [e.target.name] : [e.target.value]})
    
    function SubmitRequest(requestData){
       // e.preventDefault()

        //console.log(email[0])
        reset_password(getValues('email'))
        setrequestsent(true)
    }
    
    // isauthenticated ? redirect to home page
    if (isAuthenticated) {
        console.log('your are authenticated in the login sect')
        return <Navigate to="/" replace />;
    }

    
    
    
    return(
        <div className=" mb-5 w-full">
              <div className=" top-0 sticky w-full border-b-[1px] border-slate-900">
                <Navbar />
            </div>
           <h1 className=" text-3xl mx-auto text-center font-semibold font-mono py-2"> Request Password Reset</h1>

            <form className=" shadow-lg shadow-slate-900 flex flex-col min-h-[200px] justify-around w-[90%] border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900 p-3 rounded-sm  mx-auto align-middle" onSubmit={handleSubmit(SubmitRequest)}>
                <input {...register('email',{
                    required :'Email is Required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })} name="email" className='mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900  rounded-sm p-2 w-3/4'   placeholder="EMAIL" type="email"  />
                {errors.email && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.email?.message}</p>}
                <button disabled={!isDirty || !isValid || isSubmitting} type="submit" className=" transition-all duration-500 disabled:bg-gray-400 rounded-sm mx-auto p-2 bg-sky-700 min-w-[100px] font-bold">Request</button>
            </form>

            

        </div>
    )


};

const mapStateToProps =  state => ({
    isAuthenticated:state.auth.isAuthenticated
})    


export default connect(mapStateToProps, {reset_password})(ResetPassword);