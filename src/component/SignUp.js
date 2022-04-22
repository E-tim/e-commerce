import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from '../firebase'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [signEmail, setSignEmail] = useState('')
  const [signPassword, setSignPassword] = useState('')


  const createUser = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword( auth, signEmail, signPassword )
      await setDoc(doc(db, 'userCollection', auth.currentUser.uid), {username: username})
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div className='sign-in-out'>
      <form onSubmit={createUser}>
        <label>Username:</label><br></br>
        <input type='text'  onChange={(e)=>{setUsername(e.target.value)}}/><br></br>
        <label>Email:</label><br></br>
        <input type='email'  onChange={(e)=> {setSignEmail(e.target.value)}}/><br></br>
        <label>Password:</label><br></br>
        <input type='password'  onChange={(e)=>{setSignPassword(e.target.value)}}/><br></br>
        <button type='submit'>SIgn Up</button>
      </form>
      
    </div>
  )
}

export default SignUp