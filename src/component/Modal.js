import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {db, auth} from '../firebase'
import {setDoc, doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

const Modal = ({openModal,list}) => {

  
  

  //  close modal

  

  

  

  const addtocart = async () => {
    try {
      await setDoc(doc(db, auth.currentUser.email, uuidv4()), {name: list.name, price: list.price, cartNumber: 1})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={ openModal === false ? 'offModal' : 'modal' }>
      <FaTimes style={{position: 'absolute', top: '10px', right: '10%', fontSize: '25px', color: 'wheat'}}/>
      <img src={list.img} alt='img' />
      <p>{list.name}</p>
      <p>Price: ${list.price}</p>
      <p>{list.description}</p>

      <span onClick={addtocart}>Add to Cart</span>

    </div>
  )
}

export default Modal