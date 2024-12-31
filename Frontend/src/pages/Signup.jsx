import React from 'react'
import { Link } from 'react-router-dom'
function Signup() {
  return (
    <div className='max-w-lg p-3 mx-auto'>
     <h1 className='text-3xl my-7 text-center font-semibold'>Sign Up</h1>
     <form className='flex flex-col'>
      <input type="text" placeholder='username' className='border p-3 rounded-lg focus:outline-none' id='username'/>
      <input type="password" placeholder='password' className='border p-3 my-2 rounded-lg focus:outline-none' id='password'/>
      <input type="email" placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email'/>
     <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> Sign Up</button>
     </form>
     <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to="/sign-in">
      <span className='text-blue-700'>Sign in</span>
      </Link>
     </div>
    </div>
  )
}

export default Signup
