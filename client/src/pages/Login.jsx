import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token,setToken,navigate, backendUrl} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + `/auth/user/register`,{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('userToken',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
       const response = await axios.post(backendUrl + '/auth/user/login',{email,password})
       if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem('userToken',response.data.token)
       }else{
        toast.error(response.data.message)
       }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
         </div>
         {currentState === 'Login' ? '':<input onChange={(e)=> setName(e.target.value)} value={name} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name'/>}
         <input onChange={(e)=> setEmail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email'/>
         <input onChange={(e)=> setPassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password'/>
         <div className='w-full flex justify-between text-sm mt-[-8px]'>
             <p className='cursor-pointer'>Forgot your password?</p>
             {
              currentState === 'Sign Up'
              ? <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login</p>
              : <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
             }
         </div>
         <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Sign Up' ? 'Sign Up':'Sign In'}
         </button>
      </form>
    </div>
  )
}

export default Login