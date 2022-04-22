import React, {useState, useEffect} from 'react'
import {FaCartArrowDown, FaUser, FaSignOutAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {auth, db} from '../firebase'
import {signOut} from 'firebase/auth'
import { query, doc, onSnapshot, collection } from  'firebase/firestore'

const Header = () => {

  const logOut = async () => {
    await signOut(auth)
  }

  const [userName, setUserName] = useState('Anonymous')

  useEffect(()=> {
    const getUser = async ()=> {
      let userRef = doc(db, 'userCollection', auth.currentUser.uid)
      let q = query( userRef )
      onSnapshot(q, (messageSnap)=> {
        setUserName( !auth.currentUser.displayName ? messageSnap.data().username : auth.currentUser.displayName)
        // console.log(messageSnap.data().username)
      })
    }
    getUser()
  }, [])

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

  let cartLenght = cart.length;
  

  
  let navigate = useNavigate();
  const [toggleUser, setToggleUser] = useState(false);
  const togUser = ()=> {
    setToggleUser( togg => {
      return !togg
    } )
  }

  return (
    <div className='header'>
        <h1>FFP</h1>
        <div className='subHeader'>
            <FaCartArrowDown onClick={()=> { navigate('/cart') }} style={{color: 'gray', fontSize: '30px'}}/>
            <div style={{position: 'relative'}}>
              <FaUser onClick={togUser} style={{color: 'gray', fontSize: '25px'}}/>
              <div className={ cartLenght === 0 ? 'hideCart' : '' }>
              <p style={{position: 'absolute', top: '17px', fontSize: '11px', backgroundColor: 'black', padding: '0 2px', color: 'white', fontWeight: 'bolder', right: '35px'}}>{cartLenght}</p>
              </div>
            </div>
        </div>
        <div className={ toggleUser ? 'userDetails' : 'hideUserDetails' }>
          <p style={{fontSize: '18px', color: 'white'}}>{userName}</p>
          <FaSignOutAlt onClick={logOut} style={{marginTop: '10px', fontSize: '25px', color: 'green'}}/>
        </div>
    </div>
  )
}

export default Header