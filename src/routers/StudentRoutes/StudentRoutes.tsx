import { Route, Routes } from 'react-router-dom'
import StudentHome from '../../pages/student/StudentHome'
import StudentLayout from '../../components/student/studentLayout/StudentLayout'
import StudentProtectedRoute from '../protectedRoutes/studentProtectedRoute/StudentProtectedRoute'
import { StudentForgotPassword } from '../../pages/student/studentForgotPassword'
import ViewMyAttendance from '../../pages/student/viewMyAttendance'


const StudentRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<StudentProtectedRoute />}>
                    <Route element={<StudentLayout />}>
                        <Route path='/' element={<StudentHome />} />
                        <Route path='viewMyAttendance' element={<ViewMyAttendance />} />
                    </Route>
                </Route>


                <Route element={<StudentLayout />}>
                    <Route path='forgotPassword' element={<StudentForgotPassword />} />
                </Route>
            </Routes>
        </>
    )
}

export default StudentRoutes
