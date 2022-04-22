import React, {useState} from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'

const SignInSignOut = () => {
    const [openSignUp, setOpenSignUp] = useState(false);

    const openSign = () => {
        setOpenSignUp( open => {
            return !open
        } )
    }

    const googleSign = ()=> {
      try {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
      } catch (error) {
        alert(error)
      }
    }


  return (
    <div className='sign-inOut'>
      <div className='sign-header'>
        <h1>FFP</h1>
        <p>Fiber Fat Protein</p> 
        <p style={{fontSize: '13px'}}>(Natural food your body need)</p>
      </div>

        
        <div className = 'outIns'>

        { openSignUp === true ? <SignUp/> : <SignIn/> }

        <div className='no-account-yet'>
          <div className='no-account-yets'>
            <p>Don't have an account yet ?</p>
            <button className={ openSignUp === true ? 'hideSignUpWithEmail' : '' } onClick={openSign}>Sign Up with email</button><br></br>
            <button onClick={googleSign}>Sign In with Google</button><br></br>
            <button onClick={()=> {signInAnonymously(auth)}}>Sign In Anonymous</button>
          </div>
        </div>
        <p className='mypars'>Sign In Anonymous will limit what you can do using this app , Woulb nice
                to sign in with google or Sign Up using email. Thank You.
            </p>
        
        
        

        </div>

        
        

    </div>
  )
}

export default SignInSignOut