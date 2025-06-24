import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useAppSelector } from "./store/hooks";
import { MainPage } from "./pages/MainPage/MainPage";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return <>{!isLoggedIn ? <AuthPage /> : <MainPage />}</>;
}

export default App;
