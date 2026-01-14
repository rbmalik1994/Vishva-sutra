export type TodoStatus = 'pending' | 'in-progress' | 'done';
export type Todo = {
    id: string;
    title: string;
    content?: string;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;
};
export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};
export type CreateTodoRequest = Pick<Todo, 'title' | 'content' | 'status'>;
export type UpdateTodoRequest = Partial<CreateTodoRequest> & {
    id: string;
};
export type ApiResponse<T> = {
    data: T;
    error?: string;
};
//# sourceMappingURL=index.d.ts.map