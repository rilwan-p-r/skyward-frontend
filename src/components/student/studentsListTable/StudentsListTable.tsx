import React, { useState, MouseEvent, useEffect } from 'react';
import { StudentInterface } from '../../../interfaces/studentInterface';
import AdminSideStudentProfile from '../../admin/adminSideStudentProfile/AdminSideStudentProfile';
import { CloseOutlined, EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import StudentEditModal from '../../admin/studentEditModal/StudentEditModal';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Swal from 'sweetalert2';
import { deleteStudent } from '../../../api/admin/deleteStudent';
import { message } from 'antd';


interface StudentsListTableProps {
  students: StudentInterface[];
  actions: boolean;
  fetchStudents?: () => void;
  viewprofile?: boolean;
}

const StudentsListTable: React.FC<StudentsListTableProps> = ({ students, actions, fetchStudents, viewprofile }) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentInterface | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showMobileProfile, setShowMobileProfile] = useState<boolean>(false);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined) {
      setIsMobileView(width < 768); // Assuming 768px as the breakpoint for mobile view
    }
  }, [width]);

  const handleRowClick = (student: StudentInterface) => {
    setSelectedStudent(student);
    if (isMobileView) {
      setShowMobileProfile(true);
    }
  };

  const handleEditModalClick = (e: MouseEvent, student: StudentInterface) => {
    e.stopPropagation();
    setSelectedStudent(student);
    setIsEditModalVisible(true)
  }
  const handleDeleteModalClick = async (e: MouseEvent, student: StudentInterface) => {
    e.stopPropagation();
    setSelectedStudent(student);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${student.firstName} ${student.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteStudent(student._id)
      if(fetchStudents){
        fetchStudents();
      }
      message.success('Student deleted successfully')
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false)
  }

  const handleCloseMobileProfile = () => {
    setShowMobileProfile(false);
    setSelectedStudent(null);
  };


  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Students</h2>
      {students.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No students have been added to this course yet.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 mb-6 md:mb-0">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Course</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Admission Date</th>
                    {actions && <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students?.map((student, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(student)}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={student.imageUrl} alt={`${student?.firstName} ${student?.lastName}`} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{`${student?.firstName} ${student?.lastName}`}</div>
                            <div className="text-sm text-gray-500 md:hidden">{student?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{student?.batchId?.courseId?.course} {student?.batchId?.batch}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{student?.phoneNumber}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{new Date(student?.dateOfBirth).toLocaleDateString()}</div>
                      </td>
                      {actions && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <EditOutlined className="text-blue-500 hover:text-blue-700 cursor-pointer pr-4" onClick={(e) => handleEditModalClick(e, student)} />
                          <UserDeleteOutlined className="text-red-500 hover:text-red-600 cursor-pointer" onClick={(e) => handleDeleteModalClick(e, student)} />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {viewprofile && !isMobileView && (
            <div className="w-1/3 md:pl-6">
              {selectedStudent && <AdminSideStudentProfile student={selectedStudent} />}
            </div>
          )}
        </div>
      )}
      {/* --------------------------isEditModalVisible--------------------------------- */}
      {isEditModalVisible &&
        <StudentEditModal
          handleClose={handleEditModalClose}
          student={selectedStudent}
          fetchStudents={fetchStudents || (() => {})}
        />
      }
      


      {viewprofile && isMobileView && showMobileProfile && selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={handleCloseMobileProfile}>
          <div className="relative top-20 mx-auto p-5 border w-11/12 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Student Profile</h3>
              <CloseOutlined onClick={handleCloseMobileProfile} className="cursor-pointer" />
            </div>
            <AdminSideStudentProfile student={selectedStudent} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsListTable;




