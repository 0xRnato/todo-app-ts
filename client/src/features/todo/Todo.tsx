import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  findAllTodos,
  createTodo,
  updateTodo,
  removeTodo,
  selectTodoList,
} from './todoSlice';

export function Todo() {
  //todo list
  const todoList = useAppSelector(selectTodoList);
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = useState({ name: '' });
  const [error, setError] = useState('');

  // dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validate = () => {
    const _error = newTodo.name
      ? ''
      : 'The task description is required.';
    setError(_error);
    return _error;
  };
  const handleCreate = () => {
    if (!validate()) {
      dispatch(createTodo(newTodo));
      setOpen(false);
      setNewTodo({ name: '' });
    }
  };

  useEffect(() => {
    dispatch(findAllTodos());
  }, [dispatch]);

  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 500,
          margin: '50px auto 0',
        }}
      >
        {todoList.map((todo) => {
          const labelId = `checkbox-list-label-${todo._id}`;
          return (
            <ListItem
              key={todo._id}
              secondaryAction={
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      style={{ marginRight: 10 }}
                      onClick={() =>
                        dispatch(
                          updateTodo({
                            id: todo._id,
                            updateTodoDto: {
                              name: 'new name',
                            },
                          }),
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(removeTodo(todo._id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() =>
                  dispatch(
                    updateTodo({
                      id: todo._id,
                      updateTodoDto: {
                        completed: !todo.completed,
                      },
                    }),
                  )
                }
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  disableTypography
                  primary={
                    <Typography variant="body2" style={{ color: '#FFF' }}>
                      {todo.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              required
              variant="standard"
              value={newTodo.name}
              onChange={(e) => setNewTodo({ name: e.target.value })}
              {...(error && { error: true, helperText: error })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
