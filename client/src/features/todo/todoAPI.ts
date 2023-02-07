import { Todo, CreateTodoDto, UpdateTodoDto } from './todo.types';
import api from '../../app/api';

export function findAll(): Promise<Todo[]> {
  return api.get('/todos').then((response) => response.data as Todo[]);
}

export function create(createTodoDto: CreateTodoDto): Promise<Todo> {
  return api
    .post('/todos', createTodoDto)
    .then((response) => response.data as Todo);
}

export function update(
  id: string,
  updateTodoDto: UpdateTodoDto,
): Promise<Todo> {
  return api
    .put(`/todos/${id}`, updateTodoDto)
    .then((response) => response.data as Todo);
}

export function remove(id: string): Promise<Todo> {
  return api.delete(`/todos/${id}`).then((response) => response.data as Todo);
}
