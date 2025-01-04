import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
function Signup() {
  const navigate = useNavigate();
  const[error , setError] = useState(null);
  const[loading , setLoading] = useState(false);
  const [formData , setFormData] = useState({ 
    username: '',
    password: '',
    email: '',});

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  }
    


  const handleSubmit = async(e)=>{
    setLoading(true);
    e.preventDefault();
    try {

      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers : {
         'Content-Type':'application/json',
         },
         body: JSON.stringify(formData),
       });


       const data = await res.json();
       if(data.success == false){
        setLoading(false);
         setError(data.message);
         toast.error(error);
         return ;
       }
       console.log(data);
       navigate('/signin');
        
    setLoading(false);
    setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
   
  }


  return (
    <div className='max-w-lg p-3 mx-auto'>
     <h1 className='text-3xl my-7 text-center font-semibold'>Sign Up</h1>
     <form className='flex flex-col' onSubmit={handleSubmit}>
      <input type="text" placeholder='username' className='border p-3 my-2 rounded-lg focus:outline-none' id='username' onChange={handleChange}/>
      <input type="password" placeholder='password' className='border p-3 my-2 rounded-lg focus:outline-none' id='password' onChange={handleChange}/>
      <input type="email" placeholder='email' className='border p-3 my-2 rounded-lg focus:outline-none' id='email' onChange={handleChange}/>
     <button disabled={loading} className='bg-slate-700 text-white p-3 mt-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> 
      {loading ? 'Loading...' : ' Sign Up'}</button>
     </form>
     <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to="/signin">
      <span className='text-blue-700'>Sign in</span>
      </Link>
     </div>
    </div>
  )
}

export default Signup
