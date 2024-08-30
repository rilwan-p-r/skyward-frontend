
import { Route, Routes } from 'react-router-dom'
import HomeRoute from '../MainRoutes/MainRoutes'
import AdminRoutes from '../AdminRoutes/AdminRoutes'
import StudentRoutes from '../StudentRoutes/StudentRoutes'
import TeacherRoutes from '../teacherRoutes/TeacherRoutes'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/*' element={<HomeRoute />} />
                <Route path='/admin/*' element={<AdminRoutes />} />
                <Route path='/student/*' element={<StudentRoutes />} />
                <Route path='/teacher/*' element={<TeacherRoutes />} />
            </Routes>
        </>
    )
}

export default AppRoutes
