import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Moment from 'moment';

export const AddTask = ({onAdd}) => {
    const date =Moment().format('YYYY-MM-DD');

    const[title,setText]=useState('')
    const[dueDate,setDate]=useState(date.toString())
    const[isDone,setIsDone]=useState(false)
    const onSubmit=(e)=>{
        e.preventDefault()

        if(!title){
            alert('add task text');
            return;
        }
        
        const id=uuidv4();
        onAdd({todoId: id,id,title,dueDate,isDone})

        setText('');
        setDate(date.toString());
        setIsDone(false);

    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task:</label>
                <input type='text' placeholder='AddTask' value={title} onChange={(e)=>setText(e.target.value)} />

            </div>

            <div className="form-control">
                <label>Date:</label>
                <input type='date' placeholder='AddDate'  value={dueDate} onChange={(e)=>setDate(e.target.value)}/>

            </div>

            <div className="form-control">
                <label>IsDone:</label>
                <input type='checkbox' value={isDone} checked={isDone} onChange={(e)=>setIsDone(e.currentTarget.checked)} />

            </div>
            
            <input type='submit' placeholder='Add'valur='save task' />
        </form>
    )
}
