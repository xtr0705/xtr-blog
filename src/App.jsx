import { useDispatch } from "react-redux";
import { login,logout } from "./store/AuthSlice";
import { useEffect,useState } from "react";
import authService from "./appwrite/auth";

function App() {
  const dispatch = useDispatch();
  const [loading,setLoading]= useState(true);

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      }else{
        dispatch(logout());
      }
    }).catch((error)=>{
      console.log('error occured while getting user :  ', error)
    })
    .finally(()=>setLoading(false))
  },[dispatch])
    
  if (!loading) {
    return(
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400' >
        <div className='w-full block' >
        </div>
      </div>
    )
  }else{
    return null;
  }
}

export default App;