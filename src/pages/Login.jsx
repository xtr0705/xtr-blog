import { useDispatch } from "react-redux";
import { Input, Button } from '../components/index.js'
import { login as authLogin } from "../store/AuthSlice.js";
import { useForm} from "react-hook-form";
import authService from "../appwrite/auth.js";
import { useState } from "react";

function Login() {

  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const {register, handleSubmit} = useForm();

  const Login = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          await dispatch(authLogin(userData))
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`} >
          <div className="text-center text-2xl font-bold" >

            <span className="inline-block w-full max-w-25" >
              <logo width='100%' />
            </span>

          </div>
          <h2 className="text-center text-2xl font-bold leading-tight" >
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60" >
            Dont have an account?
            <a>
              Sign up
            </a>
          </p>
          {error && <p className="text-red-600 mt-8 text-center" >

            <form onSubmit={handleSubmit(Login)} className="mt-8" >
              <div className="space-y-5" >
                <Input
                  type='email'
                  placeholder='enter your email'
                  label='Email : '
                  {...register('email',{
                    required:true,
                    validate:{
                      matchPattern:(value)=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Email address must be a valid address'
                    }
                  })
                  }
                />

                <Input
                  type='password'
                  placeholder='enter your password'
                  label='Enter password : '
                  {...register('password',{
                    required:true,
                    maxLength:20,
                    minLength:16,
                    validate:{
                      matchPattern:(value)=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(value) || "Password must contain at least 1 uppercase, 1 lowercase, 1 number and a special character"
                    }
                  })}
                />
                <Button
                  type="submit"
                >Sign in</Button>
              </div>
            </form>
          </p>}

        </div>
      </div>
    </>
  )



}

export default Login;