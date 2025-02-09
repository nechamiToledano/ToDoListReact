import React, { useEffect, useState } from "react";
import { Container, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, Paper } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import service from "./service.js";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await service.addTask(newTodo);
    setNewTodo("");
    await getTodos();
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo List
        </Typography>
        <form onSubmit={createTodo} style={{ display: "flex", gap: "10px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <IconButton type="submit" color="primary" size="large">
            <AddIcon />
          </IconButton>
        </form>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} divider>
              <Checkbox
                edge="start"
                checked={todo.isComplete}
                onChange={(e) => updateCompleted(todo, e.target.checked)}
              />
              <ListItemText primary={todo.name} sx={{ textDecoration: todo.isComplete ? "line-through" : "none" }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
