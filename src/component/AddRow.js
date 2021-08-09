import React from 'react';
import {FaTimes} from 'react-icons/fa'

const TodoRow=( { todo , onDelete , onToggle})=>(
  

    <li  >
      <div className={`todoTitle ${todo.isDone ? 'checked':''}`} onClick={()=>onToggle(todo.id)}>      {todo.title} </div>
      <div className="todoDate">      {todo.dueDate} </div>
      {/* <div>{todo.isDone.toString()}</div> */}
      <FaTimes style={{cursor:'pointer'}} onClick={()=>onDelete(todo.id)} />
    </li>
 )
 export default TodoRow;