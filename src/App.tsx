import SignIn from "@components/auth/SignIn"
import SignUp from "@components/auth/SignUp"
import NavBar from "@components/NavBar"
import { cn } from "lib/cn"
import { useAppDispatch, useAppSelector } from "lib/store"
import { useEffect } from "react"
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { resetState } from "slice/authSlice"
import { setTheme } from "slice/themeSlice"

const App = () => {
  const theme = useAppSelector(state => state.theme)
  const { user } = useAppSelector(state => state.user)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const protectedRoutes = ["/profile"]
  useEffect(() => {
    dispatch(resetState());
  }, [pathname, dispatch]);
  return (
    <div className={cn("dark:bg-[#212121] dark:text-white bg-white relative h-screen",
      theme.value
    )}>
      <button onClick={() => dispatch(setTheme(theme.value === "light" ? "dark" : "light"))} className={cn("absolute top-2.5 right-5 dark:border-[#494949] rounded-lg p-3 dark:hover:bg-[#171717] lg:dark:bg-transparent dark:bg-[#171717] hover:bg-gray-300 duration-300 border z-10",
        !["/sign-in", "/sign-up"].includes(pathname) && "hidden"
      )}>
        {theme.value === "light" ? <PiMoonStarsFill /> :
          <PiSunDimFill />}
      </button>
      <NavBar />
      <Routes>
        {!user ? (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* Redirect any other routes to sign-in if not authenticated */}
            {protectedRoutes.map(route => (
              <Route path={route} key={route} element={<Navigate to="/sign-in" replace />} />
            ))}
          </>
        ) : (
          <>
            <Route path="/" element={<h1>hi</h1>} />
            <Route path="/profile" element={<h1>hi p</h1>} />
            <Route path="/sign-in" element={<Navigate to="/" replace />} />
            <Route path="/sign-up" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App