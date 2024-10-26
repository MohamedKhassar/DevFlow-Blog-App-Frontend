import { ReadMore } from "@components/ReadMore"
import { useAppSelector } from "lib/store"
import { BiMailSend, BiUser } from "react-icons/bi"
import { RiCake2Fill } from "react-icons/ri"

const Profile = () => {
    const { user } = useAppSelector(state => state.user)
    return (
        <div className="flex-col my-5 items-center justify-center flex relative h-full">
            <div className="dark:bg-gray-950 bg-gray-200 dark:shadow-white/10 shadow-2xl dark:border-none border justify-end p-5 rounded-2xl lg:w-[60%] w-[95%] flex items-center gap-y-10 flex-col">
                <div className="flex flex-col items-center">
                    <BiUser className="dark:bg-dark border-[0.8rem] lg:size-32 md:size-28 size-24 rounded-full p-3 dark:border-[#212121] dark:text-white bg-slate-100 border-white" />
                    <h2 className="lg:text-3xl text-2xl capitalize  ">{user?.name}</h2>
                </div>
                {
                    user?.bio ?
                        <ReadMore id="read-more-text"
                            className="w-[90%] duration-300 lg:text-lg md:text-sm text-xs text-pretty text-start"
                            text={user.bio} />
                        :
                        <p className="text-sm text-pretty text-center">No biography provided yet.</p>
                }

                <ul className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 lg:w-full w-fit gap-y-5  lg:place-items-center">
                    <li className="flex items-center gap-x-2 text-sm  "><RiCake2Fill className="md:size-8 size-5" /> {new Date(user!.created_at).toLocaleDateString()}</li>
                    <li className="flex items-center gap-x-2 text-sm  "><BiMailSend className="md:size-8 size-5" /> {user?.email}</li>
                    <li className="flex items-center gap-x-2 text-sm  "><RiCake2Fill className="md:size-8 size-5" /> {new Date().toLocaleDateString()}</li>
                </ul>
            </div>

        </div>
    )
}

export default Profile