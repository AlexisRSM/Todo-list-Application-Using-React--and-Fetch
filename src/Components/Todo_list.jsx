import { useState,useEffect } from 'react';
import './Styles/toDo.css'

function Todo_list() {
const [tasks, setTasks] = useState([]); 
const [newTask,setNewTask] = useState("");

function handleInputChange (event){
    setNewTask(event.target.value);
}

function addTask(){
    if(newTask.trim() !==""){
        setTasks(t=>[...t,newTask]);
        setNewTask("");

    }
}
function deleteTask(index){
    const updatedTasks = tasks.filter((_,i)=> i!== index);
    setTasks(updatedTasks);
}
function moveTaskUp(index){ //Swap Value in Array indexes
    if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
        setTasks(updatedTasks);
    }
}
function moveTaskDown(index){
    if(index < tasks.length-1){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
        setTasks(updatedTasks);
    } 
}
const handleKeyPress = (event)=>{
    if(event.key === 'Enter'){
        addTask();
    }
}
//Todo with Fetch
//const [taks_from_fetch,setTasksFromFetch] = useState([]);
function deleteAllTasks () {
    const emptyTaks = [];
    setTasks(emptyTaks);
}
//Fetch data
async function fetchData () {
    const response = await fetch ("https://playground.4geeks.com/todo/users/Ralfe",{
       /*  method: 'POST' */ //GET?
    });
    response.ok ? console.log("Sucessfull Fetch!") : console.log("Big Error",response.status);
    
    const jsonData = await response.json();

    /* console.log(response);
    console.log(jsonData); */
    
    //Convert Object to Array?
    const tasksArray= Object.values(jsonData.todos);
    console.log(tasksArray);

    setTasks(tasksArray);
    /* let newtry=Object.keys(jsonData.todos).map((key)=>[key,obj[key]]);
    console.log("this is new try",newtry);
     */
    
}
async function createToDo () {
    const newTask={label: newTask,
                    is_done: false
    }
    
    const createResponse = await fetch ("https://playground.4geeks.com/todo/todos/Ralfe",{
        method:'POST'
    });
    createResponse.ok ? console.log("Task Created  Sucessfully!") : console.log("Task Not Created!",createResponse.status);
    
    const jsonData = await createResponse.json();

    console.log("Create Response",createResponse);
    console.log(jsonData);
    addTask();
   /*  setTasks(jsonData.todos); */

    
    
}
useEffect(()=>{
    fetchData();
},[])

    return (
        <>
            <div className="row py-2 mt-3"><h1>To Do List 🖊️:</h1></div>
            <div className="row List">
                <div className="col-4"></div>
                <div className="col-4 d-flex">
                    <input 
                    type="text" placeholder="Write your Tasks Here..."
                    value={newTask} 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className='form-control me-2'/>
                    <button className="btn Add-button btn-primary"
                    style={{fontFamily:"Times"}} onClick={createToDo} >
                        Add
                    </button>
                </div>
                <div className="col-4"> <button 
                className='btn Delete-All btn-danger mx-2 fs-4'
                style={{fontFamily:"Times"}}
                onClick={deleteAllTasks}
                >Clean All Tasks 🚮</button></div>
            </div>
            <div className="row mt-4">
                <ol>
                    {tasks.length === 0 ?(
                        <li>No Tasks, add a task!</li>
                    ) : (
                    tasks.map((task,index) =>
                        <li key={index} className="task-item py-1">
                            <span className="text px-4 fs-5">{task.label}</span>
                                <button
                                className="delete-button me-2"
                                onClick={()=>deleteTask(index)}
                                >Delete</button>
                                <button
                                className="move-button me-2"
                                onClick={()=>moveTaskUp(index)}
                                >⬆️</button>
                                <button
                                className="move-button me-2"
                                onClick={()=>moveTaskDown(index)}
                                >⬇️</button>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default Todo_list;