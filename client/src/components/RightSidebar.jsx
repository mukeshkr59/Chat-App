import React, {useState} from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const RightSidebar = () => {

    const {selectedUser, messages} = React.useContext(ChatContext);
    const { logout, onlineUsers, authUser } = React.useContext(AuthContext);
    const [msgImages, setMsgImages] = useState([])

    // get all the images from messages with the selected user
    React.useEffect(() => {
        if(selectedUser){
            const images = messages.filter(msg => msg.image).map(msg => msg.image);
            setMsgImages(images);
        }
    }, [messages, selectedUser]);

  return selectedUser && (
    <div className={` bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser? "max-md:hidden":""} `}>
        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-square rounded-full' />
            <h1 className='px-10 text-xl font-medium mx-auto flex items-center'> { onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500 mr-2'></p>} {selectedUser?.fullName}</h1>
            <p className='px-10 mx-auto'>{selectedUser?.bio || "This user has no bio"}</p>
        </div>
        <hr className='border=[#ffffff50] my-4'/>
        <div className='px-2 text-xs'>
            <p>Media</p>
            <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'> 
                {msgImages.map((url, index) => (
                    <div onClick={()=>window.open(url)} key={index} className='rounded cursor-pointer'>
                        <img src={url} alt="" className='h-full object-cover rounded-md cursor-pointer' />
                    </div>


                    // <img onClick={()=>window.open(url)} key={index} src={url} alt="" className='mx-auto h-full object-cover rounded-md cursor-pointer'/>
                ))}
            </div>
        </div>
        <button onClick={()=> logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
            Logout</button>
    </div>
  )
}

export default RightSidebar
