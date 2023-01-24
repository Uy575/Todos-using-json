import React from 'react'

function DeleteButton({onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='font'>
    ❌ delete
   </button>
  )
}

export default DeleteButton