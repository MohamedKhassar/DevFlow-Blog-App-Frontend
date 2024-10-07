import { cn } from "lib/cn"
import { useAppDispatch, useAppSelector } from "lib/store"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import { MdOutlineMenu } from "react-icons/md"
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi"
import { Link, useLocation } from "react-router-dom"
import { setTheme } from "slice/themeSlice"
import Menu from "./Menu"

const NavBar = () => {
    const { pathname } = useLocation()
    const theme = useAppSelector(state => state.theme)
    const [isOpened, setIsOpened] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <div className={
            cn(["/sign-in", "/sign-up"].includes(pathname) ? "hidden" : "flex",
                "h-20 lg:px-10 px-20 z-0 shadow-2xl shadow-gray-500/20 md:justify-between justify-center  items-center duration-300 sticky top-0 bg-white dark:bg-dark w-full"
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
            <div className="flex gap-x-10
             items-center">
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