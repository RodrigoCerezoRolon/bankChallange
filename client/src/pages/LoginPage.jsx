import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {signin,errors:signInErrors,isAuthenticated }=useAuth() 
  const navigate = useNavigate()
  console.log(signInErrors);
  const onSubmit= handleSubmit((data)=>{
   signin(data);
  })
  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      
       <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
       {signInErrors.length > 0 && ( // Muestra los errores si existen
        <div className="bg-red-500 p-2 text-white">
          <ul>
            {signInErrors.map((error, i) => (
              <li key={i}>{error}</li> // Muestra cada error en una línea
            ))}
          </ul>
        </div>
      )}
        <h1 className='text-2xl font-bold'>Login</h1>
       <form onSubmit={onSubmit} action=''>
            
            <input type='email' {...register('email',{required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Email'></input>
            {
                errors.email && (
                    <p className='text-red-500'>Email is required</p>
                )
            }
            <input type='password'{...register('password',{required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Password'></input>
            {
                errors.password && (
                    <p className='text-red-500'>Password is required</p>
                )
            }
            <button type='submit'>
                Login
            </button>
        </form>
        <p className='flex grap-x-2 justify-between'>
          Don't have an account? <Link to='/register' className='text-sky-500'>Sign up</Link>
        </p>
       </div>
    </div>
  )
}

export default LoginPage