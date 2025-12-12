import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const[name, setName] = useState("Mukesh Kumar");
  const[bio, setBio] = useState("Hii there! I am using ChatApp.");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Perform any profile saving logic here  
    navigate("/");
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-no-repeat'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 p-10 flex-1' action="">
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImage?URL.createObjectURL(selectedImage): assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Upload profile image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='Your Name' 
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 '/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write Profile Bio' required name="" id="" rows={4}
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' ></textarea>
          <button type='submit' 
          className='bg-linear-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'> Save </button>
        </form>
        <img src={assets.logo_icon} alt=""
        className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
      </div>
    </div>
  )
}

export default ProfilePage
