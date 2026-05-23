import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: 'home',
      slug: '/',
      active: true
    }, {
      name: 'login',
      slug: '/login',
      active: !authStatus
    }, {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    }, {
      name: 'All posts',
      slug: '/all-posts',
      active: authStatus
    }, {
      name: 'Add post',
      slug: '/add-post',
      active: authStatus
    }
  ]
  return (
    <header className='w-full border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50 backdrop-blur'>

      <div className='max-w-7xl mx-auto px-4 py-4 flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 items-center'>

        <Link
          to="/"
          className="text-2xl md:text-3xl font-black text-white tracking-tight hover:text-zinc-300 transition"
        >
          xtr.Blog
        </Link>

        <nav className='flex justify-center'>

          <ul className='flex flex-wrap justify-center items-center gap-4 md:gap-8'>

            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                >
                  <button
                    onClick={() => navigate(item.slug)}
                    className='text-zinc-300 hover:text-white transition text-base font-medium capitalize'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

          </ul>


        </nav>

        <div className='flex justify-center md:justify-end w-full'>
          {authStatus && (
            <li className='ml-4'>
              <LogoutButton />
            </li>
          )}
        </div>

      </div>

    </header>
  );
}

export default Header;