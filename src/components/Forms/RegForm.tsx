import { FormEvent, useState } from "react";
import { INewUserData } from "../../types/types";
import { registerUser } from "../../api/services/authService";

export const RegForm = () => {
  const [formData, setFormData] = useState<INewUserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("❌Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData);
      // console.log(response);

      if (response.status === 1) {
        setMessage("Registration succesfull ✅");
      } else {
        setMessage("Registration failed ⚠️");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("❌Error: " + err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reg-form">
      <input
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
        pattern="^[A-Za-z ]*$"
        required
      />
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        pattern="^[A-Za-z\d]{4,}$"
        required
      />

      <button type="submit">Create account</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};
