import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { getStudents } from '../../api/admin/getStudents';
import { toast } from 'react-toastify';
import { StudentInterface } from '../../interfaces/studentInterface';
import StudentsListTable from '../../components/student/studentsListTable/StudentsListTable';


const StudentsList = () => {
  const [students, setStudents] = useState<StudentInterface[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      console.log('student list:', response);
      setStudents(response);
    } catch (error) {
      toast.error('Error fetching students');
    }
  };

  // const handleDeleteStudent = async (id: string) => {
  //   try {
  //     await deleteStudent(id);
  //     setStudents(students.filter((student) => student._id !== id));
  //     toast.success('Student deleted successfully');
  //   } catch (error) {
  //     toast.error('Error deleting student');
  //   }
  // };
  
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto flex-grow p-6 lg:p-10">
        <StudentsListTable 
        students={students}
        actions={true} 
        fetchStudents={fetchStudents}
        viewprofile={true}
        />
      </div>
    </div>
  );
}

export default StudentsList;
