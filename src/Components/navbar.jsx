import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {logout} from '../actions/auth'
import {connect} from 'react-redux'
 
const Navbar = ({logout, isAuthenticated}) => {

    const [open, setOpen] = useState(false);
    const Gestlink = () => (
            <Fragment>
                <Link
                    to="/login"
                    className=" py-1 px-1 sm:px-7 text-black sm:py-3 text-base font-medium text-dark hover:text-sky-500 "
                >
                    Sign in
                </Link>

                <Link
                    to="/signup"
                    className=" py-1 px-1 rounded-md text-black bg-sky-500 sm:px-7 sm:py-3 text-base font-medium  hover:bg-sky-500"
                >
                    Sign Up
                </Link>

            </Fragment>
    )
    const Authlink = () => (

        <Fragment>
            <a
            href="#"
            onClick={logout}
            className=" py-1 px-3 animate-pulse sm:px-7 text-black sm:py-3 text-base font-medium text-dark hover:text-sky-500 "
        >
            Logout
        </a>
        </Fragment>

    )


    return (
     
    <header className={`flex w-full items-center bg-white dark:bg-dark`}>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                <div className="w-60 max-w-full px-4">
                    <Link to="/" className="block w-full py-5">
                    <img
                        src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                        alt="logo"
                        className=" p-2 dark:hidden"
                    />
                    <img
                        src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                        alt="logo"
                        className=" p-2 hidden dark:block"
                    />
                    </Link>
                </div>
                <div className="flex w-full items-center justify-between px-4">
                    <div>
                    <GiHamburgerMenu className=" md:hidden cursor-pointer text-base" onClick={() => setOpen(!open)} />
                    <button
                        onClick={() => setOpen(!open)}
                        id="navbarToggler"
                        className={` min-h-[40px] text-center text-sm align-middle bg-slate-900 hidden sm:block z-0  text-sky-600 ${
                        open && "navbarTogglerActive"
                        } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary mr-7 focus:ring-2 lg:hidden`}
                    >Menu</button>
                    <nav
                        // :className="!navbarOpen && 'hidden' "
                        id="navbarCollapse"
                        className={` z-50 text-sky-600 opacity-90  absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-black px-6 py-5 shadow dark:bg-dark-2 lg:static lg:bg-transparent lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                        !open && "hidden"
                        } `}
                    >
                        <ul className="flex z-50 bg-transparent opacity-90 sm:flex sm:gap-3 sm:min-w-[200px] gap-2 lg:flex">
                        <Link className=" text-sky-600 font-semibold " to="/">Home</Link>
                        <Link className=" text-sky-600 font-semibold " to="/reset_password">Forgot password</Link>
                        </ul>
                    </nav>
                    </div>
                    <div className=" flex flex-row gap-2 mr-2 sm:mr-8 justify-end sm:pr-16 sm:flex lg:pr-0">
                        {
                            isAuthenticated ? <Authlink /> : <Gestlink />
                        }
                    </div>
                </div>
                </div>
            </div>
    </header>

    )
    


};


const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps, {logout})(Navbar)