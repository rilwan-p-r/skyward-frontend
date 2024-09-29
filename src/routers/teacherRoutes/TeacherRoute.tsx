import { Route, Routes } from 'react-router-dom'
import TeacherHome from '../../pages/teacher/TeacherHome'
import TeacherLayout from '../../components/teacher/teacherLayout/TeacherLayout'
import TeacherProtectedRoute from '../protectedRoutes/teacherProtectedRoute/TeacherProtectedRoute'
import { TeacherForgotPassword } from '../../pages/teacher/TeacherForgotPassword'
import TakeAttendance from '../../pages/teacher/TakeAttendance'
import TeacherBatchChat from '../../pages/teacher/TeacherBatchChat'
import StudentsLeaveRequest from '../../pages/teacher/studentsLeaveRequest'

const TeacherRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<TeacherProtectedRoute />}>
                    <Route element={<TeacherLayout />}>
                        <Route path='/' element={<TeacherHome />} />
                        <Route path='takeAttendance' element={<TakeAttendance />} />
                        <Route path='TeacherBatchChat' element={<TeacherBatchChat />} />
                        <Route path='studentsLeaveRequest' element={<StudentsLeaveRequest />} />
                    </Route>
                </Route>

                <Route element={<TeacherLayout />}>
                    <Route path='forgotPassword' element={<TeacherForgotPassword />} />
                </Route>
            </Routes>
        </>
    )
}

export default TeacherRoute
