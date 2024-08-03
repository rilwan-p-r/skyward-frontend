import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebarItems'

const AdminHome = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 mt-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardBox title="Students" count={250} />
          <DashboardBox title="Teachers" count={30} />
          <DashboardBox title="Classes" count={15} />
        </div>
      
      </main>
    </div>
  )
}
interface DashboardBoxProps{
  title:string;
  count:number
}
const DashboardBox:React.FC<DashboardBoxProps> = ({ title, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-black">{count}</p>
    </div>
  )
}

export default AdminHome