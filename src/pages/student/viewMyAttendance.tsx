import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { LocalStudentInterface } from '../../interfaces/LocalStudentInterface';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { FaCalendarAlt, FaBars } from 'react-icons/fa';
import { getMyAttendance } from '../../api/student/getMyAttendance';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<AttendanceRecord | null>(null);

  const student = useSelector((state: RootState) => state.studentInfo.studentInfo) as LocalStudentInterface;

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMyAttendance(student._id, format(currentDate, 'yyyy-MM'));
        setAttendanceRecords(response);
      } catch (err) {
        setError('Failed to fetch attendance records. Please try again later.');
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [student._id, currentDate]);

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

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold p-2">{day}</div>
        ))}
        {dateRange.map((date, idx) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          const record = attendanceRecords.find(r => format(parseISO(r.date), 'yyyy-MM-dd') === formattedDate);
          const isCurrentMonth = isSameMonth(date, currentDate);

          return (
            <motion.div
              key={idx}
              className={`p-2 h-24 border rounded-lg ${
                isCurrentMonth ? 'bg-white' : 'bg-gray-100'
              } ${isToday(date) ? 'border-blue-500 border-2' : ''} relative`}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredDay(record || null)}
              onHoverEnd={() => setHoveredDay(null)}
            >
              <div className="text-right">{format(date, 'd')}</div>
              {record && (
                <div
                  className={`absolute bottom-1 right-1 h-3 w-3 rounded-full ${
                    record.present ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              )}
              {record && record.remarks && (
                <div className="text-base font-semibold mt-1 text-gray-600 truncate" title={record.remarks}>
                  {record.remarks}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

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
                <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance Calendar</h3>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  <input
                    type="month"
                    value={format(currentDate, 'yyyy-MM')}
                    onChange={(e) => setCurrentDate(new Date(e.target.value))}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 p-4">
                {loading ? (
                  <p className="text-center py-4">Loading attendance records...</p>
                ) : error ? (
                  <p className="text-center py-4 text-red-500">{error}</p>
                ) : (
                  <>
                    {renderCalendar()}
                    {hoveredDay && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-4 p-4 bg-gray-100 rounded-lg shadow"
                      >
                        <p className="font-semibold">{format(parseISO(hoveredDay.date), 'MMMM d, yyyy')}</p>
                        <p className={hoveredDay.present ? 'text-green-600' : 'text-red-600'}>
                          {hoveredDay.present ? 'Present' : 'Absent'}
                        </p>
                        {/* {hoveredDay.remarks && <p className="mt-2 ">Remarks: {hoveredDay.remarks}</p>} */}
                      </motion.div>
                    )}
                  </>
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