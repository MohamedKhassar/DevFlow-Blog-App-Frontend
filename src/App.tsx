import SignIn from "@components/auth/SignIn";
import SignUp from "@components/auth/SignUp";
import NavBar from "@components/NavBar";
import Profile from "@components/user/Profile";
import { cn } from "lib/cn";
import { useAppDispatch, useAppSelector } from "lib/store";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getUser, resetState } from "slice/authSlice";
import { setTheme } from "slice/themeSlice";
import Cookies from "universal-cookie";

// Loader component for navigation
const NavigateWithLoader = ({ to, delay = 1500 }: { to: string, delay?: number }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (loading) {
    return (
      <div className='absolute dark:bg-black/30 bg-white/30 backdrop-blur flex-col gap-5 z-50 w-screen h-screen flex justify-center items-center'>
        <LuLoader2 className='animate-spin size-10 md:size-16 dark:text-white text-purple-950' />
        <p className='font-bold md:text-3xl text-xl capitalize  dark:text-white text-black'>you'll be redirected to {to == "/" ? "home" : to.replace("/", "")} page</p>
      </div>
    );
  }

  return <Navigate relative="path" to={to} replace />;
};

const App = () => {
  const theme = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const protectedRoutes = ["/profile"];
  const cookies = new Cookies()
  const token = cookies.get("token")

  useEffect(() => {
    dispatch(resetState());
  }, [pathname, dispatch]);
  useEffect(() => {
    if (token) {
      dispatch(getUser())
    }
  }, [pathname, token, dispatch])
  return (
    <div className={cn("dark:text-white relative h-full")}>
      <button
        onClick={() => dispatch(setTheme(theme.value === "light" ? "dark" : "light"))}
        className={cn(
          "absolute top-2.5 right-5 dark:border-[#494949] rounded-lg p-3 dark:hover:bg-[#171717] lg:dark:bg-transparent dark:bg-[#171717] hover:bg-gray-300 duration-300 border z-10",
          !["/sign-in", "/sign-up"].includes(pathname) && "hidden"
        )}
      >
        {theme.value === "light" ? <PiMoonStarsFill /> : <PiSunDimFill />}
      </button>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>hsssssssssssssssssssssssi</h1>} />
        {!user ? (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {protectedRoutes.map(route => (
              <Route key={route} path={route} element={<NavigateWithLoader to="/sign-in" />} />
            ))}
          </>
        ) : (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<NavigateWithLoader to="/" />} />
            <Route path="/sign-up" element={<NavigateWithLoader to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
