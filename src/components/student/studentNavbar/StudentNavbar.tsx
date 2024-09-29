import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logout, setStudentInfo } from '../../../redux/slices/studentSlices/StudentSlices';
import { toast } from 'react-toastify';
import { studentLogout } from '../../../api/student/studentAuth';
import { getStudentById } from '../../../api/student/getStudentById';
import { getBatchAndCourseByBatchId } from '../../../api/student/getBatchAndCourseByBatchId';
import { LocalStudentInterface } from '../../../interfaces/LocalStudentInterface';

const StudentNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const student = useSelector((state: RootState) => state.studentInfo.studentInfo);
  const studentId = student?._id;
  
  useEffect(() => {
    const fetchUpdatedStudentInfo = async () => {
        if (studentId) {
            try {
                const updatedStudent = await getStudentById(studentId);
                if (updatedStudent?.status === 200) {
                    const { _id, firstName, lastName, email, imageUrl, batchId } = updatedStudent.data;
                    
                    let studentData: LocalStudentInterface = {
                        _id,
                        firstName,
                        lastName,
                        email,
                        imageUrl,
                        batchId,
                    };

                    // Fetch batch and course details
                    if (batchId) {
                        const batchAndCourseResponse = await getBatchAndCourseByBatchId(batchId);
                        
                        if (batchAndCourseResponse?.data) {
                            studentData = {
                                ...studentData,
                                courseDetails: batchAndCourseResponse.data.courseId,
                                batchDetails: batchAndCourseResponse.data.batch
                            };
                        }
                    }

                    dispatch(setStudentInfo(studentData));
                }
            } catch (error) {
                console.error('Error fetching updated student info:', error);
            }
        }
    };

    fetchUpdatedStudentInfo();
}, [studentId, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Question",
      text: "Are you sure you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    })
    if (result.isConfirmed) {
      const logoutResponse = await studentLogout()
      console.log('logoutResponse', logoutResponse);
      dispatch(logout());

      navigate('/studentLogin')
      toast.success('Logout Successfull!')
    }

  }

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>Skywards</div>
          </div>
          {student && (
            <div className="hidden md:flex items-center space-x-4">
              <img src={student.imageUrl} alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{student.firstName
                } {student.lastName
                  }</p>

                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 focus:outline-none"
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && student && (
          <div className="md:hidden" id="menu">
            <div className="px-4 py-2 border-b">
              <img src={student.imageUrl} alt="Profile" className="w-10 h-10 rounded-full mb-2" />
              <p className="font-semibold">{student.firstName} {student.lastName}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500 focus:outline-none"
              aria-label="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default StudentNavbar;