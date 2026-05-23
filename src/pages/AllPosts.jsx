import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await appwriteService.getPosts();

      if (data) {
        setPosts(data.documents)
      }
    }

    fetchPosts();
  }, [])

  const getImage = (img) => {
    const url = appwriteService.getFileView(img);
    return url
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {posts.map((post) => (
        <Link
          to={`/post/${post.$id}`}
          key={post.$id}
          className="group"
        >

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition duration-300 hover:-translate-y-1">

            <img
              src={getImage(post.featuredImage)}
              alt={post.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              <p className="text-zinc-500 text-xs mb-2">
                {new Date(post.$createdAt).toDateString()}
              </p>

              <h2 className="text-lg font-bold text-white line-clamp-1 mb-2">

                {post.title
                  ? post.title
                  : post.content.slice(0, 40)}

              </h2>

              <p className="text-zinc-400 text-sm line-clamp-2">
                {post.content.slice(0, 80)}...
              </p>

            </div>

          </div>

        </Link>

      ))}

    </div>
  );
}

export default AllPosts;