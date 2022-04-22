import './App.css';
import { useState, useEffect } from 'react'
import Header from './component/Header';

import { BrowserRouter as Router ,Routes, Route } from "react-router-dom"
import Cart from './component/Cart';
import Home from './component/Home';
import Payment from './component/Payment';
import SignInSignOut from './component/SignInSignOut'
import { onAuthStateChanged } from 'firebase/auth'
import {auth, db} from './firebase'
import {query, collection, onSnapshot} from 'firebase/firestore'
import CheckOut from './component/CheckOut';

function App() {

  const [users, setUsers] = useState(null)
  onAuthStateChanged(auth, (user)=> {
    setUsers(user)
  })
  
  return (

    <div>
      {
        !users ? (<SignInSignOut/>) : (
          <Router>
            <Routes>
                <Route path='/' element = { <Home /> } />
                <Route path='/header' element = { <Header /> } />
                <Route path='cart' element={ <Cart /> }/>
                <Route path='cart' element={ <Payment/> }/>
                <Route path='checkout' element={ <CheckOut /> }/>
            </Routes>
          </Router>
        ) 
      }
    </div>
  );
}

export default App;
