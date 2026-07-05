import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { login as authLogin } from "../store/authSlice.js";
import { useState } from "react";
import { Input, Button } from "../components/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import PageFadeIn from "../components/PageFadeIn.jsx";

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const signup = async (data) => {
    setLoading(true)
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
      <div className="min-h-screen bg-(--bg) flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>

          <p className="text-(--text-secondary) text-sm">
            Creating Account and Logging in...
          </p>

        </div>

      </div>
    )
  } else {
    return (
      <PageFadeIn>
        <div className="min-h-screen bg-(--bg) flex items-center justify-center px-4">

          <div className="w-full max-w-md bg-(--surface) border border-(--border) rounded-3xl p-8 shadow-2xl">

            <div className="mb-8 text-center">
              <div className="mb-8" >
              <Link
                to="/"
                className="text-2xl font-black tracking-tight text-[var(--text)]"
              >
                xtr.Blog
              </Link>
              </div>
              <h1 className="text-4xl font-black text-[var(--text)] mb-3">
                Create Account
              </h1>

              <p className="text-(--text-secondary)">
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
                  className="w-full text-[var(--text)]"
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters"
                    },
                    maxLength: {
                      value: 16,
                      message: "Username cannot exceed 16 characters"
                    }
                  })}
                />
                {
                  errors.name && (
                    <p className="text-red-400 text-sm mt-2"  >{errors.name.message}</p>
                  )
                }
              </div>


              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-[var(--text)]"
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      matchPattern: (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                        || "Enter valid email"
                    }
                  })}

                />
                {
                  errors.email && (
                    <p className="text-red-400 text-sm mt-2"  >{errors.email.message}</p>
                  )
                }
              </div>

              <div>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>

                <div className="relative" >

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full text-[var(--text)]"
                    {...register("password", {
                      required: "Password is required",
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text)] transition"
                  >
                    {
                      showPassword
                        ? <EyeOff size={20} />
                        : <Eye size={20} />
                    }
                  </button>
                </div>
                {
                  errors.password && (
                    <p className="text-red-400 text-sm mt-2"  >{errors.password.message}</p>
                  )
                }
              </div>
              <Button
                type="submit"
                className="w-full py-3 rounded-xl"
              >Create Account</Button>
            </form>

            <p className="text-center text-[var(--text-secondary)] text-sm mt-6">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-[var(--text)] hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>
      </PageFadeIn>
    );
  }
}

export default Signup;