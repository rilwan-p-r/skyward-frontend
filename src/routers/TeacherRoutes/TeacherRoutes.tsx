import { Route, Routes } from 'react-router-dom'
import TeacherHome from '../../pages/teacher/TeacherHome'
import TeacherLayout from '../../components/teacher/teacherLayout/TeacherLayout'
import TeacherProtectedRoute from '../protectedRoutes/teacherProtectedRoute/TeacherProtectedRoute'

const TeacherRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<TeacherProtectedRoute />}>
                    <Route element={<TeacherLayout />}>
                        <Route path='/' element={<TeacherHome />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default TeacherRoutes
