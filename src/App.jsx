import { useEffect, useState } from 'react'
import{BrowserRouter , Route, Routes} from 'react-router-dom'
import {connect} from 'react-redux'
import { CheckAuthenticated, load_user } from './actions/auth'
import './App.css'
import Home from './Container/home'
import Activate from './Container/activate'
import Login from './Container/login'
import Signup from './Container/signup'
import ResetPassword from './Container/resetpassowrd'
import Layout from './hocs/layout'
import ResetPasswordConfirm from './Container/resetpassowrdConfirm'

import { Provider }  from 'react-redux'
import Store from './store'
function App(props) {
  // useEffect(() => {
  //   props.CheckAuthenticated();
  //   props.load_user();

  // },[])

  return (
    <>
      <Provider store={Store} >
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="/signup" element={<Signup />}>
              </Route>
              <Route  path='/login' element={<Login />} ></Route>
              <Route exact path='/reset_password' element={<ResetPassword />} ></Route>
              <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} ></Route>
              <Route exact path='/activate/:uid/:token' element={<Activate />} ></Route>

            </Routes>
          </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
// export default connect(null, {CheckAuthenticated, load_user})(App)
