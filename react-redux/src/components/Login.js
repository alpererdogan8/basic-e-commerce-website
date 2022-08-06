/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon, XIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { asyncAuthLoginAPI } from '../features/auth/authAPI'
const Login = () => {
  const [inputSecret, setInputSecret] = useState(false)
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    await dispatch(asyncAuthLoginAPI(data))
    return navigate('/my-cart', { replace: true })
  }
  return (
    <div className=" z-10 absolute top-0 bottom-0 left-0 right-0 flex justify-center  items-center bg-[#09090989] text-white">
      <div className=" z-10 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm  bg-[#000000e5] "></div>
      <div className=" z-30 absolute flex flex-col h-auto  justify-between  items-center top-[8%] bottom-[8%] left-[20%] right-[20%]  bg-black rounded-xl border-purple-600 border-solid border-2  ">
        <Link className="absolute right-5 top-4 text-3xl " to="/">
          <XIcon className="h-7 w-7 p-1 border-[#fff0]  hover:border-purple-600 border-solid border-2 rounded-full  " />
        </Link>
        <div className=" flex flex-col h-auto justify-center items-center mt-4 w-[95%]">
          <div className="text-3xl">Login/Register</div>
          <form
            action="/my-cart"
            onSubmit={handleSubmit(onSubmit)}
            className=" pt-20 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col  p-2 ">
              <label htmlFor="username">Username/Email</label>
              <input
                required
                className=" text-white border-white outline-none bg-black border-solid border-2 py-3 px-5 rounded-md w-[100%] focus:border-purple-700"
                {...register('username')}
                name="username"
                type="text"
              />
            </div>

            <div className="flex flex-col  p-2 ">
              <label htmlFor="password">Password</label>
              <div className="flex flex-col justify-center items-center align-bottom">
                <input
                  required
                  className=" text-white border-white outline-none  bg-black border-solid border-2 py-3 px-5 rounded-md w-[100%] focus:border-purple-700"
                  {...register('password')}
                  name="password"
                  type={inputSecret ? 'password' : 'text'}
                />
                <a className="absolute cursor-pointer self-end mr-3 " onClick={() => setInputSecret(!inputSecret)}>
                  <span>{inputSecret ? <EyeIcon className="h-5 w-5 " /> : <EyeOffIcon className="h-5 w-5 " />}</span>
                </a>
              </div>
            </div>
            <input
              className="cursor-pointer text-white bg-purple-700 py-3 px-5 rounded-md w-[94%] hover:bg-purple-900"
              type="submit"
              value="LOGIN"
            />
          </form>
        </div>
        <Link className="underline" to="/register">
          Do you want to create a new account
        </Link>
      </div>
    </div>
  )
}

export default Login
