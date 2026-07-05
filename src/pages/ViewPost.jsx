import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../components/index.js'
import { useSelector } from "react-redux";
import PageFadeIn from "../components/PageFadeIn.jsx";

function ViewPost() {

  const [data, setData] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector(
    (state) => state.auth.userData
  )

  function deletePost() {
    if (!userData || userData.id !== data.userId) {
      alert('You are not authorized to delete this post');
      return;
    }

    const deleteFull = async () => {
      try {
        const img =  data.featuredImage;
        if (!img) {
          await appwriteService.deletePost({slug});
          navigate('/all-posts');
        }else{
          const deleteImg = await appwriteService.deleteFile(img);
          if (deleteImg) {
            await appwriteService.deletePost({ slug });
            navigate('/all-posts');
          }
        }
      } catch (error) {
        console.log('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
    deleteFull();
  }

  useEffect(() => {
    const targetPost = async () => {
      const fetchedPost = await appwriteService.getPost({ slug });

      if (fetchedPost) {
        setData(fetchedPost);
      }
    }
    targetPost();

  }, [slug])


  

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">

        <div className="flex flex-col items-center gap-5">

          <div className="w-12 h-12 border-4 bg-[vaborder-[var(--border)] border-t-[var(--text)]r(--bg)] rounded-full animate-spin"></div>

          <div className="text-center">

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-2">
              Loading Post
            </h2>

            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
              Fetching thoughts from the void...
            </p>

          </div>

        </div>

      </div>
    )
  } else {
    return (
      <PageFadeIn>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-3 sm:px-4 py-8 md:py-14">

          <div className="max-w-4xl mx-auto">

            <div className="mb-6 md:mb-8">

              <p className="text-[10px] sm:text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-3 md:mb-4">
                Blog Post
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-[Sora] leading-tight mb-4">
                {data.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                  By {data.name}
                </p>

                <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                  On {new Date(data.$createdAt).toDateString().split(' ').slice(1).join(' ')}

                </p>

                {
                  userData && userData.id === data.userId && (
                    <Button
                      className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-[var(--text)] px-5 py-2.5 rounded-xl transition text-sm font-medium"
                      onClick={deletePost}
                    >
                      Delete Post
                    </Button>
                  )
                }

              </div>
            </div>

            <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--border)] mb-6 md:mb-10 max-w-4xl mx-auto">

              {
                data.featuredImage &&(
                  <img
                  src={appwriteService.getFileView(data.featuredImage)}
                  className="w-full h-52 sm:h-72 md:h-96 object-cover"
                  />
                )
              }

            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10">

              <div className="blog-content"
              dangerouslySetInnerHTML={{
                __html:data.content}}
              />
            </div>

          </div>

        </div>
      </PageFadeIn>
    );
  }
}

export default ViewPost;