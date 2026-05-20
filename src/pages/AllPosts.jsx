import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

function AllPosts() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const data = await appwriteService.getPosts();

      if(data) {
        setPosts(data.documents)
      }
    }
    
    fetchPosts();
  },[])

  const getImage = (img) =>{
    return appwriteService.getFilePreview(img);
  }

  return (
    <div>
      {posts.map((post)=>{
        return (
          <div key={post.$id}>
            <img 
            src={getImage(post.featuredImage)} 
            alt={post.title}
            />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.$createdAt}</p>
          </div>
        )
      })}
    </div>
  );
}

export default AllPosts;