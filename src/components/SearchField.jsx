import React from 'react'

function SearchField({onSearchingHandler}) {
  return (
    <input type='search' placeholder='search here' onChange={onSearchingHandler}/>
  )
}

export default SearchField