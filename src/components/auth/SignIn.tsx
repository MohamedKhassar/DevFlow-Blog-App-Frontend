import { FormEvent, useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'lib/store'
import { cn } from 'lib/cn'
import { BiLoader } from 'react-icons/bi'
import { loginUser } from 'slice/authSlice'
import { LoginUserType } from 'types'
import { LuLoader2 } from 'react-icons/lu'

const SignIn = () => {
    const [isShowed, setIsShowed] = useState(false)
    const navigate = useNavigate()
    const [isSignIn, setIsSignIn] = useState(false)
    const [user, setUser] = useState<LoginUserType>({
        email: "mohamedkhassar775@gmail.com",
        password: "Medkh@2638",
    })
    const dispatch = useAppDispatch()
    const { isLoading, error } = useAppSelector(state => state.user)

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const isSuccess = await dispatch(loginUser(user))
            if (isSuccess.meta.requestStatus === "fulfilled") {
                setIsSignIn(true)
                setTimeout(() => {
                    setIsSignIn(false)
                    navigate("/")
                }, 3000)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='relative flex justify-center items-center h-fit flex-col gap-y-5 py-10'>
            <Link to={"/"}><h1 className='font-bold lg:text-4xl md:text-2xl text-xl '>DevFlow</h1></Link>
            <div className="duration-300 shadow-2xl dark:shadow-gray-200/10 rounded-lg lg:w-[60rem] lg:h-[45rem] md:w-[45rem] md:h-[38rem]  mx-3 sm:mx-10 border border-slate-200 dark:border-slate-700 flex justify-between">
                <motion.div
                    initial={window.innerWidth >= 1024 && { x: 500 }} // Slide-in only on large screens
                    animate={{ x: 0 }}
                    transition={{ duration: .8 }}
                    className='px-10 md:py-20 py-10 flex flex-col justify-center items-center md:gap-y-8 gap-y-6 lg:w-1/2 w-full'>
                    <h1 className='font-semibold capitalize lg:text-4xl md:text-3xl text-2xl text-center'>login</h1>
                    <p className='text-center md:text-sm text-xs '>Enter Your Email Address And Password To Access <b>DevFlow</b> Account</p>
                    <form onSubmit={handleSubmit} className='space-y-8 w-full'>
                        <div className='space-y-3'>
                            <label htmlFor="email" className='capitalize font-semibold md:text-base text-sm'>email <b className='text-red-500'>*</b></label>
                            <input onChange={handleUserChange} name='email' type="email" className={cn('w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black',
                                !user.email && error && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20",
                                (error?.toLowerCase()?.includes("email") || error?.toLowerCase()?.includes("user")) && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20"


                            )} id='email' />
                        </div>
                        <div className='space-y-3'>
                            <label htmlFor="password" className='capitalize font-semibold md:text-base text-sm'>password <b className='text-red-500'>*</b></label>
                            <div className='relative flex items-center'>
                                <input onChange={handleUserChange} name='password' type={isShowed ? "text" : "password"} className={cn('w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black',
                                    !user.password && error && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20",

                                    (error?.toLowerCase()?.includes("password") || error?.toLowerCase()?.includes("user")) && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20"
                                )} id='password' />
                                {
                                    user.password &&
                                    <button onClick={() => setIsShowed(!isShowed)} type='button' className={cn('absolute right-3 text-black',
                                        !user.password && error || error?.toLowerCase()?.includes("password") && "dark:text-white"
                                    )}>
                                        {isShowed ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                    </button>
                                }
                            </div>
                        </div>
                        <div className='space-y-3'>
                            {error && <p className={cn('text-red-600 text-justify duration-300',
                                error.toLowerCase().includes("password") && "text-sm"
                            )}>{error}</p>}
                            <button type='submit' className='bg-slate-700 text-white  md:py-4 py-3 md:text-base text-sm rounded-md w-full capitalize duration-200 hover:bg-slate-800 disabled:cursor-not-allowed' disabled={isLoading}>{isLoading ? <BiLoader className='animate-spin w-full' /> : "sign in"}</button>
                        </div>
                        <div className='relative flex justify-center items-center'>
                            <hr className='w-full' />
                            <p className='absolute dark:bg-[#212121] bg-white p-3 capitalize'>or</p>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                            <button className='lg:shadow-2xl dark:shadow-gray-200/10  shadow-lg md:p-4 p-3 flex justify-center border border-slate-200 dark:border-slate-700 dark:bg-gray-700  rounded-md'>
                                <FaGoogle size={20} />
                            </button>
                            <button className='lg:shadow-2xl dark:shadow-gray-200/10 shadow-lg md:p-4 p-3 flex justify-center border border-slate-200 dark:border-slate-700 dark:bg-gray-700 rounded-md'>
                                <BsGithub size={20} />
                            </button>
                            <p className='dark:text-white text-slate-400 lg:col-span-2 text-xs'>I don't have an account , <Link to={"/sign-up"}><b className='capitalize underline'>sign up</b></Link></p>
                        </div>
                    </form>
                </motion.div>
                <div className='relative justify-center items-center w-1/2 lg:flex hidden rounded-lg bg-white dark:bg-[#212121]'>
                    <div className='absolute bg-black/5 h-full w-full backdrop-blur flex justify-center gap-y-9 flex-col text-white p-7 items-center rounded-r-lg'>
                        <h1 className='font-bold text-center lg:text-4xl md:text-2xl text-xl text-slate-900 -translate-y-8'>DevFlow</h1>
                        <p className='text-center md:text-sm lg:text-base text-xs'>Your go-to platform for sharing code, insights, and all things development. Streamline your thoughts, share your knowledge, and flow with the dev community</p>
                    </div>
                    <img src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg" className='object-cover h-full rounded-r-lg' draggable={false} loading='lazy' alt="" />
                </div>
            </div>
            {
                isSignIn && <div className='absolute bg-white/30 backdrop-blur flex-col gap-5 z-50 w-screen h-screen flex justify-center items-center'>
                    <LuLoader2 className='animate-spin size-16 ' />
                    <p className='font-bold text-3xl capitalize text-black'>you'll be redirected to your profile</p>
                </div>}
        </div>
    )
}

export default SignIn