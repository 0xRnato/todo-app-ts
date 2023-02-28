import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Todo, CreateTodoDto, UpdateTodoDto } from './todo.types';
import { create, findAll, remove, update } from './todoAPI';

export interface TodoState {
  todoList: Todo[];
  isLoading: boolean;
  error: any;
}

const initialState: TodoState = {
  todoList: [],
  isLoading: false,
  error: null,
};

export const findAllTodos = createAsyncThunk('todo/findAll', async () => {
  const response = await findAll();
  return response;
});

export const createTodo = createAsyncThunk(
  'todo/create',
  async (createTodoDto: CreateTodoDto) => {
    const response = await create(createTodoDto);
    return response;
  },
);

export const updateTodo = createAsyncThunk(
  'todo/update',
  async (params: { id: string; updateTodoDto: UpdateTodoDto }) => {
    const { id, updateTodoDto } = params;
    const response = await update(id, updateTodoDto);
    return response;
  },
);

export const editTodo = createAsyncThunk(
  'todo/edit',
  async (params: { id: string; editing: boolean }) => {
    const { id, editing } = params;
    const response = await update(id, updateTodoDto);
    return response;
  },
);

export const removeTodo = createAsyncThunk(
  'todo/remove',
  async (id: string) => {
    const response = await remove(id);
    return response;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    //find all
    [findAllTodos.pending as unknown as string]: (state) => {
      state.isLoading = true;
    },
    [findAllTodos.fulfilled as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [findAllTodos.rejected as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    // create
    [createTodo.pending as unknown as string]: (state) => {
      state.isLoading = true;
    },
    [createTodo.fulfilled as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.todoList = [...state.todoList, action.payload];
    },
    [createTodo.rejected as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    //update
    [updateTodo.pending as unknown as string]: (state) => {
      state.isLoading = true;
    },
    [updateTodo.fulfilled as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.todoList = state.todoList.map((item) => {
        if (item._id === action.payload._id) return action.payload;
        return item;
      });
    },
    [updateTodo.rejected as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    //delete
    [removeTodo.pending as unknown as string]: (state) => {
      state.isLoading = true;
    },
    [removeTodo.fulfilled as unknown as string]: (state, action) => {
      state.isLoading = false;
      const index = state.todoList.findIndex(
        (todo) => todo._id === action.payload._id,
      );
      state.todoList.splice(index, 1);
    },
    [removeTodo.rejected as unknown as string]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const selectTodoList = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer;
