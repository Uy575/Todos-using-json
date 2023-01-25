import React from 'react'

function DeleteButton({onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='font'>
    ❌
   </button>
  )
}

export default DeleteButton