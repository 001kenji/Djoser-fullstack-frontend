import React, { Profiler, useCallback, useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../Components/navbar";
import { connect } from "react-redux";
import { CheckAuthenticated, logout, load_user } from "../actions/auth";
import { Provider } from "react-redux";

import { Link, Navigate } from "react-router-dom";
const Home = (props, {logout, isAuthenticated}) => {
    const [profile, setprofile] = useState({})
    const [homeauthorized, setHomeauthorized] = useState(false)
   
    //console.log(profile)
    useLayoutEffect(() => {
        props.CheckAuthenticated();
        props.load_user();
        setHomeauthorized(true)     
    },[])
      if (isAuthenticated) {
        console.log('your are authenticated in the login sect', isAuthenticated)
      }
       if(localStorage.getItem('access') == null) {
        console.log('not found')
         props.logout();
        return <Navigate to="/login" replace />;
     }

     function FristFunc(props) {
        const data = JSON.parse(props)
        setprofile(data)
  
      }
   
     
    return (
         <div>
            <div className=" top-0 sticky w-full border-b-[1px] border-slate-900">
                <Navbar />
            </div>
            
            <p className=" mx-auto text-center underline underline-offset-4 font-semibold font-mono text-3xl">Welcome to B-intel</p>
            <blockquote className=" flex mx-auto justify-center">
                <Link to='/login' className=" hidden text-sky-600 font-semibold font-mono text-center mx-auto w-fit  ">Login</Link>

            </blockquote>
            <section className="bg-gray-2 max-w-[90%] mx-auto dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
            <div className="container text-sm    mx-auto">
                <div className="flex justify-around flex-wrap p-4 -mx-4">
                    <div className="w-fit max-w-[360px] mx-3 shadow-md rounded-sm my-3 shadow-slate-900 border-[1px] border-slate-700 px-2 md:w-1/2 xl:w-1/3">
                        <div
                        className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
                        >
                        <img
                            src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-01.jpg"
                            alt="image"
                            className="w-[80%] mx-auto p-8"
                            />
                        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                                <p
                                    
                                    className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                                    >
                                50+ Best creative website themes & templates
                                </p>
                            </h3>
                            <p
                                className="text-base leading-relaxed text-body-color dark:text-dark-6 mb-7"
                                >
                                Lorem ipsum dolor sit amet pretium consectetur adipiscing
                                elit. Lorem consectetur adipiscing elit.
                            </p>
                            <p
                                
                                className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                                >
                            View Details
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="w-fit  max-w-[360px] mx-3 shadow-md rounded-sm my-3 shadow-slate-900 border-[1px] border-slate-700 px-2 md:w-1/2 xl:w-1/3">
                        <div
                        className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
                        >
                        <img
                            src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-02.jpg"
                            alt="image"
                            className="w-[80%] mx-auto p-8"
                            />
                        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                                <p
                                    
                                    className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                                    >
                                The ultimate UX and UI guide to card design
                                </p>
                            </h3>
                            <p className="text-base leading-relaxed text-body-color mb-7">
                                Lorem ipsum dolor sit amet pretium consectetur adipiscing
                                elit. Lorem consectetur adipiscing elit.
                            </p>
                            <p
                                
                                className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                                >
                            View Details
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="w-fit  max-w-[360px] mx-3 shadow-md rounded-sm my-3 shadow-slate-900 border-[1px] border-slate-700 px-2 md:w-1/2 xl:w-1/3">
                        <div
                        className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
                        >
                        <img
                            src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-03.jpg"
                            alt="image"
                            className="w-[80%] mx-auto p-8"
                            />
                        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                                <p
                                    
                                    className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                                    >
                                Creative Card Component designs graphic elements
                                </p>
                            </h3>
                            <p className="text-base leading-relaxed text-body-color mb-7">
                                Lorem ipsum dolor sit amet pretium consectetur adipiscing
                                elit. Lorem consectetur adipiscing elit.
                            </p>
                            <p
                                
                                className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                                >
                            View Details
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

          
        </div>
    )
   


};

const mapStateToProps =  state => ({
    isAuthenticated:state.auth.isAuthenticated,
    
})    
export default connect(mapStateToProps, {CheckAuthenticated, logout,load_user})(Home)
