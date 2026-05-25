import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice.js";
import Button from "../Input/Button";
import { useNavigate } from "react-router-dom";

function LogoutButton() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doLogout = ()=>{
    authService.logout()
      .then(()=>{
        dispatch(logout())
        navigate("/");
      })
      .catch((error)=>{
        console.log('error occured while logging out',error)
      })
  }
  return (
    <Button 
      onClick={doLogout}
      className="bg-red-500 text-white"
    >
      Log out
    </Button>
  );
}

export default LogoutButton;