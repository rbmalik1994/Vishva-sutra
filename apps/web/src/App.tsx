import React, { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Input, Textarea, useTheme } from '@vishva-sutra/ui';
import { createTodo, deleteTodo, listTodos, updateTodo } from './data';
import { Todo } from '@vishva-sutra/interfaces';

const FILTERS = ['all', 'pending', 'in-progress', 'done'] as const;
type Filter = (typeof FILTERS)[number];

export function App() {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>('all');
  const [editing, setEditing] = useState<Todo | null>(null);

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: listTodos
  });

  const createMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content?: string }) => createTodo({ title, content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Pick<Todo, 'title' | 'content' | 'status'>> }) =>
      updateTodo(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });

  const filteredTodos = useMemo(() => {
    if (!todosQuery.data) return [] as Todo[];
    if (filter === 'all') return todosQuery.data;
    return todosQuery.data.filter((todo) => todo.status === filter);
  }, [todosQuery.data, filter]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = (formData.get('title') as string) ?? '';
    const content = (formData.get('content') as string) ?? '';
    if (!title.trim()) return;

    if (editing) {
      updateMutation.mutate({ id: editing.id, updates: { title, content } });
      setEditing(null);
    } else {
      createMutation.mutate({ title: title.trim(), content });
    }
    event.currentTarget.reset();
  };

  const busy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <main id="main" className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Accessible Todo/Notes</p>
          <h1 className="text-2xl font-semibold">Vishva Sutra</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label={`Toggle theme, current ${theme}`}
            className="border border-border"
          >
            Toggle theme
          </Button>
        </div>
      </header>

      <Card aria-live="polite">
        <form className="space-y-3" onSubmit={handleSubmit} aria-label="Add or edit todo">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="title">
              Title <span aria-hidden="true">*</span>
            </label>
            <Input id="title" name="title" required aria-required="true" placeholder="Write a clear title" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="content">
              Details
            </label>
            <Textarea id="content" name="content" rows={3} placeholder="Extra context" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" aria-label="Filter todos">
              {FILTERS.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={filter === value ? 'primary' : 'outline'}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <Button type="submit" disabled={busy} aria-busy={busy}>
              {editing ? 'Update' : 'Add'}
            </Button>
          </div>
          {editing ? (
            <p className="text-sm text-muted-foreground" role="status">
              Editing item "{editing.title}" — submit to save or select another item to edit.
            </p>
          ) : null}
        </form>
      </Card>

      <section aria-label="Todo list" className="space-y-3">
        {todosQuery.isLoading ? <p>Loading todos…</p> : null}
        {filteredTodos.length === 0 && !todosQuery.isLoading ? (
          <p className="text-muted-foreground">No todos yet. Add your first one above.</p>
        ) : null}
        {filteredTodos.map((todo) => (
          <Card key={todo.id} className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-base font-semibold">{todo.title}</p>
              {todo.content ? <p className="text-sm text-muted-foreground">{todo.content}</p> : null}
              <p className="text-xs text-muted-foreground">Status: {todo.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setEditing(todo)} aria-label={`Edit ${todo.title}`}>
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => updateMutation.mutate({ id: todo.id, updates: { status: 'done' } })}
                aria-label={`Mark ${todo.title} as done`}
              >
                Mark done
              </Button>
              <Button
                variant="ghost"
                onClick={() => deleteMutation.mutate(todo.id)}
                aria-label={`Delete ${todo.title}`}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
