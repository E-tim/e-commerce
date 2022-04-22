import React, { useEffect, useState } from 'react'
import {PaystackButton} from 'react-paystack'
import {doc, query, onSnapshot, collection} from 'firebase/firestore'
import {} from 'firebase/auth'
import {db , auth} from '../firebase'

const CheckOut = () => {
  const [userName, setUserName] = useState([])

  useEffect(()=> {
    const getUser = async ()=> {
      let userRef = doc(db, 'userCollection', auth.currentUser.uid)
      let q = query( userRef )
      onSnapshot(q, (messageSnap)=> {
        setUserName(messageSnap.data().username)
        // console.log(messageSnap.data().username)
      })
    }
    getUser()
  }, [])

  // getting userCart info from firebase
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

   // Total price of the items
   let totalAmount = cart.reduce((prevPrice, currentPrice)=> prevPrice + currentPrice.price, 0)


  const publicKey = 'pk_test_86ae7f27cd7e2953bdbafe5bf1985c3703abb353'
  const email = auth.currentUser ? auth.currentUser.email : '';
  // console.log(email)

  // convert the dollar to naire and convert naire to kobo
  let amounts = eval( (Number(totalAmount) * 583) * 4.54 )
  let amount = Math.round(amounts)
  console.log(amount) 

  const [userAddress, setUserAddres] = useState('')

  const componentProps = {
    email,
    amount,
    metadata: {
      userName,
      userAddress
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: ()=> alert('Your Payment was success'),
    onClose: ()=> alert(`Wait You need this don't go yet`)
    

  }
  return (
    <div className='checkout'>
      {/* <p>{totalAmount}</p>
      <p>{userName}</p> */}
      <div className='subCheckout'>
        <input type='text' placeholder='Home # , street name and City' onChange={(e)=> {setUserAddres(e.target.value)}} /><br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <PaystackButton {...componentProps} />
        </div>
        {/* <p>{amount}</p>
        <p>{userAddress}</p> */}
      </div>

    </div>
  )
}

export default CheckOut