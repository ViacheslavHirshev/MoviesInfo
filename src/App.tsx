import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useAppSelector } from "./store/hooks";
import { MainPage } from "./pages/MainPage/MainPage";
import { Logo } from "./components/Logo/Logo";
import { Header } from "./components/Header/Header";

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Header>
        <Logo value="Movies" />
      </Header>
      {isLoggedIn ? <MainPage /> : <AuthPage />}
    </>
  );
};

export default App;
