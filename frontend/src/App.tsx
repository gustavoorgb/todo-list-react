import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
