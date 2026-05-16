import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/AuthSlice";
import Button from "../Input/Button";

function LogoutButton() {

  const dispatch = useDispatch();
  const doLogout = ()=>{
    authService.logout()
      .then(()=>{
        dispatch(logout())
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