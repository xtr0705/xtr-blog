import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import ViewPost from "./pages/ViewPost";
import AllPosts from "./pages/AllPosts";
import CreatePost from "./pages/CreatePost.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthFlow from "./components/AuthFlow";
import { useTheme } from "./context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function App() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          const mainUserData = {
            id: userData.$id,
            name: userData.name,
            email: userData.email
          }
          dispatch(login(mainUserData))
        } else {
          dispatch(logout());
        }
      }).catch((error) => {
        console.log('error occured while getting user :  ', error)
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (!loading) {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400' >
        <div className='w-full block' >
          <Header />
          <button
            onClick={toggleTheme}
              className="
                fixed
                bottom-6
                right-6
                z-50

                flex
                items-center
                justify-center

                h-12
                w-12

                rounded-full

                border
                border-[var(--border)]

                bg-[var(--surface)]

                text-[var(--text)]

                shadow-lg

                transition-all
                duration-300

                hover:bg-[var(--hover)]
                hover:scale-105

                active:scale-95
              "
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Routes>

            <Route
              path="/"
              element={
                <AuthFlow authentication={true} >
                  <Home />
                </AuthFlow>

              }
            />

            <Route
              path="/login"
              element={
                <AuthFlow authentication={false}>
                  <Login />
                </AuthFlow>
              }
            />

            <Route
              path="/signup"
              element={
                <AuthFlow authentication={false} >
                  <Signup />
                </AuthFlow>
              }
            />

            <Route
              path="/all-posts"
              element={
                <AuthFlow authentication={true} >
                  <AllPosts />
                </AuthFlow>

              }
            />

            <Route
              path="/add-post"
              element={
                <AuthFlow authentication={true} >
                  <CreatePost />
                </AuthFlow>}
            />

            <Route
              path="/post/:slug"
              element={
                <AuthFlow authentication={true} >
                  <ViewPost />
                </AuthFlow>
              }
            />

          </Routes>

          <Footer />
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default App;