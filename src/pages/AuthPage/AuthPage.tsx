import { Box } from "../../components/Box";
import { LoginForm, RegForm } from "../../components/Forms";

export const AuthPage = () => {
  return (
    <Box className="auth-page">
      <RegForm />
      <LoginForm />
    </Box>
  );
};
