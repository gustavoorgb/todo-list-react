// src/features/auth/components/RegisterForm.tsx
import { useState } from "react";
import { useAuth } from "../services/authService";

export default function RegisterForm() {
  const {register} = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await register({ name, email, password });
      window.location.href = "/todos"; 
    } catch {
      setError("Erro ao cadastrar usuário");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg p-2 mb-3"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg p-2 mb-3"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded-lg p-2 mb-3"
        required
      />
      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border rounded-lg p-2 mb-4"
        required
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Cadastrar
      </button>
    </form>
  );
}
