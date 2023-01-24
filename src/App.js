
import { useEffect, useState,useRef} from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import ModalUpdate from './components/ModalUpdate'
// import UpdateButton from './components/UpdateButton';
import DeleteButton from './components/DeleteButton';

function App() {
  
  const [todo,setTodo] = useState([])
  const [newTodo,setNewTodo] = useState("")
  const [userValue,setUserValue] = useState("")
  const tempTodos = useRef();

  const fetching = async ()=>{

   const req = await fetch('http://localhost:3001/todos')
   const res = await req.json();
   setTodo(res)
  }
 
  useEffect(()=>{
  fetching()
  },[])



  const postData = async () => {
    if(newTodo!==""){
      const response = await axios.post('http://localhost:3001/todos', {
        name: newTodo
      }); 
      
      setTodo([...todo,response.data])
    
    }

  }

   tempTodos.current = postData
   
   
   useEffect(()=>{
     tempTodos.current()
    },[newTodo])
    
    
       const submit = e =>{
          e.preventDefault()
          setNewTodo(userValue)
          setUserValue("")
       }

       const deletingItem = async (id) =>{
        const response = await axios.delete(`http://localhost:3001/todos/${id}`);
        setTodo([response.data]);
        fetching()
       }



  return (
    <div className="App">
        
        <Form onSubmitHandler={submit} value = {userValue} onChangeHandler={(e)=>{
               setUserValue(e.target.value)
           }}/>
      {
        todo.length > 0 &&  todo.map((m)=>{
         return <h1 key={m.id} style={{width:"30rem",margin:"1rem auto",border:"2px solid green",backgroundColor:"yellow",fontSize:"1.5rem",padding:"0.5rem"}}>{m.name}
          <ModalUpdate m={m}  setTodo ={setTodo} fetch ={fetching}/>
          <DeleteButton  onClickHandler={()=>deletingItem(m.id)} />
          </h1>
        })
      }
    </div>
  );
}

export default App;
