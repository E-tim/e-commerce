import React, { useState } from 'react'
import Modal from './Modal'

const ItemList = ({list}) => {
  const [openModal, setOpenModal] = useState(false)

  // open modal
  const onclickModal = () => {
    setOpenModal( opens => {
      return !opens
    } )
  }

  
  return (
    <div className='itemList' onClick={onclickModal}>
        <div className='subItemList'>
            <img src={list.img} alt='foodImage'/>
            <p>{list.name}</p>
            <p>Price: ${list.price}</p>
        </div>
        <Modal openModal = {openModal} list = {list}/>
    </div>
  )
}

export default ItemList