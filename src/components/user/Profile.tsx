import { useAppSelector } from "lib/store"
import { BiMailSend, BiUser } from "react-icons/bi"
import { RiCake2Fill } from "react-icons/ri"

const Profile = () => {
    const { user } = useAppSelector(state => state.user)
    console.log(user?.created_at)
    return (
        <div className="flex-col-reverse my-5 items-center flex relative h-full">
            <div className="dark:bg-gray-950 bg-gray-200 shadow-2xl dark:border-none border justify-center p-5 rounded-2xl w-[95%] h-72 md:-translate-y-32 -translate-y-28 flex items-end">
                <ul className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 lg:w-full w-fit gap-y-5  lg:place-items-center">
                    <li className="flex items-center gap-x-2 text-sm text-gray-500 "><RiCake2Fill className="md:size-8 size-5" /> {new Date(user!.created_at).toLocaleDateString()}</li>
                    <li className="flex items-center gap-x-2 text-sm text-gray-500 "><BiMailSend className="md:size-8 size-5" /> {user?.email}</li>
                    <li className="flex items-center gap-x-2 text-sm text-gray-500 "><RiCake2Fill className="md:size-8 size-5" /> {new Date().toLocaleDateString()}</li>
                </ul>
            </div>
            <div className="flex flex-col items-center space-y-6 z-0">
                <BiUser className="dark:bg-dark border-[0.8rem] lg:size-32 md:size-28 size-24 rounded-full p-3 dark:border-[#212121] dark:text-white bg-slate-100 border-white" />
                <h2 className="lg:text-3xl text-2xl capitalize dark:text-gray-700">{user?.name}</h2>
            </div>
        </div>
    )
}

export default Profile