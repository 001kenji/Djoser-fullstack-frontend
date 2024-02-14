import React, { useState } from "react";
import {CheckAuthenticated, load_user} from '../actions/auth'
import '../App.css'
import Navbar from "../Components/navbar";
import axios from 'axios'
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import { login } from "../actions/auth";
import {useForm} from 'react-hook-form'
const Login = ({login,isAuthenticated}) => {
    const {register, formState, handleSubmit, getValues, setValue} = useForm({
        defaultValues :{
            'email': "",
            'password' : ''
         },
         mode :'all'
    })
    const {errors, isValid,isDirty, isSubmitting, isSubmitSuccessful} = formState
    const [islogedin,setislogedin] = useState(false)
    // const [formData, setFrormData] = useState({
    //     email: '',
    //     password : ''
    // })
    // const {email, password} = formData;
    // const Change = e => setFrormData({...formData, [e.target.name] : [e.target.value]})
    
    function SubmitLogin(userdata){
        

        console.log(getValues('email'))
        login(getValues('email'), getValues('password'))
        setislogedin(true)
    }
    
    // isauthenticated ? redirect to home page
    if (isAuthenticated && localStorage.getItem('access') != 'undefined') {
        console.log('your are authenticated in the login sect', isAuthenticated)

        return <Navigate to="/" replace />;
    }

    
    
    
    return(
        <div className=" mb-5 w-full">
              <div className=" top-0 sticky w-full border-b-[1px] border-slate-900">
                <Navbar />
            </div>
           <h1 className=" text-3xl  mx-auto text-center font-semibold font-mono py-2 sm:animate-pulse h-fit p-4 w-fit"> Login page</h1>
 
            <form noValidate className=" max-w-[800px] shadow-lg shadow-slate-900 flex flex-col min-h-[200px] justify-around w-[90%] border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900 p-3 rounded-sm  mx-auto align-middle" onSubmit={handleSubmit(SubmitLogin)}>
                <input {...register('email',{
                    required :'Email is required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })}   name="email" className='mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900  rounded-sm p-2 w-3/4'  placeholder="EMAIL" type="email"  />
                {errors.email && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base">{errors.email?.message}</p>}
                <input {...register('password',{
                    required : 'Password is required!',
                    minLength : {
                        value : 5,
                        message :'Input more characters'
                    }
                })}  name="password" className=' mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900   rounded-sm p-2 w-3/4'   placeholder="PASSWORD" type="password" />
                {errors.password && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.password?.message}</p>}
                <button disabled={!isDirty || !isValid || isSubmitting} type="submit" className=" transition-all duration-500 disabled:bg-gray-300 rounded-sm mx-auto p-2 bg-sky-700 min-w-[100px] font-bold hover:text-amber-600">Login</button>
            </form>

            <div className=" flex flex-col sm:flex-row mt-6 w-full justify-around gap-3">
            <p className=" font-semibold my-3">Don't have an account: <Link className=" hover:text-amber-600 text-sky-500 font-semibold underline underline-offset-4"  to="/signup" > Sign Up</Link></p>
            <p className=" font-semibold my-3">Forgot password: <Link className=" hover:text-amber-600 text-sky-500 font-semibold underline underline-offset-4"  to="/reset_password" > Reset password</Link></p>
         
            </div>

        </div>
    )


};

const mapStateToProps =  state => ({
    isAuthenticated:state.auth.isAuthenticated
})    


export default connect(mapStateToProps, {login})(Login);