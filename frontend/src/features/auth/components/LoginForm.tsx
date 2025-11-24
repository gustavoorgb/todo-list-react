import { useState } from "react";
import { login } from "../services/authService";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
        await login({email, password });
        window.location.href = "/todos"; 
        } catch {
          setError("Erro ao logar usúario!");
        }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}
