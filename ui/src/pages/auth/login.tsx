import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/use-auth-store";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    userInput: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, error, loading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(loginForm);

      navigate("/verify");
    } catch (error) {
      console.error("Login failed.", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Login</h2>

      <form onSubmit={handleLogin} className="w-full">
        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            User input:
          </label>
          <input
            required
            type="text"
            id="userInput"
            name="userInput"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
            value={loginForm.userInput}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="passwordInput" className="block mb-1">
            Password:
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
            value={loginForm.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="w-full mb-3 px-3 py-3 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white rounded focus:outline-none"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="flex w-full text-left">
        <p>Don't have an account?&nbsp;</p>

        <Link to="/register">
          <p className="font-semibold text-indigo-500 hover:text-indigo-600">
            Register
          </p>
        </Link>
      </div>
    </>
  );
};

export default Login;
