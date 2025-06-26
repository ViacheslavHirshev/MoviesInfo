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

    try {
      const responseStatus = await registerUser(formData);
      if (responseStatus === 1) {
        setMessage("Registration succesfull ✅");
      } else {
        setMessage("Already registered ⚠️");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error ❌: " + err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setMessage("");
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reg-form">
      <input
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
      <input
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Create account</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};
