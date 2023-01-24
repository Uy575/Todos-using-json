import React from 'react'

function Form({onSubmitHandler,value,onChangeHandler}) {
  return (
           <form onSubmit={onSubmitHandler}>
           <input type= 'text' placeholder='enter todos' value={value} onChange={onChangeHandler}></input> 
         </form>
  )
}

export default Form