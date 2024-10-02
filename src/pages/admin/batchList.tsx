import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaChalkboardTeacher, FaEdit } from 'react-icons/fa';
import CreateBatchForm from '../../components/admin/batch/CreateBatchForm';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { toast } from 'react-toastify';
import { TeacherInterface } from '../../interfaces/teacherInterface';
import { getTeachers } from '../../api/admin/getTeachers';
import { getBatchList } from '../../api/admin/getBatchList';
import { BatchInterface } from '../../interfaces/BatchInterface';
import StudentsListTable from '../../components/student/studentsListTable/StudentsListTable';
import { StudentInterface } from '../../interfaces/studentInterface';
import { getStudentsByBatchId } from '../../api/admin/getStudentsByBatchId';
import { getCourseList } from '../../api/admin/getCourseList';
import { CourseInterface } from '../../interfaces/CourseInterface';
import { message } from 'antd';
import BatchEditModal from '../../components/admin/batchEditModal/BatchEditModal';

const BatchList: React.FC = () => {
  const [batches, setBatches] = useState<BatchInterface[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teachers, setTeachers] = useState<TeacherInterface[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<BatchInterface | null>(null);
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [showEditBatchmodal, setShowEditBatchModal] = useState<boolean>(false)

  const fetchBatchList = useCallback(async () => {
    try {
      const response = await getBatchList();
      setBatches(response);
    } catch (error) {
      message.error('Error fetching batch list');
      console.error('Error:', error);
    }
  }, []);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await getTeachers();
      setTeachers(response);
    } catch (error) {
      toast.error('Error fetching teachers');
      console.error('Error:', error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await getCourseList();
      setCourses(response);
    } catch (error) {
      console.log(`Failed to fetch courses ${error}`);
      message.error('Failed to fetch courses');
    }
  }, []);

  
  const fetchStudents = async (batchId: string) => {
    try {
      const response = await getStudentsByBatchId(batchId);
      if (response.data.length === 0) {
        message.info('No students found for the selected batch');
      }
      setStudents(response.data);
    } catch (error) {
      message.error('Error fetching students for the selected batch');
      console.error('Error:', error);
      setStudents([]);
    }
  }

  useEffect(() => {
    fetchBatchList();
    fetchTeachers();
    fetchCourses();
  }, [fetchBatchList, fetchTeachers, fetchCourses]);

  const handleCreateBatch = () => setShowCreateForm(true);
  const handleCloseForm = () => setShowCreateForm(false);

  const handleBatchClick = (batch: BatchInterface) => {
    setSelectedBatch(batch);
    fetchStudents(batch._id);
  };

  const handleEditBatchModal = (batch: BatchInterface) => {
    console.log(`Editing batch: ${batch._id}`);
    setSelectedBatch(batch);
    setShowEditBatchModal(true);
  };

  const handleCloseBatchModal = () => {
    setSelectedBatch(null);
    setShowEditBatchModal(false);
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Batches</h1>
          <button
            onClick={handleCreateBatch}
            className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaPlus className="mr-2" />
            Create New Batch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div
              key={batch._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleBatchClick(batch)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Batch: {batch.batch}</h2>
                  <div className="flex items-center space-x-4">
                    <FaChalkboardTeacher className="text-gray-500 text-2xl" />
                    <FaEdit
                      className="text-gray-500 text-2xl hover:text-blue-600 cursor-pointer"
                      onClick={() => handleEditBatchModal(batch)}
                    />
                  </div>
                </div>
                <h2 className="text-gray-600 mb-2">Course: {batch.courseId.course}</h2>
                <p className="text-gray-600 mb-2">Batch Teacher: {batch?.teacherId?.firstName} {batch?.teacherId?.lastName}</p>
                <p className="text-gray-600">Capacity: {batch.noOfStudentsCapacity}</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  className="w-full text-center text-gray-700 hover:text-black font-medium transition-colors duration-300"
                  onClick={() => handleBatchClick(batch)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedBatch && (
          <div className="mt-8">
            <StudentsListTable
              students={students}
              actions={false}
              viewprofile={true}
              pagination={false}
              showSearch={false}
            />
          </div>
        )}

        {showCreateForm && (
          <CreateBatchForm
            onClose={handleCloseForm}
            teachers={teachers}
            fetchBatchList={fetchBatchList}
            courses={courses}
          />
        )}
        {showEditBatchmodal &&
          <BatchEditModal
          handleCloseBatchModal={handleCloseBatchModal}
          batch={selectedBatch}
          teachers={teachers}
          fetchBatchList={fetchBatchList}
           />
        }
        </div>
      </div>
    </div>
  );
};

export default BatchList;
