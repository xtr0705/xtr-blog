import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state)=>state.auth.status);
  const navItems = [
    {
      name:'home',
      slug:'/',
      active:true
    },{
      name:'login',
      slug:'/login',
      active: !authStatus
    },{
      name:'Signup',
      slug:'/signup',
      active: !authStatus
    },{
      name:'All posts',
      slug:'/all-posts',
      active: authStatus
    },{
      name:'Add post',
      slug: '/add-post',
      active: authStatus
    }
  ]
  return (
    <div>
      <nav className='flex' >
        <ul>
          {navItems.map((item)=>
            item.active ? (
              <li
              key={item.name}
              >
                <button 
                  onClick={()=>navigate(item.slug)}
                  className='text-white hover:text-gray-300 text-lg font-medium capitalize'
                  >{item.name}</button>
              </li>
            ):null
          )}
        {authStatus &&(
          <li>
            <LogoutButton />
          </li>
        )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;