import { FormEvent, useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RegisterUserType } from 'types'
import { useAppDispatch, useAppSelector } from 'lib/store'
import { registerUser } from 'slice/authSlice'
import { BiLoader } from 'react-icons/bi'
import { cn } from 'lib/cn'
import Lottie from 'lottie-react'
import CheckMark from "../../lottie/CheckMark.json"
const SignUn = () => {
    const [isShowed, setIsShowed] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState<RegisterUserType>({
        name: "mohamed",
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
            const isSuccess = await dispatch(registerUser(user))
            if (isSuccess.meta.requestStatus === "fulfilled") {
                setIsSignIn(true)
                setTimeout(() => {
                    setIsSignIn(false)
                    navigate("/sign-in")
                }, 3000)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='relative flex justify-center items-center h-full flex-col gap-y-5 py-10'>
            <Link to={"/"}><h1 className='font-bold lg:text-4xl md:text-2xl text-xl'>DevFlow</h1></Link>
            <div
                className=" duration-300 shadow-2xl dark:shadow-gray-200/10 rounded-lg lg:w-[60rem] lg:h-[45rem] md:w-[45rem] md:h-[42rem]  mx-3 sm:mx-10 border border-slate-200 dark:border-slate-700 flex justify-between"

            >
                <motion.div
                    className='px-10 md:py-20 py-10 flex flex-col justify-center items-center md:gap-y-5 gap-y-4 lg:w-1/2 w-full'
                    initial={window.innerWidth >= 1024 && { x: 500 }} // Slide-in only on large screens
                    animate={{ x: 0 }}
                    transition={{ duration: .8 }}
                >
                    <h1 className='font-semibold capitalize lg:text-4xl md:text-3xl text-2xl text-center'>register</h1>
                    <p className='text-center text-xs md:text-sm capitalize'>Share your thoughts and connect with others by creating posts and interacting with the <b>DevFlow</b> community.</p>
                    <form onSubmit={handleSubmit} className='space-y-4 w-full'>
                        <div className='space-y-3'>
                            <label htmlFor="name" className='capitalize font-semibold md:text-base text-sm'>name <b className='text-red-500'>*</b></label>
                            <input onChange={handleUserChange} value={user.name} name='name' type="text" className={cn('w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black',
                                !user.name && error && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20",
                                error?.toLowerCase()?.includes("name") && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20"
                            )} id='name' />
                        </div>
                        <div className='space-y-3'>
                            <label htmlFor="email" className='capitalize font-semibold md:text-base text-sm'>email <b className='text-red-500'>*</b></label>
                            <input value={user.email} onChange={handleUserChange} name='email' type="email" className={cn('w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black',
                                !user.email && error && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20",
                                error?.toLowerCase()?.includes("email") && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20"
                            )} id='email' />
                        </div>
                        <div className='space-y-3'>
                            <label htmlFor="password" className='capitalize font-semibold md:text-base text-sm'>password <b className='text-red-500'>*</b></label>
                            <div className='relative flex items-center'>
                                <input value={user.password} onChange={handleUserChange} name='password' type={isShowed ? "text" : "password"} className={cn('w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black',
                                    !user.password && error && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20",
                                    error?.toLowerCase()?.includes("password") && "ring-2 ring-red-600 shadow-red-600 dark:text-white shadow-md duration-300 bg-red-100/50 dark:bg-red-300/20"
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
                            <button className='bg-slate-700 text-white md:py-4 py-3 md:text-base text-sm rounded-md w-full capitalize duration-200 hover:bg-slate-800 flex justify-center disabled:cursor-not-allowed' disabled={isLoading}>{isLoading ? <BiLoader className='animate-spin w-full' /> : "register"}</button>
                        </div>
                        <div className='relative flex justify-center items-center'>
                            <hr className='w-full' />
                            <p className='absolute dark:bg-[#212121] bg-white p-1 capitalize'>or</p>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                            <button className='lg:shadow-2xl dark:shadow-gray-200/10 shadow-lg md:p-4 p-3 flex justify-center border border-slate-200 dark:border-slate-700 dark:bg-gray-700 rounded-md'>
                                <FaGoogle size={20} />
                            </button>
                            <button className='lg:shadow-2xl dark:shadow-gray-200/10 shadow-lg md:p-4 p-3 flex justify-center border border-slate-200 dark:border-slate-700 dark:bg-gray-700 rounded-md'>
                                <BsGithub size={20} />
                            </button>
                            <p className='dark:text-white text-slate-400 lg:col-span-2 text-xs'>I already have an account ! , <Link to={"/sign-in"}><b className='capitalize underline'>sign in</b></Link></p>
                        </div>
                    </form>
                </motion.div>
                <div className='relative justify-center items-center w-1/2 lg:flex hidden bg-white dark:bg-[#212121] rounded-lg'>
                    <div className='absolute bg-black/5 h-full w-full backdrop-blur flex justify-center gap-y-9 flex-col text-white p-7 items-center rounded-r-lg'>
                        <h1 className='font-bold text-center lg:text-4xl md:text-2xl text-xl text-slate-900 -translate-y-8'>DevFlow</h1>
                        <p className='text-center md:text-sm lg:text-base text-xs'>Your go-to platform for sharing code, insights, and all things development. Streamline your thoughts, share your knowledge, and flow with the dev community.</p>
                    </div>
                    <img src="https://images.pexels.com/photos/5474282/pexels-photo-5474282.jpeg" className='object-cover h-full rounded-r-lg' draggable={false} loading='lazy' alt="" />
                </div>
            </div>
            {isSignIn &&
                <div className='absolute bg-white/40 w-screen h-screen flex items-center justify-center backdrop-blur z-50'>
                    <motion.div
                        className="md:py-6 md:px-10 border dark:border-none shadow py-5 gap-2 mx-3 dark:bg-dark dark:text-white bg-white flex flex-col items-center justify-start rounded-xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: .7, ease: "linear" } }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <Lottie
                            data-aos="fade-in" className="object-cover w-[90px] h-[90px]"
                            animationData={CheckMark}
                            loop={false}
                        />

                        <h1 className="text-[1.5rem] font-semibold font-Poppins capitalize">
                            user created successfully !
                        </h1>
                        <h2 className="lg:text-lg md:text-base text-sm space-y-2 text-center flex flex-col items-center">
                            <p className='text-nowrap'>Hello <b className='capitalize'>{user.name}</b>, Welcome to <span className='font-bold lg:text-lg md:text-base text-sm'>DevFlow</span></p>
                            <p className='w-5/6'>Now!, You can share your knowledge, and flow with the dev community.</p>
                        </h2>
                    </motion.div>
                </div>
            }        </div>
    )
}

export default SignUn