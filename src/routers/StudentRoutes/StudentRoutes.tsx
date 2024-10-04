import React from 'react';
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
import { RootState } from '../../redux/store/store'
import { useSelector } from 'react-redux'
import { SocketProvider } from '../../context/SocketContext'
import { NotificationProvider } from '../../context/NotificationContext'
import MessageToast from '../../components/studentChat/MessageToast';


const StudentRoutes: React.FC = () => {
    const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);
    const batchId = studentInfo?.batchId || '';
    const userId = studentInfo?._id || '';
    const userName = `${studentInfo?.firstName} ${studentInfo?.lastName}`;

    return (
        <NotificationProvider>
            <SocketProvider batchId={batchId} role="student" userId={userId} userName={userName}>
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
                <MessageToast />
            </SocketProvider>
        </NotificationProvider>
    )
}

export default StudentRoutes