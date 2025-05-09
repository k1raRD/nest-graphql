import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del Tiempo', done: false },
    { id: 3, description: 'Piedra del espacio', done: true },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id  ${id} not found`);

    return todo;
  }

  create({ description }: CreateTodoDto) {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.description = description;
    this.todos.push(todo);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const { done, description } = updateTodoDto;
    const todo = this.findOne(id);

    if (done !== undefined) todo.done = done;
    if (description !== undefined) todo.description = description;

    this.todos = this.todos.map((dbTodo) => {
      if (dbTodo.id === id) return todo;
      return dbTodo;
    });

    return todo;
  }

  remove(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
