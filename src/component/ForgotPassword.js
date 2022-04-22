import React, { useState } from 'react'
import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../firebase'



const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = useState('')
    const resetPassword = async (e) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, resetEmail)
        } catch (error) {
            alert(error)
        }
        alert('Reset link has been sent to your email')
        
    }
  return (
    <div className='sign-in-out'>
        <form onSubmit={resetPassword}>
            <label>Email:</label><br></br>
            <input type='email' placeholder='Email to recieve reset link'  onChange={(e)=> {setResetEmail(e.target.value)}}/><br></br>
            <button type='submit'>Send</button><br></br>
        </form>

    </div>
  )
}

export default ForgotPassword