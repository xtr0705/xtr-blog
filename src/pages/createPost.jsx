import { useNavigate } from "react-router-dom";
import { Input, Button } from '../components/index.js'
import { useForm, Controller } from "react-hook-form";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";
import PageFadeIn from "../components/PageFadeIn.jsx";
import TextEditor from "../components/TextEditor.jsx";

function CreatePost() {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();

  const userData = useSelector(
    (state) => state.auth.userData
  )

  const uploadPost = async (data) => {
    let uploadedFile = null;
    if (data.image && data.image[0]) {
      uploadedFile = await appwriteService.createFile({
        file: data.image[0]
      })
    }

    try {
      await appwriteService.createPost({
        title: data.title,
        content: data.content,
        featuredImage: uploadedFile ? uploadedFile.$id : null,
        userId: userData.id,
        name: userData.name
      })
      navigate('/all-posts');
    } catch (error) {
      console.log("error occured while creating post", error)
      alert('error occured while creating post');
    }
  }


  return (
    <PageFadeIn>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-10 md:py-16">

        <div className="max-w-3xl mx-auto">

          <div className="mb-10">

            <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
              Create
            </p>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Write Something
              <span className="font-[Serif] font-thin italic block text-[var(--text-secondary)]">
                Interesting
              </span>
            </h1>

            <p className="text-[var(--text-secondary)] text-lg">
              Drop your thoughts before they disappear forever.
            </p>

          </div>

          <form
            onSubmit={handleSubmit(uploadPost)}
            className="bg-[var(--surface)]
              border-[var(--border)]
              rounded-2xl p-6 md:p-8 space-y-6"
          >

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-3">
                Featured Image
              </label>

              <Input
                type="file"
                className="
                file:bg-[var(--surface-2)]
                file:text-[var(--text)]
                file:border
                file:border-[var(--border)]
                file:rounded-lg
                file:px-4
                file:py-2
                file:mr-4
                file:hover:bg-[var(--hover)]
                "
                {...register('image')}
              />
            </div>

            <div>

              <label className="block text-sm font-medium text-[var(--text)] mb-3">
                Title
              </label>

              <Input
                type="text"
                placeholder="Enter your blog title..."
                className="py-4"
                {...register('title')}
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-[var(--text)] mb-3">
                Content
              </label>

              <div className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
  <p className="text-sm text-[var(--text-secondary)]">
    Write freely. Your post supports headings, lists and rich formatting.
  </p>
</div>

              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

            </div>

            <Button
              type='submit'
              className="w-full py-4 text-lg"
            >
              Publish Post
            </Button>

          </form>

        </div>

      </div>
    </PageFadeIn>
  );
}

export default CreatePost;