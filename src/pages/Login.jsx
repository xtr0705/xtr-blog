import { useDispatch } from "react-redux";
import { Input, Button } from '../components/index.js'
import { login as authLogin } from "../store/AuthSlice.js";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const Login = async ({ email, password }) => {
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
          name: userData.name,
          email: userData.email
        }
        if (userData) {
          dispatch(authLogin(mainUserData))
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>

          <p className="text-zinc-400 text-sm">
            Logging in...
          </p>

        </div>

      </div>
    )
  } else {


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
                  className='w-full text-white'
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

                <div className="relative" >
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className='w-full text-white'
                    placeholder='enter your password'
                    {...register('password', {
                      required: true
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                  >
                    {
                      showPassword
                        ? <EyeOff size={20} />
                        : <Eye size={20} />
                    }
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-600 transition rounded-xl py-3 font-semibold"
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
}

export default Login;