import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';

interface Teacher {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

const TeacherHome = () => {
    const teacher = useSelector((state: RootState) => state.teacherInfo.teacherInfo) as Teacher;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <img src={teacher.imageUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-center mb-2">{`${teacher.firstName} ${teacher.lastName}`}</h2>
                        <p className="text-gray-600 text-center mb-4">{teacher.email}</p>
                        <button className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">Take Attendance</h3>
                            <button className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition duration-300">
                                Mark Attendance
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">Assign Tasks</h3>
                            <button className="bg-purple-500 text-white w-full py-2 rounded-md hover:bg-purple-600 transition duration-300">
                                Create Assignment
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">Update Marksheets</h3>
                            <button className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                                Update Marks
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">Apply for Leave</h3>
                            <button className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition duration-300">
                                Submit Leave Request
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">View Classes</h3>
                            <p className="text-gray-600">N/A - Classes not implemented yet</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">Class Group Chats</h3>
                            <p className="text-gray-600">N/A - Class chats not implemented yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherHome;