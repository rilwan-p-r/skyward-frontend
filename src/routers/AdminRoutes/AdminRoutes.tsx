import AddTeacher from '../../pages/admin/AddTeacher'
import AdminLogin from '../../pages/admin/AdminLogin'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../../pages/admin/AdHome'
import TeachersList from '../../pages/admin/TeachersList'
import AdminProtectedRoute from '../protectedRoutes/AdminProtectedRoutes/AdminProtectedRoute'
import AddStudent from '../../pages/admin/AddStudent'
import StudentsList from '../../pages/admin/StudentList '
import BatchList from '../../pages/admin/batchList'
import CourseList from '../../pages/admin/courseList'



const AdminRoutes = () => {

  return (
    <>
      <Routes>
        <Route element={<AdminProtectedRoute />}>
          <Route path="adminhome" element={<AdminHome />} />
          <Route path="addteacher" element={<AddTeacher />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="teacherslist" element={<TeachersList />} />
          <Route path="studentslist" element={<StudentsList />} />
          <Route path="batches" element={<BatchList />} />
        </Route>
          <Route path="Courses" element={<CourseList />} />


        {/* Admin login route does not need protection */}
          <Route path='/' element={<AdminLogin />} />

      </Routes>
    </>
  )
}

export default AdminRoutes
