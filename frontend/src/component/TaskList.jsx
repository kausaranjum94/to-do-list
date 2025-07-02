import { useEffect , useState} from "react";
import {Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Paper} from "@mui/material"
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

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
        setForm({
            title: task.title || "",
            description: task.description || "",
            completed: typeof task.completed === "string" ? task.completed : "", // or convert boolean to string if needed
            createdAt: task.createdAt
            ? typeof task.createdAt === "string"
                ? task.createdAt.slice(0, 10)
                : new Date(task.createdAt).toISOString().slice(0, 10)
            : ""
        });
    }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5", // optional, for contrast
      }}
    >
        <Container maxWidth="sm" sx={{mt: 4, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" align="center" gutterBottom>Task List</Typography>

                <TaskForm form={form} handleChange={handleChange} handleFormSubmit={handleFormSubmit} editId={editId} error={error}/>
                <Box sx={{display: "flex", gap: 2, width: "100%", flexWrap: "wrap", justifyContent: "center"}}>
                    {   taskList.length === 0 ? (
                        <Typography align="center">Task Not Found</Typography>
                    ) :(
                            taskList.map((task) => {
                                
                                return (
                                    
                                        <TaskItem key={task._id} task={task} onDelete={handleTaskdeletion} OnEdit={handleTaskedit}/>
                                    
                                )
                            })
                        )
                    }
                </Box>

        </Container>
    </Box>
    
  )  
}

export default TaskList;