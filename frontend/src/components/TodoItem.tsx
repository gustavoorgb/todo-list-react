import { useState } from "react";
import type { Task as TaskType } from "../features/todo/services/todoService";

type Task = TaskType;

interface TodoItemProps {
    task: Task,
    // As funções agora são assíncronas e recebem o objeto Task ou o ID
    toggleTaskCompletion: (task: Task) => Promise<void>,
    removeTask: (id: number) => Promise<void>,
    updateTaskTitle: (id: number, newTitle: string) => Promise<void>; // Propriedade para edição
}

function TodoItem({task, toggleTaskCompletion, removeTask, updateTaskTitle}: TodoItemProps){
    
    const [isEditing, setIsEditing] = useState(false);
    // Usa o título da tarefa como estado inicial
    const [editText, setEditText] = useState(task.title);

    // Handler para alternar status
    const handleToggle = () => {
        // Só alterna se não estiver editando
        if (!isEditing) {
            toggleTaskCompletion(task);
        }
    }

    // Handler para remoção
    const handleRemove = () => {
        removeTask(task.id);
    }
    
    // Handler para salvar o título editado e sair do modo de edição
    const handleSave = async () => {
        const trimmedText = editText.trim();
        
        if (trimmedText && trimmedText !== task.title) {
            // Chama a função do pai para atualizar a API e o estado
            await updateTaskTitle(task.id, trimmedText);
        } else {
             // Se o texto estiver vazio ou inalterado, reverte e sai do modo edição
             setEditText(task.title); 
        }
        setIsEditing(false);
    }

    // Handler para teclas (Enter para salvar, Escape para cancelar)
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(task.title); // Reverte para o título original
            setIsEditing(false);
        }
    }
    
    // Determina a classe de status
    const statusClass = task.isCompleted ? "line-through text-gray-500" : "text-white";
    
    return(
        <li className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow-md transition duration-200 hover:bg-gray-700">
            {isEditing ? (
                // Modo Edição
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave} // Salva ao perder o foco (ex: clique fora)
                    onKeyDown={handleKeyPress}
                    autoFocus
                    className="flex-1 bg-gray-700 text-white p-1 rounded border border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 mr-2"
                />
            ) : (
                // Modo Visualização
                <span 
                    onClick={handleToggle} // Toggle completion
                    onDoubleClick={() => setIsEditing(true)} // Inicia edição no double click
                    className={`flex-1 cursor-pointer text-lg truncate ${statusClass}`}
                    title={task.title + " (Double click to edit)"}
                >
                  {task.title}
                </span>
            )}
            
            {/* Botão Deletar (com ícone SVG) */}
            <button 
                className="ml-4 text-red-500 hover:text-red-400 p-1 rounded-full transition duration-150 shrink-0" 
                onClick={handleRemove}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
            </button>
        </li>
    );
}

export default TodoItem;