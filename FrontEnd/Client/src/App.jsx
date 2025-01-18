
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import HeroSection from './pages/student/HeroSection'
import Login from './pages/login'
import MainLayout from './Layout/MainLayout'
import { RouterProvider } from 'react-router'
import Course from './pages/student/Course'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path:"/",
      element: 
      <>
        <HeroSection/>
        <Course/>
      </>
      },
      {
        path: "login",
        element: <Login/>
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
