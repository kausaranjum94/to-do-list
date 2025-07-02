import { use } from "react";
import { useEffect , useState} from "react";

const TaskList = () => {

    const [taskList, setTaskList] = useState([]);
    const [error, setError] = useState(null);
    const [form, setForm]= useState({title: "", description: "", completed: "", createdAt: ""});
    const [editId, setEditId] = useState(null);

    const fetchTaskList = async () => {
        try{
            const data =  await fetch("http://localhost:5555/");
            if(!data.ok) throw new Error("Faild to fetch tasks");
            const taskResponse = await data.json();
            setTaskList(taskResponse);

        }catch(error){
            setError(error.message);
        }
    }

    useEffect( () => {
        fetchTaskList();
    }, [])

    const handleTaskdeletion = async (taskId) => {
        console.log("Task Id:", taskId);
        try{
            const response = await fetch(`http://localhost:5555/${taskId}`, {
                method : "DELETE",
                headers: {"Content-Type" : "application/json"},
            })
            if(!response.ok) throw new Error("Faild to delete task");
            await fetchTaskList();
        }catch(error){
            setError(error.message);
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value} )
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try{
            if(editId){
                const response = await fetch(`http://localhost:5555/${editId}`, {
                    method : "PUT",
                    headers: {"content-type" : "application/json"},
                    body: JSON.stringify(form),
                });
                if(!response.ok) throw new Error("Failed to edit task");
            } else {
                const response = await fetch("http://localhost:5555/", {
                    method : "POST",
                    headers: {"content-type" : "application/json"},
                    body: JSON.stringify(form),
                });

                if(!response.ok) throw new Error("Failed to add Task");
            }

            setForm({title: "", description: "", completed: "", createdAt: ""});
            setEditId(null);
            await fetchTaskList();

        }catch(error){
            setError(error.message);
        }
    }

    const handleTaskedit = (task) => {
        setEditId(task._id);
        setForm({title: task.title, description: task.description, completed: task.completed, createdAt: task.createdAt});
    }

  return (
    <>
        <div>
            <h1>Task List</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="title" value={form.title} placeholder="Add Title" onChange={handleChange} />
                <textarea type="textarea" name="description" value={form.description} placeholder="Add Description" onChange={handleChange} />
                <select name="completed" vlaue={form.completed} onChange={handleChange}> 
                    <option vlaue="">Select Status</option>
                    <option vlaue="Completed">Completed</option>
                    <option vlaue="In Process">In Process</option>
                    <option vlaue="Not Started">Not Started</option>
                    <option vlaue="Skipped">Skipped</option>
                </select>
                <input type="date" name="createdAt" value={form.createdAt} placeholder="date" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {   taskList.length === 0 ? (
                <p>Task Not Found</p>
            ) :(
                    taskList.map((task) => {
                        return (
                            <div key={task._id}>
                                <p>{task.title}</p>
                                <p>{task.description}</p>
                                <p>{new Date(task.createdAt).toLocaleString()}</p>
                                <p>Status: {task.completed}</p>
                                <button onClick={() => handleTaskdeletion(task._id)}>Delete</button>
                                <button onClick={() => handleTaskedit(task)}>Edit</button>
                            </div>
                        )
                    })
                )
            }
        
        </div>
    </>
  )  
}

export default TaskList;