import { Route, Routes } from 'react-router-dom';
import HomeScreen from '../../pages/HomeScreen';
import { StudentTeachersLoginPortal } from '../../pages/StudentTeachersLoginPortal';
import { TeacherLogin } from '../../pages/teacher/TeacherLogin';
import { StudentLogin } from '../../pages/student/StudentLogin';
import MainLayout from '../../components/main/mainLayout/MainLayout';
import NotFound from '../../pages/errorPages/NotFound';

const HomeRoute = () => {
    return (

        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="Portals" element={<StudentTeachersLoginPortal />} />
                <Route path="teacherLogin" element={<TeacherLogin />} />
                <Route path="StudentLogin" element={<StudentLogin />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>

    );
};

export default HomeRoute;
