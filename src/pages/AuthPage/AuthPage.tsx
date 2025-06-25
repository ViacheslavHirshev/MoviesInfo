import { LoginForm, RegForm } from "../../components/Authorization";

export const AuthPage = () => {
  return (
    <div className="auth-page">
      <RegForm />
      <LoginForm />
    </div>
  );
};
