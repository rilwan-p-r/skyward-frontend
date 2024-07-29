
import { Route, Routes } from 'react-router-dom'
import HomeRoute from './HomeRoute'
import AdminRoutes from './AdminRoutes'

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
