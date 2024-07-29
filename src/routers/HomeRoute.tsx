import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../pages/HomeScreen'

const HomeRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomeScreen />}/>
            </Routes>
        </>
    )
}

export default HomeRoute
