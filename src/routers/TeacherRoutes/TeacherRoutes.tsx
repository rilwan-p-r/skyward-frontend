import { Route, Routes } from 'react-router-dom'
import TeacherHome from '../../pages/teacher/TeacherHome'
import TeacherLayout from '../../components/teacher/teacherLayout/TeacherLayout'
import TeacherProtectedRoute from '../protectedRoutes/teacherProtectedRoute/TeacherProtectedRoute'
import { TeacherForgotPassword } from '../../pages/teacher/TeacherForgotPassword'
import TakeAttendance from '../../pages/teacher/TakeAttendance'

const TeacherRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<TeacherProtectedRoute />}>
                    <Route element={<TeacherLayout />}>
                        <Route path='/' element={<TeacherHome />} />
                        <Route path='takeAttendance' element={<TakeAttendance />} />
                    </Route>
                </Route>

                <Route element={<TeacherLayout />}>
                    <Route path='forgotPassword' element={<TeacherForgotPassword />} />
                </Route>
            </Routes>
        </>
    )
}

export default TeacherRoutes
