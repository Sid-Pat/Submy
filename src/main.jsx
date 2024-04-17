import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import UserContextProvider from './context/UserContextProvider.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import GitHub from './components/Github/Github.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Team from './components/Team/Team.jsx'
import Project from './components/Project/Project.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='user/' element={<User/>}>
        <Route path=':userid' element={<User/>}/>
      </Route>
      <Route path='github' element={<GitHub/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/> } />
      <Route path='team' element={ <Team/> }/>
      <Route path='project' element={<Project/>} />
      <Route path='*' element={<div>Not Found</div>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    {/* <App /> */}
    <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>,
)
