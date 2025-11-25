import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { getTasks, createTask, updateTask, deleteTask } from "../features/todo/services/todoService"
import type { Task as taskType, TaskDTO } from "../features/todo/services/todoService";

type Task = taskType; 

function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        const fetchTasks = async () => {
            try{
                setIsLoading(true);
                const data = await getTasks();
                setTasks(data);
            }catch(err){
                setError("Failed to fetch tasks. Please check your connection or authentication.");
                console.error(err);
            }finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        if(!text.trim()) return;

        try{
            const data: TaskDTO = { title: text, description: null };
            const result = await createTask(data);
            setTasks(prevTasks => [...prevTasks, result.task]);
            setText("");
        }catch(err){
            setError("Failed to create task.");
            console.error(err);
        }
    };
    
    const toggleTaskCompletion = async (task: Task) => {
        const newStatus = !task.isCompleted;
        try {
            setTasks(prevTasks => 
                prevTasks.map(t => 
                    t.id === task.id ? { ...t, isCompleted: newStatus } : t
                )
            );

            const data: TaskDTO = { isCompleted: newStatus };
            await updateTask(task.id, data);
        } catch (err) {
            setTasks(prevTasks => 
                prevTasks.map(t => 
                    t.id === task.id ? { ...t, isCompleted: !newStatus } : t
                )
            );
            setError("Failed to update task status.");
            console.error(err);
        }
    }

    const removeTask = async (id: number) => {
        try {
            setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
            await deleteTask(id);
        } catch (err) {
            setError("Failed to delete task.");
            console.error(err);
        }
    }

    const updateTaskTitle = async (id: number, newTitle: string) => {
    
    if (!newTitle.trim()) {
        setError("O título da tarefa não pode estar vazio.");
        return;
    }

    const originalTask = tasks.find(t => t.id === id);

    try {
        setTasks(prevTasks => 
            prevTasks.map(t => 
                t.id === id ? { ...t, title: newTitle } : t
            )
        );

        const data: TaskDTO = { title: newTitle };
        await updateTask(id, data);
        
        setError(null);
    } catch (err) {
        console.error("Erro ao atualizar o título da tarefa:", err);
        setError("Falha ao salvar o título da tarefa. O estado foi revertido.");

        if (originalTask) {
            setTasks(prevTasks => 
                prevTasks.map(t => 
                    t.id === id ? originalTask : t // Reverte para a tarefa original
                )
            );
        }
    }
}

    if (isLoading) {
        return (
            <div className="max-w-md mx-auto mt-10 p-4 bg-gray-900 text-white rounded text-center">
                Loading tasks...
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 p-4 bg-red-800 text-white rounded text-center">
                Error: {error}
            </div>
        );
    }
    
    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-gray-900 text-white rounded">
            <h1 className="text-2xl font-bold mb-4 text-center">Task List (API Connected)</h1>
            <div className="flex gap-2 mb-4">
                <input 
                    className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-blue-600 focus:border-blue-600" 
                    placeholder="New task title..." 
                    value={text} 
                    onChange={e => setText(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <button 
                    onClick={addTask} 
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
                >
                    Add
                </button>
            </div>
            {tasks.length === 0 && (
                <p className="text-center text-gray-500">No tasks yet. Create one!</p>
            )}
            <ul className="space-y-2">
                {tasks.map(task => (
                    // Assegure-se de que os nomes das props são consistentes
                    <TodoItem 
                        key={task.id} 
                        task={task} 
                        toggleTaskCompletion={toggleTaskCompletion} 
                        removeTask={removeTask}
                        updateTaskTitle={updateTaskTitle}/>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;