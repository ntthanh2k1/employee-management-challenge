import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth/use-auth-store";
import { Link } from "react-router";

const Profile = () => {
  const [profileForm, setProfileForm] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
  });

  const { updateProfile, authUser, loading, error } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateProfile(profileForm);
  };

  useEffect(() => {
    if (authUser) {
      setProfileForm({
        name: authUser.name || "",
        username: authUser.username || "",
        phoneNumber: authUser.phoneNumber || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-3">Profile</h1>
        <div className="flex flex-col items-center justify-center w-full px-10 py-3 border rounded">
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-1/2">
                <div className="mb-2">
                  <label htmlFor="name" className="block mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={profileForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phoneNumber" className="block mb-1">
                    Phone number:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={profileForm.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <div className="mb-2">
                  <label htmlFor="username" className="block mb-1">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={profileForm.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block mb-1">
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    value={profileForm.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex gap-2">
              <button
                type="submit"
                className="mb-3 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white rounded focus:outline-none"
              >
                {loading ? "Loading..." : "Save"}
              </button>

              <Link to="/">
                <button className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
