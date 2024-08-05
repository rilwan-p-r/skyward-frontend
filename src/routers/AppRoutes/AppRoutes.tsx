
import { Route, Routes } from 'react-router-dom'
import HomeRoute from '../MainRoutes/MainRoutes'
import AdminRoutes from '../AdminRoutes/AdminRoutes'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/*' element={<HomeRoute />} />
                <Route path='/admin/*' element={<AdminRoutes />} />
            </Routes>
        </>
    )
}

export default AppRoutes
