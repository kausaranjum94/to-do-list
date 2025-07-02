import {Box, TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Paper} from "@mui/material"

const TaskForm = ({form, handleChange, handleFormSubmit, editId, error}) => {
  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{mb: 3}} >
        <TextField fullWidth margin="normal" label="Title" name="title" value={form.title} placeholder="Add Title" onChange={handleChange} />

        <TextField fullWidth margin="normal" label="Description" multiline rows={2} name="description" value={form.description} placeholder="Add Description" onChange={handleChange} />
        <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="completed" value={form.completed} onChange={handleChange} label="Status"> 
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Process">In Process</MenuItem>
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="Skipped">Skipped</MenuItem>
            </Select>
        </FormControl>

        
        <TextField fullWidth margin="normal" type="date" name="createdAt" value={form.createdAt} placeholder="date" onChange={handleChange}/>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:2}}>{editId ? "Update Task" : "Add Task"}</Button>
        {error && <Typography color="error">{error}</Typography>}
    </Box>
  )
}

export default TaskForm;