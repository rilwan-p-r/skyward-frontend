import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import Navbar from '../components/main/navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export const StudentTeachersLoginPortal = () => {
  const navigate = useNavigate()

  const teacherInfo = useSelector((state: RootState) => state.teacherInfo.teacherInfo);
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);

  useEffect(()=>{
    if (teacherInfo) {
      navigate('/teacher/')
    }else if(studentInfo){
      navigate('/student/')
    }
  },[studentInfo,teacherInfo,navigate])

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Welcome to the Learning Portal</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <LoginOption
            title="Student Login"
            icon={<FaUserGraduate className="text-5xl" />}
            description="Access your courses, assignments, and grades"
            role="student"
            conditions={[
              "Must be an enrolled student",
              "Requires valid student ID",
              "Age restrictions may apply"
            ]}
          />
          <LoginOption
            title="Teacher Login"
            icon={<FaChalkboardTeacher className="text-5xl" />}
            description="Manage your classes, create assignments, and track progress"
            role="teacher"
            conditions={[
              "Must be a registered teacher",
              "Requires valid teacher credentials",
              "Background check required"
            ]}
          />
        </div>
      </div>
    </div>
    </>
  )
}

interface LoginOptionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  role: 'student' | 'teacher';
  conditions: string[];
}

const LoginOption = ({ title, icon, description, role, conditions }: LoginOptionProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/${role}Login`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-black mb-4 flex justify-center">{icon}</div>
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <ul className="text-sm text-gray-500 mb-6">
        {conditions.map((condition, index) => (
          <li key={index} className="mb-1">• {condition}</li>
        ))}
      </ul>
      <button 
        onClick={handleLogin}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
      >
        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
      </button>
    </div>
  )
}