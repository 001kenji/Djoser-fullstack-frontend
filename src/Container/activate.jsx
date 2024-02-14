import React, { useState } from "react";

import { Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom';
import { verify } from "../actions/auth";
const Activate = ({verify}) => {
    const [verified, setverified] = useState(false)
    const { uid, token } = useParams();
   
    const VerifyAccount = e => {
        const uidval = uid
        const tokenval = token
 
        verify(uidval, tokenval)
        setverified(true)
    }
    
    // isauthenticated ? redirect to home page
    if (verified) {
        console.log('your are authenticated in the login sect')

        return <Navigate to="/" replace />;
    }

    
    
    
    return(
        <div className=" mb-5 w-full">
           
 
            <div className=" mt-[100px] flex flex-col justify-center align-middle">
                <h1 className=" text-3xl  mx-auto text-center font-semibold font-mono py-2  h-fit p-4 w-fit"> Verify Your Account</h1>
                <button onClick={VerifyAccount} type="button" className=" rounded-sm mx-auto p-2 my-2 bg-sky-700 min-w-[130px] font-bold hover:text-amber-600">Verify</button>

            </div>

            

        </div>
    )


};



export default connect(null, {verify})(Activate);