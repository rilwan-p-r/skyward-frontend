import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routers/AppRoutes/AppRoutes"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
