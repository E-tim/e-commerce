import React, { useState } from 'react'
import { itemList } from './itemArray'
import ItemList from './ItemList';

const FilterItem = () => {
    const [search, setSearch] = useState('');

    const filterList = !search ? itemList : itemList.filter( item => 
            item.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
        <div className='filterItem'>
          <input type='search' onChange={(e)=> {setSearch(e.target.value)}} placeholder='search here' />
        </div>

        <div className='filterList'>

          {
              filterList.map( list => {
                  return <ItemList key={list.id} list = {list}/>
              } )
          }
        </div>
    </div>
  )
}

export default FilterItem