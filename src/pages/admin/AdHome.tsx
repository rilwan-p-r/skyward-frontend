import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems'
import { getBatchList } from '../../api/admin/getBatchList';
import { BatchInterface } from '../../interfaces/BatchInterface';
import { toast } from 'react-toastify';
import { getTeachers } from '../../api/admin/getTeachers';
import { TeacherInterface } from '../../interfaces/teacherInterface';
import { StudentInterface } from '../../interfaces/studentInterface';
import { getStudents } from '../../api/admin/getStudents';

const AdminHome = () => {
  const [batches,setBatches]=useState<BatchInterface[]>([])
  const [teachers,setTeachers]=useState<TeacherInterface[]>([])
  const [students,setStudents]=useState<StudentInterface[]>([])


  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const resBatches = await getBatchList(); 
        setBatches(resBatches); 
      } catch (error) {
        toast.error('Failed to fetch batch list')
        console.error('Failed to fetch batch list', error);
      }
    };

    fetchBatches(); 
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const resTeachers = await getTeachers(); 
        setTeachers(resTeachers); 
      } catch (error) {
        toast.error('Failed to fetch teacher list')
        console.error('Failed to fetch teacher list', error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const resStudents = await getStudents(); 
        setStudents(resStudents); 
      } catch (error) {
        toast.error('Failed to fetch students list')
        console.error('Failed to fetch students list', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 mt-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardBox title="Students" count={students.length} />
          <DashboardBox title="Teachers" count={teachers.length} />
          <DashboardBox title="Batches" count={batches.length} />
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