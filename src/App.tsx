
import { RouterProvider } from "react-router-dom"
import { router } from "./routers/MainRouters"

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>

    </>
  )
}

export default App
