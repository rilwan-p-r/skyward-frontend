import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';

const TeacherProtectedRoute: React.FC = () => {
  const teacherInfo = useSelector((state: RootState) => state.teacherInfo.teacherInfo);
  
  return teacherInfo ? <Outlet /> : <Navigate to="/teacher/" />;
};

export default TeacherProtectedRoute;

