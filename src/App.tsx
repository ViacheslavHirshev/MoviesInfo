import { AuthPage } from "./pages/AuthPage/AuthPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { MainPage } from "./pages/MainPage/MainPage";
import { setIsLoggedIn } from "./store/features/auth";
import { useEffect } from "react";

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const expire = sessionStorage.getItem("token_exp");
    const isTokenValid = token && expire && Date.now() < Number(expire);

    if (isTokenValid) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch]);

  return <>{isLoggedIn ? <MainPage /> : <AuthPage />}</>;
};

export default App;
