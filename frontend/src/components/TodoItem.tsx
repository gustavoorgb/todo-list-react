import type { Todo } from "../types/Todo";

interface TodoItemProps {
    todo: Todo,
    checkTodo: (id: number) => void,
    removeTodo: (id: number) => void,
}

function TodoItem({todo, checkTodo, removeTodo}: TodoItemProps){
    
    return(
        <li className="flex justify-between items-center bg-gray-800 p-2 rounded">
            <span onClick={() => checkTodo(todo.id)} className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.title}
            </span>
            <button className="text-red-500 hover:text-red-700" onClick={() => removeTodo(todo.id)}>
              X
            </button>
        </li>
    );
}

export default TodoItem;