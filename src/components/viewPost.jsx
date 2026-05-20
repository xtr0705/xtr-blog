import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";

function ViewPost() {

  const [data,setData] = useState();
  const {slug} = useParams();
  useEffect(()=>{
    const targetPost = async ()=>{
      const fetchedPost = await appwriteService.getPost(slug);
  
      if (fetchedPost) {
        setData(fetchedPost);
      }
    }
    targetPost();
    
  },[slug])

  if (!data) {
      return <div>Loading...</div>
  }else{
    return (
      <div>
        <img 
          src={appwriteService.getFilePreview(data.featuredImage)}
        />
        <p>{data.$createdAt}</p> 
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
    );
  }
}

export default ViewPost;