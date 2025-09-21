import { Link } from "react-router";

const Error403 = () => {
  return (
    <>
      <div className=" flex flex-col items-center min-h-screen w-full mt-12">
        <h1 className="text-3xl font-bold">Error 403</h1>
        <p className="text-lg">You don't have permission to access this page</p>
        <Link
          to="/"
          className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
        >
          Go back
        </Link>
      </div>
    </>
  );
};

export default Error403;
