import { useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const SignUn = () => {
    const [isShowed, setIsShowed] = useState(false)
    return (
        <div className='flex justify-center items-center h-screen'>
            <div
                className="duration-300 shadow-2xl dark:shadow-gray-200/10 rounded-lg lg:w-[60rem] lg:h-[45rem] md:w-[45rem] md:h-[42rem]  mx-3 sm:mx-10 border border-slate-200 dark:border-slate-700 flex justify-between"

            >
                <motion.div
                    className='px-10 md:py-20 py-10 flex flex-col justify-center items-center md:gap-y-7 gap-y-6 lg:w-1/2 w-full'
                    initial={window.innerWidth >= 1024 && { x: 500 }} // Slide-in only on large screens
                    animate={{ x: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 className='font-semibold capitalize lg:text-5xl md:text-4xl text-3xl text-center'>register</h1>
                    <p className='text-center text-sm md:text-base capitalize'>Share your thoughts and connect with others by creating posts and interacting with the <b>DevFlow</b> community.</p>
                    <form className='space-y-4 w-full'>
                        <div className='space-y-3'>
                            <label htmlFor="name" className='capitalize font-semibold md:text-base text-sm'>name <b className='text-red-500'>*</b></label>
                            <input type="text" className='w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black' id='name' />
                        </div>
                        <div className='space-y-3'>
                            <label htmlFor="email" className='capitalize font-semibold md:text-base text-sm'>email <b className='text-red-500'>*</b></label>
                            <input type="email" className='w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black' id='email' />
                        </div>
                        <div className='space-y-3'>
                            <label htmlFor="password" className='capitalize font-semibold md:text-base text-sm'>password <b className='text-red-500'>*</b></label>
                            <div className='relative flex items-center'>
                                <input type={isShowed ? "text" : "password"} className='w-full rounded bg-slate-300 dark:bg-slate-100 md:py-2 py-1.5 px-4 outline-none dark:text-black' id='password' />
                                <button onClick={() => setIsShowed(!isShowed)} type='button' className='absolute right-3 text-black'>
                                    {isShowed ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                </button>
                            </div>
                        </div>
                        <button className='bg-slate-700 text-white md:py-4 py-3 md:text-base text-sm rounded-md w-full capitalize duration-200 hover:bg-slate-800'>sign in</button>
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
        </div>
    )
}

export default SignUn