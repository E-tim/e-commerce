import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'
import {query, doc, collection, onSnapshot, deleteDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from '../firebase'

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([])
  useEffect(()=>{
    const getCart = () => {
      try {
        let q = query(collection(db, auth.currentUser.email))
        onSnapshot(q, (snapS)=> {
          return setCart(snapS.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
      } catch (error) {
        alert(error)
      }
    }
    getCart()
  },[])
  
  let totalAmount = cart.reduce((prevPrice, currentPrice)=> prevPrice + currentPrice.price, 0)
  

  //  onclick button for increase the item
  const increaseFigure = async (id, cartNumber, price) => {
    await updateDoc(doc(db, auth.currentUser.email, id), {
      cartNumber: cartNumber + 1
    })
    await updateDoc(doc(db, auth.currentUser.email, id), {
      price: Number(price) * (Number(cartNumber) + 1)
    })
  }
  //  onclick button for decerase the item
  const decreaseFigure = async (id, cartNumber, price) => {
    if (cartNumber === 1) {
      alert(`You can't have less than one cart`)
    } else {
      await updateDoc(doc(db, auth.currentUser.email, id), {
        cartNumber: cartNumber - 1
      })
      await updateDoc(doc(db, auth.currentUser.email, id), {
        price: Number(price) / (Number(cartNumber) )
      })
    }

  }


  
 

  // delete cart

  const deleteCart = async (id) => {
    await deleteDoc( doc(db, auth.currentUser.email, id))
  }
  
  return (
    <div className='carts'>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      {
        cart.map(cart=> {
          return (
            <div className='cart' key={cart.id}>
              <ul>
                <li>{cart.name}</li>
                <li>${cart.price}</li>
              </ul>
              <div className='spanDiv'>
                <span onClick={()=> {decreaseFigure(cart.id, cart.cartNumber, cart.price)}}> - </span>
                <p style={{marginTop: '5px'}}>{cart.cartNumber}</p>
                <span className='secondSpan' onClick={()=> {increaseFigure(cart.id, cart.cartNumber, cart.price)}} > + </span>
              </div>
              <FaTimes onClick={()=> {deleteCart(cart.id)}} style={{marginTop: '7px', color: 'red', fontSize: '23px'}}/>

            </div>
          )
        })
      }
      </div>
      
      <div>
      {
        totalAmount === 0 ? (<p style={{textAlign: 'center', padding: '20px' ,marginTop: '30px', backgroundColor: 'lightseagreen', color: 'white'}}>You have no cart yet</p>) : (
          <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '10px'}}>
        
            <p style={{textAlign: 'center', backgroundColor: 'lightgreen', padding: '10px', color: 'white'}}>Total Price including tax ${totalAmount}</p>
            <p onClick={()=> {navigate('/checkout')}} style={{backgroundColor:'black', color: 'white', padding: '10px', cursor: 'pointer'}}>CheckOut</p>
          </div>
        )
      }
      </div>
      

    </div>
  )
}

export default Cart