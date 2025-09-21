import { Link } from "react-router";

const Register = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Register</h2>

      <form className="w-full">
        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            Name:
          </label>
          <input
            required
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            Username:
          </label>
          <input
            required
            type="text"
            id="userName"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            Phone number:
          </label>
          <input
            required
            type="text"
            id="phoneNumber"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            Email:
          </label>
          <input
            required
            type="text"
            id="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="userInput" className="block mb-1">
            Password:
          </label>
          <input
            required
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="passwordInput" className="block mb-1">
            Confirm password:
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mb-3 px-3 py-3 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white rounded focus:outline-none"
        >
          Register
        </button>
      </form>

      <div className="flex w-full text-left">
        <p>Already have an account?&nbsp;</p>

        <Link to="/login">
          <p className="font-semibold text-indigo-500 hover:text-indigo-600">
            Login
          </p>
        </Link>
      </div>
    </>
  );
};

export default Register;
