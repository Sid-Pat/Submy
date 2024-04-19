import { useContext } from 'react';
import {Link,NavLink} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import  { useRef, useState } from 'react';
import { Tour } from 'antd';
import { Typography } from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

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

const ref1 = useRef(null);
const ref2 = useRef(null);
const ref3 = useRef(null);
const ref4 = useRef(null);
const ref5 = useRef(null);
const ref6 = useRef(null);
const [open, setOpen] = useState(false);
const steps = [
{
    title: 'Homepage',
    description: 'Contains all the access points.',
    target: () => ref1.current,
},
{
    title: 'About us',
    description: 'About us and the project "Submy".',
    target: () => ref2.current,
},
{
    title: 'Suggestions for us',
    description: 'Send us any suggestions or feature required. We always are quick to check :)',
    target: () => ref3.current,
},
{
    title: 'Create or view team',
    description: 'First login to access this feature.',
    target: () => ref4.current,
},
{
    title: 'Submit or view project status',
    description: 'Login required to access this feature. See your marks, comments or suggestions if any.',
    target: () => ref5.current,
},
{
    title: 'View all projects',
    description: 'Look what others have done and view their projects.',
    target: () => ref6.current,
},
];


  return (
      <header className="shadow sticky z-50 top-0">
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link to="/" className="flex items-center">
                    <Typography variant="h1" className='text-orange-700'>Submy <BuildCircleIcon sx={{transform:"scale(2.5)" }}/></Typography>
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
                          onClick={()=>setOpen(true)}
                      >
                          Tour
                      </Link>
                  </div>
                  <div
                      className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                      id="mobile-menu-2"
                  >
                      <ul className="flex flex-row mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                          <li className='flex flex-row space-x-4'>
                              <NavLink
                                  ref={ref1}
                                  to='/'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Home
                              </NavLink>
                              <NavLink
                                  ref={ref2}
                                  to='/about'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  About
                              </NavLink>
                              <NavLink
                                  to='/contact'
                                  ref={ref3}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Contact Us
                              </NavLink>
                              <NavLink
                                  to="/team"
                                  ref={ref4}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Team
                              </NavLink>
                              <NavLink
                                  to='/project'
                                  ref={ref5}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-orange-700":"text-grey-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Project
                              </NavLink>
                              <NavLink
                                  to='/projectlist'
                                  ref={ref6}
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
          <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
      </header>
  );
}

