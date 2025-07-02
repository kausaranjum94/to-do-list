import {Button, Paper, Typography, Box} from "@mui/material"

const TaskItem = ({task, onDelete, OnEdit}) => {
    const {_id, title, description, createdAt, completed } = task;
  return (
     <Paper key={_id} sx={{p: 2, mb: 2, width: "42%"}}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{description}</Typography>
        <Typography>{new Date(createdAt).toLocaleString()}</Typography>
        <Typography>Status: {completed}</Typography>
        <Box sx={{mt:1}}>
            <Button variant="outlined" color="error" size="small" sx={{mr:2}} onClick={() => onDelete(_id)}>Delete</Button>
            <Button variant="outlined"color="primary" size="small" onClick={() => OnEdit(task)}>Edit</Button>
        </Box>
    </Paper>
  )
}

export default  TaskItem;