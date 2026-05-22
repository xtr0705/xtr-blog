import { Link } from 'react-router-dom'

function Footer() {

  return (

    <footer className="border-t border-zinc-800 bg-zinc-950">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

          {/* Left */}

          <div>

            <Link
              to="/"
              className="text-2xl font-black text-white tracking-tight font-[Sora]"
            >
              xtr.Blog
            </Link>

            <p className="text-zinc-500 text-sm mt-2 max-w-md">
              Built for thoughts, chaos, opinions, and late night overthinking.
            </p>

          </div>

          {/* Center */}

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-400">

            <Link
              to="/"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/all-posts"
              className="hover:text-white transition"
            >
              Posts
            </Link>

            <Link
              to="/add-post"
              className="hover:text-white transition"
            >
              Create
            </Link>

          </div>

          {/* Right */}

          <div className="flex flex-col items-center md:items-start">

            <p className="text-zinc-500 text-sm">
              © 2026 xtr.Blog
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer