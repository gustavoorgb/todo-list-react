import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
