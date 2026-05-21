import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { login as authLogin } from "../store/AuthSlice.js";
import { useState } from "react";
import { Button, Input } from "../components/index.js";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signup() {

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const signup = async (data) => {

    setError("");

    try {

      const details =
        await authService.createAccount(data);

      if (details) {

        const userData =
          await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
        }
      }

    } catch (error) {

      console.log(error.message);
      setError(error.message);
    }
  };

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
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
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

            <Input
              type="password"
              placeholder="Create a password"
              className="w-full"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(value)
                    || "Password must contain uppercase, lowercase, number and special character"
                }
              })}
            />

          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 transition rounded-xl py-3 font-semibold"
          >
            Create Account
          </Button>

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

export default Signup;