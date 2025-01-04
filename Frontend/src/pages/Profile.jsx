import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  return currentUser?(
    <div className='max-w-lg p-3 mx-auto'>
    <h1 className='text-3xl my-7 text-center font-semibold'>Profile</h1>
    <form className='flex flex-col '>
    <img className='rounded-full h-10 w-10 object-cover mx-auto cursor-pointer'
    src={currentUser.avatar} alt="profile img" />
      <input type="text" name='username'className='border my-2 p-3 rounded-lg focus:outline-none' placeholder='username' />
      <input type="email" name='email'className='border my-2 p-3 rounded-lg focus:outline-none' placeholder='email' />
      <input type="password" name='password' className='border my-2 p-3 rounded-lg focus:outline-none' placeholder='password' />
      <button type='button' className='bg-slate-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80 '>Update</button>
      <button type='button' className='bg-green-700 text-white uppercase rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80'>Create Listing</button>
    </form>
   </div>
  ):(
    <h2>Sign in to view this page</h2>
  )
   
  
}

export default Profile
