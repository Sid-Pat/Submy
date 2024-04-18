import { useContext } from 'react';
import {Link,NavLink} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function Header() {
const {loggedIn,setLoggedIn,setTeam} = useContext(UserContext);
const logOut = async () => {
    console.log("logging out")
    try{
        await signOut(auth);
        setLoggedIn(false);
        setTeam([]);
    }catch(err){
        console.log(err);
    }
    console.log(auth.currentUser)
}
  return (
      <header className="shadow sticky z-50 top-0">
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link to="/" className="flex items-center">
                      <img
                          src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                          className="mr-3 h-12"
                          alt="Logo"
                      />
                  </Link>

                  <div className="flex items-center lg:order-2">
                     {loggedIn?
                     (<Link
                          onClick={logOut}
                          to="/login"
                          className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Log out
                      </Link>)
                      :
                      (<Link
                          to="/login"
                          className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Log in
                      </Link>)}
                      <Link
                          to="#"
                          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Get started
                      </Link>
                  </div>
                  <div
                      className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                      id="mobile-menu-2"
                  >
                      <ul className="flex flex-row mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                          <li className='flex flex-row space-x-4'>
                              <NavLink
                                  to='/'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Home
                              </NavLink>
                              <NavLink
                                  to='/about'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  About
                              </NavLink>
                              <NavLink
                                  to='/contact'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Contact Us
                              </NavLink>
                              <NavLink
                                  to="/team"
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Team
                              </NavLink>
                              <NavLink
                                  to='/project'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Project
                              </NavLink>
                              <NavLink
                                  to='/projectlist'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  ProjectList
                              </NavLink>
                          </li>
                          
                          
                      </ul>
                  </div>
              </div>
          </nav>
      </header>
  );
}

