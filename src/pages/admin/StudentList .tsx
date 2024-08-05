import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { getStudents } from '../../api/admin/getStudents';
import { toast } from 'react-toastify';

interface StudentInterface {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  bloodGroup?: string;
  admissionDate: Date;
  imageUrl: string;
  verified: boolean;
  password: string;
}

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

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex bg-gray-100">
      <AdminSidebar />
      <div className="flex-grow p-6 lg:p-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Admission Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-14 rounded-full" src={student.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{`${student?.firstName} ${student?.lastName}`}</div>
                        <div className="text-sm text-gray-500">{student.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student?.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student?.phoneNumber}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(student?.dateOfBirth).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-black hover:text-gray-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;