import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import PageFadeIn from "../components/PageFadeIn";

function AllPosts() {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await appwriteService.getPosts();
        if (data) {
          setPosts(data.documents)
        }

      } catch (error) {
        console.log('error occured fetching all posts', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();

  }, [])

  const getImage = (img) => {
    const url = appwriteService.getFileView(img);
    return url
  }
  function getPreview(html, length = 120) {
  const div = document.createElement("div");
  div.innerHTML = html;

  const text = div.textContent || "";

  return text.length > length
    ? text.slice(0, length) + "..."
    : text;
}

  if (!loading && posts.length === 0) {
  return (
    <PageFadeIn>
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--text)]">
            No posts yet
          </h2>

          <p className="mt-3 text-[var(--text-secondary)]">
            Be the first one to publish something.
          </p>

          <Link
            to="/add-post"
            className="
              inline-block
              mt-8
              px-6
              py-3
              rounded-xl
              bg-[var(--text)]
              text-[var(--bg)]
              font-semibold
              transition
              hover:scale-105
            "
          >
            Create your first post
          </Link>
        </div>
      </div>
    </PageFadeIn>
  );
}

  if (loading) {
    return (
      <div className="min-h-screen bg-(--bg) flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-(--border) border-t-(--text) rounded-full animate-spin"></div>

          <p className="text-(--text-secondary) text-sm">
            Loading posts...
          </p>

        </div>

      </div>
    )
  } else {



    return (
      <PageFadeIn>
        <div className="min-h-screen bg-(--bg) text-(--text) px-4 py-10 md:py-14">

          <div className="max-w-7xl mx-auto">

            <div className="mb-10">

              <p className="text-sm uppercase tracking-[0.3em] text-(--text-secondary) mb-4">
                Explore
              </p>

              <h1 className="text-4xl md:text-5xl font-black font-[Sora] leading-tight mb-4">
                Community
                <span className="italic font-[Serif] font-thin text-[var(--text-secondary)] block">
                  Posts
                </span>
              </h1>

              <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
                Read thoughts, opinions, questionable late-night ideas, and everything in between.
              </p>

            </div>

            <div className="grid grid-cols-1
sm:grid-cols-2
xl:grid-cols-3 gap-4 md:gap-6">

              {posts.map((post) => (

                <Link
                  to={`/post/${post.$id}`}
                  key={post.$id}
                  className="group"
                >

                  <div className="h-full bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-zinc-500 hover:bg-[var(--hover)] transition duration-300 hover:shadow-xl hover:-translate-y-1">


                    <div className="overflow-hidden">

                      {
                        post.featuredImage && (
                          <img
                            src={getImage(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                          />
                        )
                      }

                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-3">
                        <span>{post.name}</span>
                        <span>
                          {new Date(post.$createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-[var(--text)] mb-3 line-clamp-1">

                        {post.title
                          ? post.title
                          : getPreview(post.content, 40)}

                      </h2>

                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">
  {getPreview(post.content, 90)}
</p>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>
      </PageFadeIn>
    );
  }
}

export default AllPosts;