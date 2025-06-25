import { ChangeEvent, FormEvent, useState } from "react";
import { IUserData } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../api/services/authService";
import { setToken } from "../../store/features/auth";

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IUserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = await loginUser(formData);
    if (token) {
      dispatch(setToken(token));
      localStorage.setItem("token", token);
      // console.log(token);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};
