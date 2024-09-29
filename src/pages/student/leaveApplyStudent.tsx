import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { leaveApplyStudentSchema } from '../../schemas/leaveApplyStudent';
import { LeaveStudentInterface } from '../../interfaces/leaveStudentInterface';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { fetchMonthlyLeaves, leaveApplyStudent } from '../../api/student/leaveApplyStudent';
import { LeaveApplicationData } from '../../interfaces/leaveApplicationData';
import { useSelector } from 'react-redux';
import { LocalStudentInterface } from '../../interfaces/LocalStudentInterface';
import { RootState } from '../../redux/store/store';
import { message } from 'antd';

const StudentLeaveApply: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState<LeaveStudentInterface[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo) as LocalStudentInterface;

  const fetchLeaves = useCallback(async () => {
    setIsLoading(true);
    try {
      const month = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`;
      const leaves = await fetchMonthlyLeaves(studentInfo._id, month);
      setApplications(leaves);
    } catch (error) {
      message.error('Failed to fetch leaves');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, studentInfo._id]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async (values: LeaveApplicationData, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      const leaveApplication = {
        ...values,
        studentId: studentInfo._id,
        batchId: studentInfo.batchId,
      };
      console.log('leaveApplication', leaveApplication);

      const response = await leaveApplyStudent(leaveApplication);
      setApplications([response, ...applications]);
      resetForm();
      message.success('Leave application submitted successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };
  const adjustDate = (date: Date | null): string => {
    if (!date) return '';
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return adjustedDate.toISOString().split('T')[0];
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  return (
    <div className="flex h-screen bg-white">
      <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 md:hidden">
              <FaBars className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Leave Application</h1>
          </div>

        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <Formik
              initialValues={{
                startDate: '',
                endDate: '',
                reason: '',
                studentId: studentInfo._id,
                batchId: studentInfo.batchId
              }}
              validationSchema={leaveApplyStudentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="mb-8">
                  <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <DatePicker
                      selected={values.startDate ? new Date(values.startDate) : null}
                      onChange={(date: Date | null) => {
                        setFieldValue('startDate', adjustDate(date));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()} // Prevents selecting dates in the past
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <DatePicker
                      selected={values.endDate ? new Date(values.endDate) : null}
                      onChange={(date: Date | null) => {
                        setFieldValue('endDate', adjustDate(date));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                      dateFormat="yyyy-MM-dd"
                      minDate={values.startDate ? new Date(values.startDate) : new Date()} // Ensures end date is after start date
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                    <Field
                      as="textarea"
                      id="reason"
                      name="reason"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                      rows={4}
                    />
                    <ErrorMessage name="reason" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Applied Leaves</h2>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setSelectedMonth(date);
                    }
                  }}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                />
              </div>
            </div>
            {isLoading ? (
              <p className="text-gray-500 text-center">Loading leaves...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-500 text-center">No leave applications found for the selected month.</p>
            ) : (
              <ul className="space-y-4">
                {applications.map((app) => (
                  <li key={app._id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">
                        {formatDate(app.startDate)} to {formatDate(app.endDate)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === 'pending' ? 'bg-gray-200 text-gray-800' :
                          app.status === 'approved' ? 'bg-green-200 text-green-800' :
                            'bg-red-200 text-red-800'
                        }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600">{app.reason}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLeaveApply;