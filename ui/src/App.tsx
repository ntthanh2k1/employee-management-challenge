import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Verify from "./pages/auth/verify";
import Home from "./pages/home/home";
import Task from "./pages/task/task";
import Message from "./pages/message/message";
import { useAuthStore } from "./store/auth/use-auth-store";
import { useEffect } from "react";
import Loader from "./components/common/loader";
import User from "./pages/user/user";
import Error403 from "./pages/error/error-403";
import Error404 from "./pages/error/error-404";
import Profile from "./pages/auth/profile";

function App() {
  const { getAuthUser, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  // có thể tối ưu bằng cách tạo component check có authUser thì trả về children không thì trả về login page
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/verify"
            element={authUser ? <Navigate to="/" /> : <Verify />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={
              authUser ? (
                authUser.role === 0 ? (
                  <User />
                ) : (
                  <Navigate to="/error-403" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks"
            element={authUser ? <Task /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={authUser ? <Message /> : <Navigate to="/login" />}
          />
        </Route>

        <Route path="/error-403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
