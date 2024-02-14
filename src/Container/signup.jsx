import React, { useState } from "react";
import Navbar from "../Components/navbar";
import {CheckAuthenticated, load_user} from '../actions/auth'
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import { signupAuth } from "../actions/auth";
import {useForm} from 'react-hook-form' 
function Signup ({signupAuth, isAuthenticated}) {
    const {register, handleSubmit, watch, formState, getValues} = useForm({
        defaultValues :{
            'name' :'',
            'email':'',
            'password':'',
            're_password':""
        },
        mode : 'all'
    })
    const {errors, isDirty, isValid, isSubmitting} = formState
    const [accountcreated, setaccountcreated] = useState(false)
    // const [formData, setFrormData] = useState({
    //      name : '',
    //      email: '',
    //      password : '',
    //      re_password : ''
    // })
    // const {name, email,password, re_password} = formData;
    // const Change = e => setFrormData({...formData, [e.target.name] : [e.target.value]})
    
    function SubmitSingup (signupData) {
       // e.preventDefault()

        // console.log({...formData})
       if(signupData.password === signupData.re_password){
            console.log('passoword match')
            signupAuth(signupData.name,signupData.email, signupData.password, signupData.re_password);
            setaccountcreated(true)
        }
    }
    
    // isauthenticated ? redirect to home page
    if (isAuthenticated) {
        console.log('your are authenticated in the login sect')

        return <Navigate to="/" replace />;
    }
    if(accountcreated){
        return <Navigate to="/login" replace />;
    }

   
    return (
        <div>
              <div className=" top-0 sticky w-full border-b-[1px] border-slate-900">
                <Navbar />
            </div>
            <p className=" text-3xl  mx-auto text-center font-semibold font-mono py-2 sm:animate-pulse h-fit p-4 w-fit" >Signup Page</p>
        
            <form noValidate className=" max-w-[800px] shadow-lg shadow-slate-900 flex flex-col min-h-[400px] mt-4 justify-around w-[90%] border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900 p-3 rounded-sm  mx-auto align-middle" onSubmit={handleSubmit(SubmitSingup)}>
                <input {...register('email',{
                    required : 'Email is Required!',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })} name="email"  className='mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900  rounded-sm p-2 w-3/4'  placeholder="EMAIL" type="email"  />
                {errors.email && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.email?.message}</p>}
                <input {...register('name',{
                    required :'Username is Required!'
                })} name="name" className='mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900  rounded-sm p-2 w-3/4'  placeholder="USERNAME" type="text"  />
                {errors.name && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.name?.message}</p>}
                <input {...register('password',{
                    required : 'Password is Required!'
                })}  name="password" className=' mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900   rounded-sm p-2 w-3/4'   placeholder="PASSWORD" type="password" />
                {errors.password && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.password?.message}</p>}
                <input {...register('re_password',{
                    required : true,
                    validate: (val =   string) => {
                        if (watch('password') != val) {
                        return "Your passwords do no match";
                        }
                    },
                })}  name="re_password" className=' mx-auto  border-[1px] placeholder:text-center placeholder:font-semibold border-slate-900   rounded-sm p-2 w-3/4'  placeholder="CONFIRM PASSWORD" type="password" />
                {errors.re_password && <p className=" my-2 max-w-[600px] bg-slate-900 text-red-500 font-semibold mx-auto text-center w-[80%] rounded-sm text-sm sm:text-base" >{errors.re_password?.message}</p>}
                <button disabled={!isDirty || !isValid || isSubmitting} type="submit" className=" transition-all duration-500 disabled:bg-gray-400 rounded-sm mx-auto p-2 bg-sky-700 min-w-[100px] font-bold hover:text-amber-600">Sign Up</button>
            </form>

            <div className=" flex flex-col sm:flex-row mt-6 w-full ml-2 sm:ml-1 justify-around gap-3">
            <p className=" font-semibold my-3">Have an account: <Link className=" hover:text-amber-600 text-sky-500 font-semibold underline underline-offset-4"  to="/login" > Sign In</Link></p>
         
            </div>
        </div>
    )


};

const mapStateToProps =  state => ({
    isAuthenticated:state.auth.isAuthenticated
})    

export default connect(mapStateToProps, {signupAuth})(Signup)