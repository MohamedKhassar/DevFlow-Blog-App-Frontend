import { cn } from "lib/cn"
import { useAppDispatch, useAppSelector } from "lib/store"
import { useEffect, useRef, useState } from "react"
import { BiLoader, BiSearch } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import { MdOutlineMenu } from "react-icons/md"
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi"
import { Link, useLocation } from "react-router-dom"
import { setTheme } from "slice/themeSlice"
import Menu from "./Menu"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { logout } from "slice/authSlice"
import { AnimatePresence, motion } from "framer-motion"

const NavBar = () => {
    const { pathname } = useLocation()
    const theme = useAppSelector(state => state.theme)
    const [isUserMenu, setIsUserMenu] = useState(false)
    const [isOpened, setIsOpened] = useState(false)
    const { user, isLoading } = useAppSelector(state => state.user)
    const protectedRoutes = ["/profile"];
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsUserMenu(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    useEffect(() => {
        const handleResize = () => {
            if (innerWidth <= 1024) {
                setIsUserMenu(false)
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        setIsUserMenu(false)
    }, [pathname])
    return (
        <div className={
            cn((["/sign-in", "/sign-up"].includes(pathname) || protectedRoutes.includes(pathname) && !user) && "hidden" ? "hidden" : "flex",
                "h-20 lg:px-10 px-20 z-10 md:justify-between justify-center  items-center duration-300 relative top-0 bg-white dark:bg-dark w-full"
            )}>
            <div className="flex items-center gap-5">
                <button onClick={() => setIsOpened(!isOpened)}>
                    {isOpened ? <IoClose className="lg:hidden md:size-6 size-5" /> : <MdOutlineMenu className="lg:hidden md:size-6 size-5" />}

                </button>
                <Link to={"/"} className='font-bold lg:text-3xl md:text-2xl text-xl w-1/5'>DevFlow</Link>
            </div>
            <div className="md:flex hidden w-[40%] justify-center gap-x-4 items-center relative z-0">
                <input className="border dark:border-slate-500 w-full border-gray-400 rounded lg:p-2 p-1 z-10 bg-slate-200 dark:bg-gray-800/20 outline-none appearance-none" type="text" placeholder="Search..." />
                <BiSearch className="absolute right-[0rem] border-gray-400  border p-2 cursor-pointer w-fit dark:hover:bg-[#374151] hover:bg-[#6b7588] z-10 duration-300 rounded-r h-full dark:bg-transparent bg-white" size={25} />
            </div>
            <div className="flex gap-x-10 justify-center
             items-center">
                {
                    !isLoading ?
                        user ?
                            <div className="relative hidden lg:block" ref={ref}>
                                <button onClick={() => setIsUserMenu(!isUserMenu)} className="bg-purple-800/50 dark:bg-purple-950/50 rounded-full p-3 cursor-pointer border-2 border-purple-900 duration-300 hover:border-purple-800">
                                    <FaUser className="size-5" />
                                </button>
                                <AnimatePresence>
                                    {
                                        isUserMenu &&
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1, transition: { duration: .2, ease: "linear" } }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: .1, ease: "linear" } }}
                                            className="absolute p-5 w-64 space-y-3 dark:bg-black backdrop-blur dark:border-none border right-0 rounded-lg top-full my-3 shadow-2xl">
                                            <div className="p-2.5 hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300">
                                                <h2>{user.name}</h2>
                                            </div>
                                            <hr className="border-gray-600" />
                                            <div className="capitalize space-y-2 flex flex-col">
                                                <Link className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"/profile"}>
                                                    profile
                                                </Link>
                                                <Link className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"newPost"}>
                                                    create a post
                                                </Link>
                                                <Link className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"settings"}>
                                                    settings
                                                </Link>
                                            </div>
                                            <hr className="border-gray-600" />
                                            <button onClick={() => dispatch(logout())} className="p-2.5 hover:bg-red-800/80 hover:text-white rounded-lg capitalize duration-300 w-full text-left flex items-center justify-between">sign out <FaSignOutAlt /></button>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            :
                            <div className="lg:grid hidden grid-cols-2 gap-x-5">
                                <Link to={"/sign-in"}>
                                    <button className="border-none hover:border hover:no-underline underline underline-offset-4 rounded-md p-3 capitalize dark:hover:bg-[#636f81]/40 hover:bg-cyan-800/60 hover:text-white dark:hover:border-[#374151]  duration-300  w-full text-center">
                                        login
                                    </button>
                                </Link>
                                <Link to={"/sign-up"}>
                                    <button className="border rounded-md p-3 capitalize dark:hover:bg-[#374151] hover:bg-slate-500 hover:text-white dark:hover:border-[#374151]  duration-300 w-full text-center">
                                        sign-up
                                    </button>
                                </Link>
                            </div>
                        :
                        <BiLoader className="size-7 animate-spin  hidden lg:block" />
                }
                <button onClick={() => dispatch(setTheme(theme.value === "light" ? "dark" : "light"))} className={cn("lg:static absolute right-4 dark:border-[#494949] rounded-lg md:p-3 p-2 dark:hover:bg-[#171717] lg:dark:bg-transparent dark:bg-[#171717] hover:bg-gray-300 duration-300 border"
                )}>
                    {theme.value === "light" ? <PiMoonStarsFill /> :
                        <PiSunDimFill />}
                </button>
            </div>
            <Menu closeMenu={() => setIsOpened(false)} isOpened={isOpened} />
        </div>
    )
}

export default NavBar