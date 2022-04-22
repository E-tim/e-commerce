import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import ForgotPassword from './ForgotPassword'


const SignIn = () => {
  const [signEmail, setSignEmail] = useState('')
  const [signPassword, setSignPassword] = useState('')

  const signIn = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, signEmail, signPassword)  
    } catch (error) {
      alert(error)
    }
    
  }

  // toggle between sign in and reset password componenet
  const [showResetPassword, setShowResetPassword] = useState(false);
  const togForgotPassword = () => {
    setShowResetPassword( pass => {
      return !pass
    } )
  }
  
    
  return (
    <div>
      {
        showResetPassword ? (<ForgotPassword/>) : (
          <div className='sign-in-out'> 
            <form onSubmit={signIn}>
              <label>Email:</label><br></br>
              <input type='email' value={signEmail} onChange={(e)=> {setSignEmail(e.target.value)}}/><br></br>
              <label>Password:</label><br></br>
              <input type='password' value={signPassword} onChange={(e)=>{setSignPassword(e.target.value)}} /><br></br>
              <button type='submit'>SIgn In</button><br></br>
              <p onClick={togForgotPassword} style={{cursor: 'pointer'}} >Forgot Password ?</p>
            </form>
          </div>
        ) 
      }
    </div>
  )
}

export default SignIn