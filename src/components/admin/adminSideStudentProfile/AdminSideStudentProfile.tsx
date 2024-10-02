import React from 'react'
import { StudentInterface } from '../../../interfaces/studentInterface'
interface AdminSideStudentProfileProps {
    student: StudentInterface;
  }
const AdminSideStudentProfile:React.FC<AdminSideStudentProfileProps>= ({student}) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={student.imageUrl}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-24 h-24 rounded-full mb-4 transition-transform duration-300 hover:scale-110"
        />
        <h2 className="text-2xl font-bold text-center">
          {student.firstName} {student.lastName}
        </h2>
        <p className="text-gray-500 text-center">{student.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 mb-1">Date of Birth</p>
          <p>{new Date(student?.dateOfBirth).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Gender</p>
          <p>{student.gender}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Phone Number</p>
          <p>{student.phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Emergency Contact</p>
          <p>{student.emergencyContact}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Blood Group</p>
          <p>{student.bloodGroup || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Admission Date</p>
          <p>{new Date(student?.admissionDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-500 mb-1">Address</p>
        <p>{student.address}</p>
      </div>
    </div>
    </>
  )
}

export default AdminSideStudentProfile
