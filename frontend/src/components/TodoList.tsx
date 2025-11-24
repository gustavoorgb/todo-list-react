import { useState } from "react";
import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const [text, setText] = useState("");

    const addTodo = () => {
        if(!text.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            title: text,
            completed: false,
        }

        setTodos([...todos, newTodo]);
        setText("");
    }
    
    const checkTodo = (id: number) => {
        setTodos(item => 
            item.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            
            )
        );
    }

    const removeTodo = (id: number) => {
        setTodos(item => item.filter(todo => todo.id !== id));
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-gray-900 text-white rounded">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            <div className="flex gap-2 mb-4">
                <input className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded" placeholder="New task..." value={text} onChange={e => setText(e.target.value)}/>
                <button onClick={addTodo} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Add
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map(todo => (
                <TodoItem todo={todo} checkTodo={checkTodo} removeTodo={removeTodo}/>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;