import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/use-auth-store";
import { useState } from "react";
import { VerifyDto } from "../../api/auth-api";

const Verify = () => {
  const [verifyForm, setVerifyForm] = useState({
    email: "",
    accessCode: "",
  });
  verifyForm.email = localStorage.getItem("login_email");
  const navigate = useNavigate();
  const { verify, error, loading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVerifyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const verifyData: VerifyDto = {
        email: verifyForm.email,
        accessCode: verifyForm.accessCode,
      };

      await verify(verifyData);
      navigate("/");
    } catch (error) {
      console.error("Verify failed.", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Login</h2>

      <form onSubmit={handleVerify} className="w-full">
        <div className="mb-2">
          <p className="mb-1 text-gray-700">
            Đã gửi code qua email{" "}
            <span className="font-semibold">{verifyForm.email}</span>
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="passwordInput" className="block mb-1">
            Access code:
          </label>
          <input
            required
            type="text"
            id="accessCode"
            name="accessCode"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
            value={verifyForm.accessCode}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="w-full mb-3 px-3 py-3 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white rounded focus:outline-none"
        >
          {loading ? "Loading..." : "Verify"}
        </button>
      </form>

      <div className="flex w-full text-left">
        <Link to="/login">
          <p className="font-semibold text-indigo-500 hover:text-indigo-600">
            Back
          </p>
        </Link>
      </div>
    </>
  );
};

export default Verify;
