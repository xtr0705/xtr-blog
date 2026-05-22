import { useDispatch } from "react-redux";
import { Input, Button } from '../components/index.js'
import { login as authLogin } from "../store/AuthSlice.js";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const Login = async ({email,password}) => {
    try {
      const session = await authService.login(
        {
          email,
          password
        }
      )
      if (session) {
        const userData = await authService.getCurrentUser()
        const mainUserData = {
          id: userData.$id,
          name:userData.name,
          email:userData.email
        }
        if (userData) {
          dispatch(authLogin(mainUserData))
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className={`w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl`} >
          <div className="mb-8 text-center" >

            <h1 className="text-4xl font-black text-white mb-3" >
              Welcome Back
            </h1>

            <p className="text-zinc-400">
              Sign in to continue to your account
            </p>
          </div>

          {error && (<p className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-xl px-4 py-3 mb-6" >{error}</p>)}

          <form onSubmit={handleSubmit(Login)} className="space-y-5" >
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <Input
                type='email'
                className='w-full'
                placeholder='enter your email'
                {...register('email', {
                  required: true,
                  validate: {
                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Email address must be a valid address'
                  }
                })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <Input
                type='password'
                className='w-full'
                placeholder='enter your password'
                label='Enter password : '
                {...register('password', {
                  required: true
                })}
              />
            </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 transition rounded-xl py-3 font-semibold"
              >Sign in</Button>
          </form>
          <p className="text-center text-zinc-400 text-sm mt-6">
            Don't have an account?{""}
            <Link
            to="/signup"
            className="text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
      </div>
    </div >
    </>
  );
}

export default Login;