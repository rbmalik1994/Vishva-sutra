import { Todo, TodoStatus } from '@vishva-sutra/interfaces';

const STORAGE_KEY = 'vishva-todos';

function now() {
  return new Date().toISOString();
}

function loadTodos(): Todo[] {
  if (typeof localStorage === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Todo[];
  } catch (error) {
    console.warn('Unable to parse todos', error);
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function listTodos(): Promise<Todo[]> {
  return loadTodos();
}

export async function createTodo(input: { title: string; content?: string; status?: TodoStatus }): Promise<Todo> {
  const todos = loadTodos();
  const todo: Todo = {
    id: crypto.randomUUID(),
    title: input.title,
    content: input.content || '',
    status: input.status || 'pending',
    createdAt: now(),
    updatedAt: now()
  };
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

export async function updateTodo(id: string, updates: Partial<Pick<Todo, 'title' | 'content' | 'status'>>): Promise<Todo | null> {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const updated: Todo = { ...todos[index], ...updates, updatedAt: now() };
  todos[index] = updated;
  saveTodos(todos);
  return updated;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const todos = loadTodos();
  const filtered = todos.filter((t) => t.id !== id);
  const changed = filtered.length !== todos.length;
  if (changed) saveTodos(filtered);
  return changed;
}
