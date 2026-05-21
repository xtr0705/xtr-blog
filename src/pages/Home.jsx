export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-4">
              XTR Blog Platform
            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Share Your
              <span className="block text-zinc-400">
                Thoughts With The World
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
              Create posts, upload images, and explore blogs from other users.
              Built with React, Appwrite and Tailwind CSS.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/all-posts"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
              >
                Explore Posts
              </a>

              <a
                href="/add-post"
                className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold hover:bg-zinc-900 transition"
              >
                Create Post
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-52 flex flex-col justify-between">
              <div>
                <p className="text-zinc-500 text-sm mb-2">Feature</p>
                <h3 className="text-2xl font-bold">Authentication</h3>
              </div>

              <p className="text-zinc-400 text-sm">
                Secure login and signup system using Appwrite.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-52 flex flex-col justify-between mt-8">
              <div>
                <p className="text-zinc-500 text-sm mb-2">Feature</p>
                <h3 className="text-2xl font-bold">Image Uploads</h3>
              </div>

              <p className="text-zinc-400 text-sm">
                Upload featured images for every blog post.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-52 flex flex-col justify-between -mt-8">
              <div>
                <p className="text-zinc-500 text-sm mb-2">Feature</p>
                <h3 className="text-2xl font-bold">CRUD System</h3>
              </div>

              <p className="text-zinc-400 text-sm">
                Create, read and delete blog posts dynamically.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-52 flex flex-col justify-between">
              <div>
                <p className="text-zinc-500 text-sm mb-2">Feature</p>
                <h3 className="text-2xl font-bold">Responsive UI</h3>
              </div>

              <p className="text-zinc-400 text-sm">
                Clean modern interface built with Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
