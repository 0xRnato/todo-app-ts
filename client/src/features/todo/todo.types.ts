export interface Todo {
  readonly _id: string;
  readonly name: string;
  readonly completed: boolean;
  readonly editing?: boolean;
}

export interface CreateTodoDto {
  readonly name: string;
}

export interface UpdateTodoDto {
  readonly name?: string;
  readonly completed?: boolean;
}
