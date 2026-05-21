import { useDispatch } from "react-redux";
import { login, logout } from "./store/AuthSlice";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import ViewPost from "./pages/ViewPost";
import AllPosts from "./pages/AllPosts";
import CreatePost from "./pages/createPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
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

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/all-posts"
              element={<AllPosts />}
            />

            <Route
              path="/add-post"
              element={<CreatePost />}
            />

            <Route
              path="/post/:slug"
              element={<ViewPost />}
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