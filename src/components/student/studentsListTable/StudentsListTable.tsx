import React, { useState, MouseEvent, useEffect, useCallback } from 'react';
import { StudentInterface } from '../../../interfaces/studentInterface';
import AdminSideStudentProfile from '../../admin/adminSideStudentProfile/AdminSideStudentProfile';
import { CloseOutlined, DeleteRowOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import StudentEditModal from '../../admin/studentEditModal/StudentEditModal';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { deleteStudent } from '../../../api/admin/deleteStudent';
import { Button, Input, message, Pagination, Popconfirm } from 'antd';

interface StudentsListTableProps {
  fetchStudents?: (page: number, limit: number, search?: string) => Promise<any>;
  students?: StudentInterface[];
  actions: boolean;
  viewprofile?: boolean;
  pagination?: boolean;
  showSearch?: boolean;
}

const StudentsListTable: React.FC<StudentsListTableProps> = ({ 
  fetchStudents, 
  students: initialStudents, 
  actions, 
  viewprofile,
  pagination = true,
  showSearch = true
}) => {
  const [students, setStudents] = useState<StudentInterface[]>(initialStudents || []);
  const [selectedStudent, setSelectedStudent] = useState<StudentInterface | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showMobileProfile, setShowMobileProfile] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined) {
      setIsMobileView(width < 768);
    }
  }, [width]);

  const loadStudents = useCallback(async () => {
    if (fetchStudents && pagination) {
      try {
        const result = await fetchStudents(currentPage, pageSize, searchTerm);
        setStudents(result.students);
        setTotalStudents(result.total);
        
        // Select the first student if there are students and none is currently selected
        if (result.students.length > 0 && !selectedStudent) {
          setSelectedStudent(result.students[0]);
        }
      } catch (error) {
        message.error('Failed to fetch students');
      }
    }
  }, [fetchStudents, currentPage, pageSize, pagination, searchTerm, selectedStudent]);

  useEffect(() => {
    if (fetchStudents && pagination) {
      loadStudents();
    }
  }, [loadStudents, fetchStudents, pagination, searchTerm]);

  useEffect(() => {
    if (initialStudents) {
      setStudents(initialStudents);
      setTotalStudents(initialStudents.length);
      
      // Select the first student if there are initial students and none is currently selected
      if (initialStudents.length > 0 && !selectedStudent) {
        setSelectedStudent(initialStudents[0]);
      }
    }
  }, [initialStudents, selectedStudent]);


  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRowClick = (student: StudentInterface) => {
    setSelectedStudent(student);
    if (isMobileView) {
      setShowMobileProfile(true);
    }
  };

  const handleEditModalClick = (e: MouseEvent, student: StudentInterface) => {
    e.stopPropagation();
    setSelectedStudent(student);
    setIsEditModalVisible(true);
  };

  const handleDeleteStudent = async (student: StudentInterface) => {
    try {
      await deleteStudent(student._id);
      loadStudents();
      message.success('Student deleted successfully');
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    loadStudents();
  };

  const handleCloseMobileProfile = () => {
    setShowMobileProfile(false);
    setSelectedStudent(null);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Students</h2>
        {showSearch && (
          <Input.Search
            placeholder="Search students"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        )}
      </div>
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
                          <Popconfirm
                            title="Delete the student"
                            description={`Are you sure to delete ${student.firstName} ${student.lastName}?`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => handleDeleteStudent(student)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button className='border-0' danger><DeleteRowOutlined /></Button>
                          </Popconfirm>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={totalStudents}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                />
              </div>
            )}
          </div>
          {viewprofile && !isMobileView && (
            <div className="w-1/3 md:pl-6">
              {selectedStudent && <AdminSideStudentProfile student={selectedStudent} />}
            </div>
          )}
        </div>
      )}
      {isEditModalVisible && selectedStudent && (
        <StudentEditModal
          handleClose={handleEditModalClose}
          student={selectedStudent}
          fetchStudents={() => loadStudents()}
        />
      )}

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