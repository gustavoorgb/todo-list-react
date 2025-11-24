// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import Todo from "../pages/Todo";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todos" element={<PrivateRoute element={<Todo />}/>} />
      </Routes>
    </BrowserRouter>
  );
}
