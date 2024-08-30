import React from 'react'
import { StudentInterface } from '../../../interfaces/studentInterface'
interface AdminSideStudentProfileProps {
    student: StudentInterface;
  }
const AdminSideStudentProfile:React.FC<AdminSideStudentProfileProps>= ({student}) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={student.imageUrl}
          alt={`${student.firstName} ${student.lastName}`}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-500">{student.email}</p>
        </div>
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

      {/* <div className="mt-4 flex justify-end">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            student.verified
              ? 'bg-green-100 text-green-500'
              : 'bg-yellow-100 text-yellow-500'
          }`}
        >
          {student.verified ? 'Verified' : 'Unverified'}
        </span>
      </div> */}
    </div>
    </>
  )
}

export default AdminSideStudentProfile
