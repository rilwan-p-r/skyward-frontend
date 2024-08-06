import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';

const StudentProtectedRoute: React.FC = () => {
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);

  return studentInfo ? <Outlet /> : <Navigate to="/studentLogin" />;
};

export default StudentProtectedRoute;

