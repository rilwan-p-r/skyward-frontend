import React from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { getStudents } from '../../api/admin/getStudents';
import { toast } from 'react-toastify';
import StudentsListTable from '../../components/student/studentsListTable/StudentsListTable';

const StudentsList: React.FC = () => {
  const fetchStudents = async (page: number, limit: number, search?: string) => {
    try {
      const response = await getStudents(page, limit, search);
      console.log('student list:', response);
      return response;
    } catch (error) {
      toast.error('Error fetching students');
      throw error;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="fixed h-full">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto ml-64">
        <div className="p-6 lg:p-10">
          <StudentsListTable 
            fetchStudents={fetchStudents}
            actions={true} 
            viewprofile={true}
            showSearch={true}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentsList;