import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login } from "../../store/AuthSlice";
import { useState } from "react";
import {Button,Input} from '../index.js'
import { useForm } from "react-hook-form";

function Signup() {

  const {register,handleSubmit} = useForm();
  const [error,setError] = useState('');
  const dispatch = useDispatch();
   
  const Signup = async (data)=>{
    try{
      const details = await authService.createAccount(data);
      if (details) {
        const userData = await authService.getCurrentUser(details)
        if (userData) {
          dispatch(login(userData));
        }
      }
    }catch(error){
      console.log(error.message)
      setError(error.message);
    }
  }

  return (
      <div className="flex items-center justify-center" >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}>

        <div className="text-center text-2xl font-bold" >
          <span className="inline-block w-full max-w-25" >
            <logo width='100%' />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight" >
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60" >
          Already have an account? 
          <a 
          to="/login" 
          className="font-medium text-primary transition-all duration-200 hover:underline" 
          >
            Sign In
          </a>
        </p>
        {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
        <form onSubmit={handleSubmit(Signup)} >
          <div className="space-y-5" >
            <Input 
              type='email'
              placeholder='Enter email'
              label='Enter e-mail : '
              {...register('email',{
                required:true
              })}
            />
            <Input
              type='password'
              placeholder='enter password'
              label='Enter Password : '
              {...register('password',{
                required:true,
                validate:{
                  matchPattern:(value)=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(value) || "Password must contain at least 1 uppercase, 1 lowercase, 1 number and a special character"
                }
              })}
            />
            <Input 
            />
            
            <Button
            type="submit"
            className="w-full"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;