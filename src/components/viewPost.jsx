import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '../components/index.js'

function ViewPost() {

  const [data,setData] = useState();
  const {slug} = useParams();
  const navigate = useNavigate();

  function deletePost(){
    const deleteFull = async ()=>{
      const deleteImg = appwriteService.deleteFile(data.featuredImage);
      if (deleteImg) {
        await appwriteService.deletePost(slug);
        navigate('/all-posts');
      }
    }
    deleteFull();
  }

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
        <Button onClick={deletePost} />
        <p>{data.$createdAt}</p> 
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </div>
    );
  }
}

export default ViewPost;