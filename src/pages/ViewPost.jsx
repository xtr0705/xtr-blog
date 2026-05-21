import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../components/index.js'

function ViewPost() {

  const [data, setData] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  function deletePost() {
    const deleteFull = async () => {
      const deleteImg = await appwriteService.deleteFile(data.featuredImage);
      if (deleteImg) {
        await appwriteService.deletePost(slug);
        navigate('/all-posts');
      }
    }
    deleteFull();
  }

  useEffect(() => {
    const targetPost = async () => {
      const fetchedPost = await appwriteService.getPost(slug);

      if (fetchedPost) {
        setData(fetchedPost);
      }
    }
    targetPost();

  }, [slug])

  if (!data) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='w-full bg-gray-100 rounded-lg p-4'>
        <img
          src={appwriteService.getFilePreview(data.featuredImage)}
          className="rounded-lg"
        />
        <Button className="mb-2" onClick={deletePost}> Delete Post </Button>
        <p className="font-light mb-2" >{data.$createdAt}</p>
        <h2 className="text-xl font-bold mb-2" >{data.title}</h2>
        <p>{data.content}</p>
      </div>

    );
  }
}

export default ViewPost;