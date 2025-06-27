import { ChangeEvent, FormEvent, useState } from "react";
import { IUserData } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../api/services/authService";
import { setIsLoggedIn } from "../../store/features/auth";

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IUserData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const token = await loginUser(formData);
    if (token) {
      sessionStorage.setItem("token", token);
      const expireTimeStamp = Date.now() + 12 * 60 * 60 * 1000;
      sessionStorage.setItem("token_exp", expireTimeStamp.toString());
      dispatch(setIsLoggedIn(true));
    } else {
      setError("❌User doesn't exist");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        pattern="^[A-Za-z\d]{4,}$"
        required
      />

      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};
