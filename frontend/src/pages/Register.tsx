// src/pages/Register.tsx
import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
