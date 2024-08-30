import { MouseEvent, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { getTeachers } from '../../api/admin/getTeachers';
import { toast } from 'react-toastify';
import { TeacherInterface } from '../../interfaces/teacherInterface';
import TeacherEditModal from '../../components/admin/teacherEditModal/TeacherEditModal';
import Swal from 'sweetalert2';
import { message } from 'antd';
import { deleteTeacher } from '../../api/admin/deleteTeacher';


const TeachersList = () => {
  const [teachers, setTeachers] = useState<TeacherInterface[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherInterface | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      console.log('listtt', response);
      setTeachers(response);
    }
    catch (error) {
      toast.error('Error fetching teachers');
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleRowClick = (teacher: TeacherInterface) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedTeacher(null)
    setIsModalOpen(false);
  }

  const handleDeleteModalClick = async (e: MouseEvent, teacher: TeacherInterface) => {
    e.stopPropagation();
    setSelectedTeacher(teacher);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${teacher.firstName} ${teacher.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteTeacher(teacher._id)
      fetchTeachers();
      message.success('Teacher deleted successfully')
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto flex-grow p-6 lg:p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-4">
                <img src={teacher.imageUrl} alt={`${teacher.firstName} ${teacher.lastName}`} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold text-center mb-2">{`${teacher.firstName} ${teacher.lastName}`}</h3>
                <p className="text-gray-600 text-center mb-4"><span className='font-semibold'>Subject: </span>{teacher.subject}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {teacher.email}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Experience:</span> {teacher.yearsOfExperience} years</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {teacher.address}</p>
                  {/* <p className="text-sm text-gray-600"><span className="font-medium">Verified:</span> {teacher.verified ? 'Yes' : 'No'}</p> */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                <button
                  className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  onClick={() => handleRowClick(teacher)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-white border text-black rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300"
                  onClick={(e) => handleDeleteModalClick(e, teacher)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen &&
        <TeacherEditModal
          handleCloseModal={handleCloseModal}
          teacher={selectedTeacher}
          fetchTeachers={fetchTeachers}
        />
      }
    </div>
  );
}

export default TeachersList;