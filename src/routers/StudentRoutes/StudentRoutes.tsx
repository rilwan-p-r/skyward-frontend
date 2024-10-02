import { Route, Routes } from 'react-router-dom'
import StudentHome from '../../pages/student/StudentHome'
import StudentLayout from '../../components/student/studentLayout/StudentLayout'
import StudentProtectedRoute from '../protectedRoutes/studentProtectedRoute/StudentProtectedRoute'
import { StudentForgotPassword } from '../../pages/student/studentForgotPassword'
import ViewMyAttendance from '../../pages/student/viewMyAttendance'
import StudentBatchChat from '../../pages/student/studentBatchChat'
import StudentLeaveApply from '../../pages/student/leaveApplyStudent'
import MCQCompetitionListStudent from '../../pages/student/mcqCompetitionListStudent'
import StudentReview from '../../pages/student/StudentReview'
import NotFound from '../../pages/errorPages/NotFound'


const StudentRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<StudentProtectedRoute />}>
                    <Route element={<StudentLayout />}>
                        <Route path='/' element={<StudentHome />} />
                        <Route path='viewMyAttendance' element={<ViewMyAttendance />} />
                        <Route path='BatchChat' element={<StudentBatchChat />} />
                        <Route path='studentLeaveApply' element={<StudentLeaveApply />} />
                        <Route path='MCQCompetitionList' element={<MCQCompetitionListStudent />} />
                        <Route path='writeReview' element={<StudentReview />} />
                    </Route>
                </Route>


                <Route element={<StudentLayout />}>
                    <Route path='forgotPassword' element={<StudentForgotPassword />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default StudentRoutes
