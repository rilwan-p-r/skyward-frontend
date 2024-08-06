import { Route, Routes } from 'react-router-dom'
import StudentHome from '../../pages/student/StudentHome'
import StudentLayout from '../../components/student/studentLayout/StudentLayout'
import StudentProtectedRoute from '../protectedRoutes/studentProtectedRoute/StudentProtectedRoute'

const StudentRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<StudentProtectedRoute />}>
                    <Route element={<StudentLayout />}>
                        <Route path='/' element={<StudentHome />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default StudentRoutes
