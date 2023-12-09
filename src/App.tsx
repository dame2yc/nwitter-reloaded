import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./routes/Home"
import Profile from "./routes/Profile"
import Login from "./routes/Login"
import CreateAccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element:<Home/>
      },
      {
        path: "profile",
        element:<Profile/>
      }
    ],
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "create-account",
    element:<CreateAccount/>
  }
])
const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing:border-box;
  }
  body{
    background-color:black;
    color:white;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 
    sans-serif
  }
`

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    // setIsLoading(false);
    setIsLoading(false)
    // setTimeout(() =>  setIsLoading(false), 2000 )
  };
  useEffect(() => {
    init();
  },[])
  return (
    <>
      <GlobalStyles />
      {
        isLoading
          ? <LoadingScreen />
          : <RouterProvider router={router} />
      }
        
    </>
  )
}

export default App