import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { BiLoader, BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "lib/store";
import { logout } from "slice/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

const Menu = ({ closeMenu, isOpened }: { closeMenu: () => void, isOpened: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { user, isLoading } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const tags = [
        // Programming Languages
        "JavaScript", "TypeScript", "Python", "PHP", "Ruby", "Java", "C#", "Swift",
        "Kotlin", "Rust", "Go", "C++", "HTML", "CSS",

        // Frameworks & Libraries
        "React", "Angular", "Vue.js", "Next.js", "Svelte", "Node.js", "Django",
        "Flask", "Laravel", "Ruby on Rails", "Spring Boot",

        // Tools & Platforms
        "Docker", "Kubernetes", "Git", "GitHub", "GitLab", "AWS", "Firebase",
        "Azure", "Google Cloud", "Jenkins", "Terraform", "Netlify",

        // Databases
        "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase Firestore", "Redis",
        "Elasticsearch",

        // Frontend Development
        "UI/UX Design", "CSS Grid", "Flexbox", "Tailwind CSS", "Bootstrap",
        "Responsive Design", "Web Animations", "Web Accessibility",
        "Progressive Web Apps (PWAs)",

        // Backend Development
        "REST APIs", "GraphQL", "WebSockets", "Authentication",
        "Serverless Architecture", "Microservices", "API Security",

        // DevOps & CI/CD
        "Continuous Integration", "Continuous Deployment", "Version Control",
        "Automation", "Testing", "Monitoring and Logging",

        // Software Engineering Practices
        "Clean Code", "Test-Driven Development (TDD)", "Agile Methodologies",
        "Scrum", "Pair Programming", "Code Reviews", "Refactoring",

        // Mobile Development
        "Android Development", "iOS Development", "Flutter", "React Native",
        "SwiftUI",

        // Machine Learning & AI
        "TensorFlow", "PyTorch", "Machine Learning", "Natural Language Processing (NLP)",
        "Computer Vision", "Data Science", "Big Data",

        // Miscellaneous
        "Open Source", "Web3", "Blockchain", "Cryptography", "Internet of Things (IoT)",
        "Dev Tools", "Productivity", "Career Advice", "Freelancing", "Remote Work"
    ];




    return (
        <AnimatePresence>
            {
                isOpened &&
                <div className="h-screen block lg:hidden z-50">
                    <div className='absolute top-0 h-screen w-full left-0 flex justify-start dark:bg-dark/30 bg-black/30 backdrop-blur'>

                        <motion.div
                            ref={ref}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ x: "-100%" }}
                            className="md:w-[60%] w-[80%] h-screen flex flex-col gap-x-10 lg:hidden relative
                    items-center justify-start py-8 gap-10 dark:bg-dark bg-white p-3 overflow-y-scroll max-h-screen">
                            <Link to={"/"} className='font-bold lg:text-3xl md:text-2xl text-xl'>DevFlow</Link>
                            <IoClose onClick={closeMenu} className="lg:hidden md:size-8 size-6 absolute top-2 right-5" />
                            <div className="flex md:hidden justify-center gap-x-4 items-center relative w-full">
                                <input className="border dark:border-slate-500 w-full border-gray-400 rounded lg:p-2 p-1 z-10 bg-slate-200 dark:bg-gray-800/20 outline-none appearance-none" type="text" placeholder="Search..." />
                                <BiSearch className="absolute right-[0rem] border-gray-400 border p-2 cursor-pointer w-fit dark:hover:bg-[#374151] hover:bg-[#6b7588] z-10 duration-300 rounded-r h-full dark:bg-transparent bg-white" size={25} />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>Share your thoughts and connect with others by creating posts and interacting with the <b>DevFlow</b> community.</p>
                            {
                                isLoading ?
                                    <div
                                        className="p-5 w-full space-y-3 dark:bg-black backdrop-blur dark:border-none border rounded-lg my-3 flex justify-center">
                                        <BiLoader className="size-10 animate-spin" />
                                    </div>
                                    :
                                    user ?
                                        <div
                                            className="p-5 w-full space-y-3 dark:bg-black backdrop-blur dark:border-none border rounded-lg my-3">
                                            <div className="p-2.5 hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300">
                                                <h2>{user.name}</h2>
                                            </div>
                                            <hr className="border-gray-600" />
                                            <div className="capitalize space-y-2 flex flex-col">
                                                <Link onClick={closeMenu} className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"/profile"}>
                                                    profile
                                                </Link>
                                                <Link onClick={closeMenu} className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"newPost"}>
                                                    create a post
                                                </Link>
                                                <Link onClick={closeMenu} className="p-2.5 w-full hover:bg-purple-950/80 hover:text-white rounded-lg capitalize duration-300 cursor-pointer" to={"settings"}>
                                                    settings
                                                </Link>
                                            </div>
                                            <hr className="border-gray-600" />
                                            <button onClick={() => dispatch(logout())} className="p-2.5 hover:bg-red-800/80 hover:text-white rounded-lg capitalize duration-300 w-full text-left flex items-center justify-between">sign out <FaSignOutAlt /></button>
                                        </div>
                                        :
                                        <div className="grid gap-y-5 w-full">
                                            <Link to={"/sign-in"}>
                                                <button className="border-none border underline underline-offset-4 rounded-md p-3 capitalize dark:bg-[#636f81]/40 bg-cyan-800/60 text-white dark:border-[#374151] duration-300 w-full text-center">
                                                    login
                                                </button>
                                            </Link>
                                            <Link to={"/sign-up"}>
                                                <button className="dark:border border-0 rounded-md p-3 capitalize dark:bg-[#374151] bg-slate-500 text-white dark:border-[#374151] duration-300 w-full text-center">
                                                    sign-up
                                                </button>
                                            </Link>
                                        </div>
                            }
                            <div className="w-full space-y-8">
                                <h1 className="text-xl text-start capitalize font-semibold">popular tags</h1>
                                <div className="space-y-5 flex flex-col">
                                    {tags.splice(0, 10).map((tag, index) => (
                                        <Link className="rounded-md capitalize text-cyan-900 dark:text-cyan-500 underline underline-offset-4 duration-300 w-full" to={`/tags/${tag}`} key={index}>
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            }
        </AnimatePresence>

    );
};

export default Menu;
