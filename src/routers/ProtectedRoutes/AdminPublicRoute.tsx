import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store/store';

const AdminPublicRoute: React.FC = () => {
  const adminInfo = useSelector((state: RootState) => state.adminInfo.adminInfo);
  console.log('publucccc',adminInfo);
  

  return adminInfo ? <Navigate to={'/admin/adminhome'}/> : <Outlet/>
};

export default AdminPublicRoute;

