import { Link } from "react-router";

const Error404 = () => {
  return (
    <>
      <div className=" flex flex-col items-center min-h-screen w-full mt-12">
        <h1 className="text-3xl font-bold">Error 404</h1>
        <p className="text-lg">Page not found</p>
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

export default Error404;
