import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';

interface Student {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

const StudentHome = () => {
    const student = useSelector((state: RootState) => state.studentInfo.studentInfo) as Student;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <img src={student.imageUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2">{`${student.firstName} ${student.lastName}`}</h2>
            <p className="text-gray-600 text-center mb-4">{student.email}</p>
            <div className="flex justify-between mb-4">
              <p>Overall Ranking: <span className="font-bold">N/A</span></p>
              <p>MCQ Ranking: <span className="font-bold">N/A</span></p>
            </div>
            <button className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Attendance</h3>
              <p className="text-3xl font-bold text-green-500">N/A</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Marklist</h3>
              <p>No marks available</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">MCQ Competition</h3>
              <button className="bg-purple-500 text-white w-full py-2 rounded-md hover:bg-purple-600 transition duration-300">
                Attend MCQ Competition
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Apply Leave</h3>
              <button className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                Apply for Leave
              </button>
            </div>
          </div>
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Class Group Chat</h3>
            <button className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition duration-300">
              Open Class Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;