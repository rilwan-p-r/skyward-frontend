import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { LocalStudentInterface } from '../../interfaces/LocalStudentInterface';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { FaCalendarAlt, FaCheck, FaTimes, FaBars } from 'react-icons/fa';
import { getMyAttendance } from '../../api/student/getMyAttendance';


interface AttendanceRecord {
  date: string;
  present: boolean;
  remarks?: string;
}

const ViewMyAttendance: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const student = useSelector((state: RootState) => state.studentInfo.studentInfo) as LocalStudentInterface;

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMyAttendance(student._id, selectedMonth);
        setAttendanceRecords(response);
        console.log('viewed');
        
      } catch (err) {
        setError('Failed to fetch attendance records. Please try again later.');
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [student._id, selectedMonth]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const calculateAttendanceStats = () => {
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(record => record.present).length;
    const attendancePercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    return {
      totalDays,
      presentDays,
      absentDays: totalDays - presentDays,
      attendancePercentage: attendancePercentage.toFixed(2)
    };
  };

  const stats = calculateAttendanceStats();

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">My Attendance</h1>
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance Overview</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Monthly attendance statistics</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Total Days</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stats.totalDays}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Present Days</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stats.presentDays}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Absent Days</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stats.absentDays}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Attendance Percentage</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stats.attendancePercentage}%</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance Details</h3>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200">
                {loading ? (
                  <p className="text-center py-4">Loading attendance records...</p>
                ) : error ? (
                  <p className="text-center py-4 text-red-500">{error}</p>
                ) : attendanceRecords.length === 0 ? (
                  <p className="text-center py-4">No attendance records found for the selected month.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {attendanceRecords.map((record, index) => (
                      <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${record.present ? 'bg-green-100' : 'bg-red-100'}`}>
                              {record.present ? (
                                <FaCheck className="h-6 w-6 text-green-600" />
                              ) : (
                                <FaTimes className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                              </div>
                              <div className="text-sm text-gray-500">
                                {record.present ? 'Present' : 'Absent'}
                              </div>
                            </div>
                          </div>
                          {record.remarks && (
                            <div className="text-sm text-gray-500">{record.remarks}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewMyAttendance;