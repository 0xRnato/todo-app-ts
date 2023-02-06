import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Todo } from './todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@Inject('TODO_MODEL') private readonly todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDto);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, {
      returnOriginal: false,
    });
  }

  async delete(id: string) {
    return this.todoModel.findByIdAndRemove(id);
  }
}
