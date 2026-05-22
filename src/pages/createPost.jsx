import { useNavigate } from "react-router-dom";
import {Input, Button} from '../components/index.js'
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config.js";

function CreatePost() {
  const navigate = useNavigate();
  const {register , handleSubmit} = useForm();

  const uploadPost = async (data)=>{
    const file = data.image[0];
    const uploadedFile = await appwriteService.createFile({file})

    if (uploadedFile) {
      await appwriteService.createPost({
        title: data.title,
        content: data.content,
        featuredImage: uploadedFile.$id
      })

      navigate('/all-posts');
    }
  }


  return (

    <div className="justify-center" >
      <form onSubmit={handleSubmit(uploadPost)} >

        <Input 
          type="file"
          {...register('image')}
        />

        <Input 
          type="text"
          {...register('title')}
          />

        <textarea
          type="text"
          {...register('content')}
        />

        <Button type='submit'>
          Create Post
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;