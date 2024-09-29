import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logout, setTeacherInfo } from '../../../redux/slices/teacherSlices/TeacherSlices';
import { toast } from 'react-toastify';
import { teacherLogout } from '../../../api/teacher/teacherAuth';
import { getTeacherById } from '../../../api/teacher/getTeacherById';

const TeacherNavbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const teacher = useSelector((state: RootState) => state.teacherInfo.teacherInfo);
    const teacherId = teacher?._id
console.log(teacher);

    useEffect(() => {
        if (teacherId) {
            const fetchUpdatedTeacherInfo = async () => {
                try {
                    const updatedTeacher = await getTeacherById(teacherId); 
                    if(updatedTeacher?.status===200){
                        console.log('updatedTeacher',updatedTeacher);
                        const { _id, firstName, lastName, email, imageUrl } = updatedTeacher.data;
                        const obj = {
                            _id,
                            firstName,
                            lastName,
                            email,
                            imageUrl
                          };
                        dispatch(setTeacherInfo(obj)); 
                    }
                } catch (error) {
                    console.error('Error fetching updated teacher info:', error);
                }
            };

            fetchUpdatedTeacherInfo();
        }
    }, [teacherId, dispatch]);

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
            const logoutResponse = await teacherLogout()
            console.log('logoutResponse', logoutResponse);
            dispatch(logout());

            navigate('/teacherLogin')
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
                    {teacher && (
                        <div className="hidden md:flex items-center space-x-4">
                            <img src={teacher.imageUrl} alt="Profile" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{teacher.firstName
                                } {teacher.lastName
                                    }</p>

                                <p className="text-sm text-gray-600">{teacher.email}</p>
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
                {menuOpen && teacher && (
                    <div className="md:hidden" id="menu">
                        <div className="px-4 py-2 border-b">
                            <img src={teacher.imageUrl} alt="Profile" className="w-10 h-10 rounded-full mb-2" />
                            <p className="font-semibold">{teacher.firstName} {teacher.lastName}</p>
                            <p className="text-sm text-gray-600">{teacher.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 hover:bg-gray-200 w-full text-left text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </header>
        </>
    );
};

export default TeacherNavbar;