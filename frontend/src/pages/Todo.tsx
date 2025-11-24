import TodoList from "../components/TodoList";

export default function Todo() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto p-6 rounded-xl shadow-2xl shadow-gray-800">
        <TodoList />
      </div>
    </div>
  );
}