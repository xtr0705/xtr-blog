import { Link } from "react-router-dom";
import PageFadeIn from "../components/PageFadeIn";

export default function Home() {
  return (
    <PageFadeIn>
      <div className="min-h-screen bg-(--bg) text-(--text)">
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-(--text-secondary) mb-4">
                XTR Blog Platform
              </p>

              <h1 className="text-5xl font-[Sora] md:text-6xl font-black leading-tight mb-6">
                Every Idea
                <span className="font-[Serif] font-thin italic block text-(--text-secondary)">
                  Deserves
                </span>
                <span className="block text-(--text-secondary)">
                  An Audience
                </span>
              </h1>

              <p className="text-(--text-secondary) text-lg leading-relaxed mb-8 max-w-xl">
                Create. Post. Scroll. Pretend you’re productive.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  className="
                    px-6
                    py-3
                    rounded-lg

                    bg-(--text)
                    text-(--bg)

                    font-semibold

                    transition-all
                    duration-300

                    hover:scale-[1.03]
                    active:scale-95
                    "
                  to="/all-posts"
                >
                  Explore Posts
                </Link>

                <Link
                  className="
                  px-6
                  py-3
                  rounded-lg

                  border
                  border-(--border)

                  bg-(--surface)

                  font-semibold

                  hover:bg-(--hover)

                  transition-all
                  duration-300
                  "
                  to="/add-post"
                >
                  Create Post
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="hover:bg-(--surface) border border-(--border) rounded-3xl p-6 h-52 flex flex-col justify-between">
                <div>
                  <p className="text-(--text-secondary) text-sm mb-2">Feature</p>
                  <h3 className="text-xl sm:text-2xl font-bold">Authentication</h3>
                </div>

                <p className="text-(--text-secondary) text-sm">
                  Your thoughts, safely locked behind a password you’ll forget.
                </p>
              </div>

              <div className="hover:bg-(--surface) border border-(--border) rounded-3xl p-4 sm:p-6 h-52 flex flex-col justify-between sm:mt-8">
                <div>
                  <p className="text-(--text-secondary) text-sm mb-2">Feature</p>
                  <h3 className="text-xl sm:text-2xl font-bold">Image Uploads</h3>
                </div>

                <p className="text-(--text-secondary) text-sm">
                  A picture says a thousand words. Your blog still says more.
                </p>
              </div>

              <div className="hover:bg-(--surface) border border-(--border) rounded-3xl p-4 sm:p-6 h-52 flex flex-col justify-between sm:-mt-8">
                <div>
                  <p className="text-(--text-secondary) text-sm mb-2">Feature</p>
                  <h3 className="text-xl sm:text-2xl font-bold">CRUD System</h3>
                </div>

                <p className="text-(--text-secondary) text-sm">
                  Post it. Edit it. Delete it. Regret it later.
                </p>
              </div>

              <div className="hover:bg-(--surface) border border-(--border) rounded-3xl p-4 sm:p-6 h-52 flex flex-col justify-between">
                <div>
                  <p className="text-(--text-secondary) text-sm mb-2">Feature</p>
                  <h3 className="text-xl sm:text-2xl font-bold">Responsive UI</h3>
                </div>

                <p className="text-(--text-secondary) text-sm">
                  Looks good on every screen you procrastinate on.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageFadeIn>
  )
}
