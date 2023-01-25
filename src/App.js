import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import ModalUpdate from "./components/ModalUpdate";
import DeleteButton from "./components/DeleteButton";
import SearchField from "./components/SearchField";

function App() {
  // initilizing variables

  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [userValue, setUserValue] = useState("");
  const tempTodos = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue,setFilterValue] = useState(todo)

  // fetching data first time from json

  const fetching = async () => {
    const req = await fetch("http://localhost:3001/todos");
    const res = await req.json();
    setTodo(res);
  };

  // sending first time fetching data function to use effect

  useEffect(() => {
    fetching();
  }, []);

  // adding new data to the list and fecting again

  const postData = async () => {
    if (newTodo !== "") {
      const response = await axios.post("http://localhost:3001/todos", {
        name: newTodo,
      });

      setTodo([...todo, response.data]);
    }
  };

  tempTodos.current = postData;

  //  running use effect when adding new todo

  useEffect(() => {
    tempTodos.current();
  }, [newTodo]);

  //  submiting value to list

  const submit = (e) => {
    e.preventDefault();
    setNewTodo(userValue);
    setUserValue("");
  };

  // deleting item from list

  const deletingItem = async (id) => {
    const response = await axios.delete(`http://localhost:3001/todos/${id}`);
    setFilterValue([response.data]);
    fetching();
  };

  // getting on change value from search field

  const onSearching = (event) => {
    const searchValues = event.target.value.toLocaleLowerCase();
    setSearchValue(searchValues);
  };

  // filtering user search value
  useEffect(()=>{
    const filterTodo = todo.filter((F) => {
      return F.name.toLocaleLowerCase().includes(searchValue.trim());
    });
     setFilterValue(filterTodo)
  },[todo,searchValue])

  return (
    <div className="App">
      {/* search field component */}

      <SearchField onSearchingHandler={onSearching} />

      {/* Adding item to list form  */}

      <Form
        onSubmitHandler={submit}
        value={userValue}
        onChangeHandler={(e) => {
          setUserValue(e.target.value);
        }}
      />

      {/* making list  */}
       

      {

       filterValue.length !== 0 ?(
        
       filterValue.length > 0 &&
        filterValue.map((m) => {
          return (
            <h1
            key={m.id}
            
            // inline css for todo card 
            
            style={{
              width: "30rem",
              margin: "1rem auto",
              border: "2px solid skyBlue",
              backgroundColor: "skyBlue",
              fontSize: "1.5rem",
                paddingTop: "0.5rem",
              }}
              >
              {m.name}

              {/* making modal on update button  */}

              <ModalUpdate m={m} setTodo={setFilterValue} fetch={fetching} />

              {/* making delete button  */}

              <DeleteButton onClickHandler={() => deletingItem(m.id)} />
            </h1>
          );
        }) 
        ):(
          <h1>No Match</h1>
        )
      }   
    </div>
  );
}

export default App;
