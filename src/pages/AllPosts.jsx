import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

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
          <Link to={`/post/${post.$id}`} >
            <div key={post.$id}>
              <img 
              src={getImage(post.featuredImage)} 
              alt={post.title}
              />
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.$createdAt}</p>
            </div>
          </Link>
        )
      })}
    </div>
  );
}

export default AllPosts;