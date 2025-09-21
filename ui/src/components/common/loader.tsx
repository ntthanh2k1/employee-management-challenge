import { RiLoader2Fill } from "react-icons/ri";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RiLoader2Fill className="text-3xl animate-spin text-slate-800" />
    </div>
  );
};

export default Loader;
