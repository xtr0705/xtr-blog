import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";

function ViewPost() {

  const {slug} = useParams();
  const post = ()=>{
    appwriteService.getPost(slug)
  }
  return (
    <div>
      
    </div>
  );
}

export default ViewPost;