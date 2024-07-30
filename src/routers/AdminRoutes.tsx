import AddTeacher from '../pages/admin/AddTeacher'
import AdminLogin from '../pages/admin/AdminLogin'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/admin/AdHome'
import TeachersList from '../pages/admin/TeachersList'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="adminhome" element={<AdminHome/>} />
        <Route path="addteacher" element={<AddTeacher />} />
        <Route path="teacherslist" element={<TeachersList />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
