import { Route, Routes } from 'react-router-dom';
import HomeScreen from '../../pages/HomeScreen';
import { StudentTeachersLoginPortal } from '../../pages/StudentTeachersLoginPortal';
import { TeacherLogin } from '../../pages/teacher/TeacherLogin';
import { StudentLogin } from '../../pages/student/StudentLogin';
import TeacherProtectedRoute from '../protectedRoutes/teacherProtectedRoute/TeacherProtectedRoute';

const HomeRoute = () => {
    return (

        <Routes>

                <Route path="/" element={<HomeScreen />} />
                <Route path="/Portals" element={<StudentTeachersLoginPortal />} />

                <Route path="/teacherLogin" element={<TeacherLogin />} />

                <Route element={<TeacherProtectedRoute/>}>
                
                </Route>

                
                
                
                <Route path="/studentLogin" element={<StudentLogin />} />
                
        </Routes>

    );
};

export default HomeRoute;
