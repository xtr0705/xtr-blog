import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { login as authLogin } from "../store/AuthSlice.js";
import { useState } from "react";
import { Input, Button } from "../components/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Signup() {

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(true)
  const signup = async (data) => {

    setError("");

    try {
      const details = await authService.createAccount(data);

      if (details) {
        const userData = await authService.getCurrentUser();
        const mainUserData = {
          id: userData.$id,
          name: userData.name,
          email: userData.email
        }

        if (userData) {
          dispatch(authLogin(mainUserData));
          navigate("/");
        }
      }

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>

          <p className="text-zinc-400 text-sm">
            Creating Account and Logging in...
          </p>

        </div>

      </div>
    )
  } else {
    return (

      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <div className="mb-8 text-center">

            <h1 className="text-4xl font-black text-white mb-3">
              Create Account
            </h1>

            <p className="text-zinc-400">
              Start sharing your thoughts with the world
            </p>

          </div>

          {error && (

            <p className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </p>

          )}

          <form
            onSubmit={handleSubmit(signup)}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Username
              </label>

              <Input
                type="text"
                placeholder="Enter username"
                className="w-full text-white"
                {...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 16
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full text-white"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                      || "Enter valid email"
                  }
                })}
              />
            </div>

            <div>

              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <div className="relative" >

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full text-white"
                  {...register("password", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(value)
                        || "Password must contain uppercase, lowercase, number and special character"
                    }
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

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-white hover:underline"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>
    );
  }
}

export default Signup;