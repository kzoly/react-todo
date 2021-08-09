import './App.css';
import React,{useState,useEffect} from 'react'
import TodoRow from './component/AddRow';
import { AddTask } from './component/AddNewRow';
import {BiSearchAlt } from 'react-icons/bi'
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  const [filter,filterSet]=useState("");
  const[showAddTask,setShowAddTask]=useState(true);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://610e4a9848beae001747baa4.mockapi.io/myapptodo2")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  
  
  
  //add task

  const addTask=(task)=>{
    //add to list
   setItems([...items,task])
   //add to file
    const requestOptions = {
      method: 'POST',
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json',},
      body: JSON.stringify(task)
    };
    fetch('https://610e4a9848beae001747baa4.mockapi.io/myapptodo2', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', task);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  function deleteData(item, url) {
    return fetch(url + '/' + item, {
      method: 'delete'
    })
    .then(response => response.json());
  }
  //delete item task
  const deleteItem = (id) =>{
    setItems(items.filter((item)=>item.id!==id));
    deleteData(id,'https://610e4a9848beae001747baa4.mockapi.io/myapptodo2');
  }


  
  //  toggle reminder
  const toggleReminder=(id) => {
    setItems(items.map((item) => item.id===id ? { ...item,isDone:!item.isDone } : item))
    update(id)
  }
  
  function update(id){

    const datas= items.find(element => element.id ===id);
    //console.log(datas)
    datas.isDone=!datas.isDone;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json',},
      body: JSON.stringify(datas)
    };
    fetch(`https://610e4a9848beae001747baa4.mockapi.io/myapptodo2/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', datas);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  //console.log(items);


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
     <>
     <h1>ReactJS Todo List</h1>
      <div className="tablebody">
        <BiSearchAlt className="searchIcon" style={{marginLeft:"45px",width:"30px",height:"30px",marginBottom:"-10px"}}/>
        <input 
            className="searchBar"
            value={filter}
            placeholder="search"
            onChange={(evt)=>filterSet(evt.target.value)}
          />
        <button className="showHideTask" text="Add" onClick={()=>setShowAddTask(!showAddTask)}>Add task</button>

        {showAddTask  &&   <div className="newTodo">  
            
           <label>Add new toodo</label>
           <AddTask onAdd={addTask}/>
          
          </div> 
        }
        <ul>
            {items
              .filter((item)=>item.title.toLowerCase().includes(filter.toLowerCase()))
              .map(item => ( 

                  <TodoRow todo={item} key={item.id} onDelete={deleteItem} onToggle={toggleReminder} />
                  
                ))}
        </ul> 
        
        
        {items.length>0?(''):('No item to show')}

        

      </div>    
        
       
      </>
    );
  }

}

export default App;
