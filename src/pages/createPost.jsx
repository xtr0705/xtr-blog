import { useNavigate } from "react-router-dom";
import { Input, Button } from '../components/index.js'
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";

function CreatePost() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const userData = useSelector(
    (state) => state.auth.userData
  )

  const uploadPost = async (data) => {
    const file = data.image[0];
    const uploadedFile = await appwriteService.createFile({ file })

    if (uploadedFile) {
      try{
        appwriteService.createPost({
          title: data.title,
          content: data.content,
          featuredImage: uploadedFile.$id,
          userId: userData.id
        })
      }catch(error){
        console.log("error occured while creating post",error)
        alert('error occured while creating post');
      }
      navigate('/all-posts');
    }
  }


  return (

    <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">

      <div className="max-w-3xl mx-auto">

        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4">
            Create
          </p>

          <h1 className="text-5xl font-black font-[Sora] leading-tight mb-4">
            Write Something
            <span className="italic font-thin text-zinc-400 block">
              Interesting
            </span>
          </h1>

          <p className="text-zinc-400 text-lg">
            Drop your thoughts before they disappear forever.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(uploadPost)}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6"
        >

          {/* Upload */}

          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Featured Image
            </label>

            <Input
              type="file"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 file:mr-4 file:bg-white file:text-black file:border-0 file:px-4 file:py-2 file:rounded-lg file:font-medium hover:file:bg-zinc-200"
              {...register('image')}
            />

          </div>

          {/* Title */}

          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Title
            </label>

            <Input
              type="text"
              placeholder="Enter your blog title..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              {...register('title')}
            />

          </div>

          {/* Content */}

          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Content
            </label>

            <textarea
              placeholder="Write something cool..."
              className="w-full min-h-[250px] bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition resize-none"
              {...register('content')}
            />

          </div>

          {/* Button */}

          <Button
            type='submit'
            className="w-full bg-white text-black hover:bg-zinc-200 transition rounded-xl py-4 text-lg font-semibold"
          >
            Publish Post
          </Button>

        </form>

      </div>

    </div>
  );
}

export default CreatePost;