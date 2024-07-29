import AddTeacher from '../pages/admin/AddTeacher'
import AdminLogin from '../pages/admin/AdminLogin'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/admin/AdHome'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="adminhome" element={<AdminHome/>} />
        <Route path="addteacher" element={<AddTeacher />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
