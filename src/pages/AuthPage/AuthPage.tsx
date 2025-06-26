import { LoginForm, RegForm } from "../../components/Forms";

export const AuthPage = () => {
  return (
    <div className="auth-page">
      <RegForm />
      <LoginForm />
    </div>
  );
};
