import { useState,useEffect } from 'react';
import './Styles/toDo.css'

//Note in feth functions could also use axios instead of async await;

function Todo_list() {
const [tasks, setTasks] = useState([]); 
const [newTask,setNewTask] = useState("");

const URL="https://playground.4geeks.com/todo/users/Ralfe";

function handleInputChange (event){
    setNewTask(event.target.value);
}

function moveTaskUp(index){ //Swap Value in Array indexes
    if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
        setTasks(updatedTasks);
        //make a post? with this order?
    }
}

function moveTaskDown(index){
    if(index < tasks.length-1){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
        setTasks(updatedTasks);
        //make a post? with this order?
    } 
}
const handleKeyPress = (event)=>{
    if(event.key === 'Enter'){
        createToDo();
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
    const response = await fetch (URL,{
    });
    response.ok ? console.log("Sucessfull Fetch!") : console.log("Big Error",response.status);
    const jsonData = await response.json();
     /* console.log(response); */
    console.log(jsonData);
    const tasksArray= jsonData.todos;
    /* console.log(tasksArray); */
    setTasks(tasksArray);    
}
async function createToDo () {
    const newTaskFetch={label: newTask,
                    is_done: false
    }
    const createResponse = await fetch ("https://playground.4geeks.com/todo/todos/Ralfe",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskFetch)
    });
    createResponse.ok ? console.log("Task Created  Sucessfully!") : console.log("Task Not Created!",createResponse.status);
    if(newTask.trim() !==""){
        setTasks(t=>[...t,newTask]);
        setNewTask("")
    };
    //------------------------Debug---------------------
    /* const jsonData = await createResponse.json(); */
    /* console.log("Create Response",createResponse);
    console.log(jsonData); */
    //---------------------------------------------------
    fetchData();
}

//Trying to use index to delete
async function deleteTaskFetch(index){
    let response = await fetch(`https://playground.4geeks.com/todo/todos/${index}`, {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    response = await response.text();
    console.log(response);
    fetchData();
}
async function deleteAllTasks () {
    //Another Way to Do it but it would cause dataloss of other things.
    /*  const response_delete_user = await fetch("https://playground.4geeks.com/todo/users/Ralfe",{
        method: 'DELETE'
    });
    response_delete_user = await response_delete_user.text();
    console.log(response_delete_user);

    const response_create_user = await fecth ("",{
        method: 'POST'
    });
    response_create_user = await response_create_user.text();
    console.log(response_create_user); */
    const deleteAll = tasks.map(item => fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
        method: "DELETE"
    })
    );
    await Promise.all(deleteAll);
    setTasks([]);
}

useEffect(()=>{
    fetchData();
},[])

    return (
        <>"
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
                                onClick={()=>deleteTaskFetch(task.id)}
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
