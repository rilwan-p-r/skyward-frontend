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
import AdminMCQCompetitionList from '../../pages/admin/AdminMCQCompetitions'
import AddMCQCompetition from '../../pages/admin/AddMCQCompetition'
import AdminAnnouncement from '../../pages/admin/AdminAnnouncement'
import NotFound from '../../pages/errorPages/NotFound'



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
          <Route path="AdminMCQCompetitionList" element={<AdminMCQCompetitionList />} />
          <Route path="AddMCQCompetition" element={<AddMCQCompetition />} />
          <Route path="AdminAnnouncement" element={<AdminAnnouncement />} />
          <Route path="Courses" element={<CourseList />} />
        </Route>


        {/* Admin login route does not need protection */}
          <Route path='/' element={<AdminLogin />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
