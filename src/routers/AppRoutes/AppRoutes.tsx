
import { Route, Routes } from 'react-router-dom'
import HomeRoute from '../MainRoutes/MainRoutes'
import AdminRoutes from '../AdminRoutes/AdminRoutes'
import StudentRoutes from '../StudentRoutes/StudentRoutes'
import TeacherRoute from '../teacherRoutes/TeacherRoute'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/*' element={<HomeRoute />} />
                <Route path='/admin/*' element={<AdminRoutes />} />
                <Route path='/student/*' element={<StudentRoutes />} />
                <Route path='/teacher/*' element={<TeacherRoute />} />


            </Routes>
        </>
    )
}

export default AppRoutes
