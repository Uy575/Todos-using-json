import React from 'react'

function UpdateButton({onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='font'>
    📔 update
    </button>
  )
}

export default UpdateButton