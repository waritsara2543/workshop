import React, { useCallback, useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

type IdType = Todo["id"];

const Todo = (props: {
  todo: Todo;
  remove: () => void;
  update: (todoId: IdType, updates: Partial<Todo>) => void;
}) => {
  const { todo, remove, update } = props;
  return (
    <div>
      <input
        value={todo.title}
        onChange={(e) => update(todo.id, { title: e.target.value })}
      />
      <button onClick={() => remove()}>Remove</button>
      <input
        type="checkbox"
        checked={todo.done}
        onClick={() => update(todo.id, { done: !todo.done })}
      />
    </div>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string | null>(null);

  const createTodo = useCallback(
    (todo: Todo) => setTodos((todos) => [...todos, todo]),
    [setTodos]
  );
  const updateTodo = useCallback(
    (todoId: IdType, updates: Partial<Todo>) =>
      setTodos((todos) =>
        todos.map((t) => (t.id !== todoId ? t : { ...t, ...updates }))
      ),
    [setTodos]
  );
  const removeTodo = useCallback(
    (todoId: IdType) =>
      setTodos((todos) => todos.filter((t) => t.id !== todoId)),
    [setTodos]
  );

  return (
    <div>
      <div>
        {todos.map((t) => (
          <Todo
            key={t.id}
            todo={t}
            update={updateTodo}
            remove={() => removeTodo(t.id)}
          />
        ))}
      </div>
      <input
        value={newTodo || ""}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      {newTodo && (
        <button
          onClick={() => {
            const newId = Math.random();
            createTodo({ id: newId, title: newTodo, done: false });
            setNewTodo(null);
          }}
        >
          Add{" "}
        </button>
      )}
    </div>
  );
};

export default Todos;
