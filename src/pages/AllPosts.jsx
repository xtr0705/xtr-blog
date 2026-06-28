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
        console.log(data)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-zinc-700 border-t-white rounded-full animate-spin"></div>

          <p className="text-zinc-400 text-sm">
            Loading posts...
          </p>

        </div>

      </div>
    )
  } else {



    return (
      <PageFadeIn>
        <div className="min-h-screen bg-zinc-950 text-white px-4 py-10 md:py-14">

          <div className="max-w-7xl mx-auto">

            <div className="mb-10">

              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4">
                Explore
              </p>

              <h1 className="text-4xl md:text-5xl font-black font-[Sora] leading-tight mb-4">
                Community
                <span className="italic font-[Serif] font-thin text-zinc-400 block">
                  Posts
                </span>
              </h1>

              <p className="text-zinc-400 text-lg max-w-2xl">
                Read thoughts, opinions, questionable late-night ideas, and everything in between.
              </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

              {posts.map((post) => (

                <Link
                  to={`/post/${post.$id}`}
                  key={post.$id}
                  className="group"
                >

                  <div className="h-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/80 transition duration-300 hover:shadow-xl hover:-translate-y-1">


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

                      <p className="text-zinc-500 text-xs mb-3">
                        By {post.name}
                      </p>
                      <p className="text-zinc-500 text-xs mb-3">
                        On {new Date(post.$createdAt).toDateString().split(' ').slice(1).join(' ')}
                      </p>

                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">

                        {post.title
                          ? post.title
                          : getPreview(post.content, 40)}

                      </h2>

                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
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