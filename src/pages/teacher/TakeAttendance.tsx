/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import TeacherSidebar from '../../components/teacher/teacherSidebar/TeacherSidebar';
import { FaBars, FaCheck, FaTimes, FaUndo } from 'react-icons/fa';
import { getBatchesAndCoursesByTeacherId } from '../../api/teacher/fetchBatchesByTeacherId';
import { getStudentsByBatchId } from '../../api/teacher/getStudentsByBatchId';
import { submitAttendanceData } from '../../api/teacher/submitAttendanceData';
import { checkAttendanceExists } from '../../api/teacher/checkAttendanceExists';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { LocalTeacherInterface } from '../../interfaces/localTeacherInterface';
import { message } from 'antd';
import { AttendanceSchema } from '../../schemas/attendanceRemarks';
import { StudentAttendanceInterface } from '../../interfaces/StudentAttendance';
import { BatchWithCourseInterface } from '../../interfaces/BatchWithCourse';

const TakeAttendance: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [batches, setBatches] = useState<BatchWithCourseInterface[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<string>('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [attendanceExists, setAttendanceExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const teacher = useSelector((state: RootState) => state.teacherInfo.teacherInfo) as LocalTeacherInterface;
    const initialCheckDone = useRef(false);
    const formikRef = useRef<typeof formik | null>(null);

    const formik = useFormik({
        initialValues: {
            attendanceRecords: [] as StudentAttendanceInterface[],
        },
        validationSchema: AttendanceSchema,
        onSubmit: submitAttendance,
    });

    useEffect(() => {
        if (formik) {
            formikRef.current = formik;
        }
    }, [formik]);


    const fetchStudentsByBatchId = useCallback(async (batchId: string) => {
        try {
            setIsLoading(true);
            const response = await getStudentsByBatchId(batchId);
            if (response && response.data) {
                const students = response.data.map((student: StudentAttendanceInterface) => ({
                    ...student,
                    present: null,
                    remarks: '',
                }));
                formikRef.current?.setFieldValue('attendanceRecords', students); // Use formikRef here
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }finally{
            setIsLoading(false);
        }
    }, []); 
    
    

    const checkAttendance = useCallback(async () => {
        if (selectedBatch && date && !initialCheckDone.current) {
            try {
                const exists = await checkAttendanceExists(selectedBatch, date);
                setAttendanceExists(exists);
                if (exists) {
                    message.info("Attendance for this date has already been taken");
                    formik.setFieldValue('attendanceRecords', []);
                } else {
                    fetchStudentsByBatchId(selectedBatch);
                }
                initialCheckDone.current = true;
            } catch (error) {
                console.error('Error checking attendance:', error);
                message.error("Failed to check attendance. Please try again.");
            }
        }

    }, [selectedBatch, date, fetchStudentsByBatchId]);

    useEffect(() => {
        if (selectedBatch && date) {
            initialCheckDone.current = false;
            checkAttendance();
        }
    }, [selectedBatch, date, checkAttendance]);


    useEffect(() => {
        if (teacher._id) {
            fetchBatchesAndCourses(teacher._id);
        }
    }, [teacher._id]);

    const fetchBatchesAndCourses = async (teacherId: string) => {
        try {
            const response = await getBatchesAndCoursesByTeacherId(teacherId);
            if (response && response.data) {
                setBatches(response.data);
            }
        } catch (error) {
            console.error('Error fetching batches and courses:', error);
        }
    };

    const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const batchId = e.target.value;
        setSelectedBatch(batchId);
        if (!batchId) {
            formik.setFieldValue('attendanceRecords', []);
        }
    };


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0];
        if (selectedDate > today) {
            message.error("Cannot select future dates");
            return;
        }
        setDate(selectedDate);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const markAttendance = (id: string, status: boolean) => {
        const updatedRecords = formik.values.attendanceRecords.map(student =>
            student._id === id ? { ...student, present: status } : student
        );
        formik.setFieldValue('attendanceRecords', updatedRecords);
    };

    const handleRemarks = (id: string, remarks: string) => {
        const updatedRecords = formik.values.attendanceRecords.map(student =>
            student._id === id ? { ...student, remarks } : student
        );
        formik.setFieldValue('attendanceRecords', updatedRecords);
    };

    const resetAttendance = () => {
        const resetRecords = formik.values.attendanceRecords.map(student => ({ ...student, present: null, remarks: '' }));
        formik.setFieldValue('attendanceRecords', resetRecords);
    };

    const clearAttendanceData = () => {
        setSelectedBatch('');
        setDate(new Date().toISOString().slice(0, 10));
        setAttendanceExists(false);
        formik.setFieldValue('attendanceRecords', []);
        initialCheckDone.current = false;
    };

    async function submitAttendance() {
        if (!selectedBatch) {
            message.info('Please select a batch before submitting attendance.');
            return;
        }

        if (attendanceExists) {
            message.info('Attendance for this date has already been taken.');
            return;
        }

        const attendanceData = {
            date,
            batchId: selectedBatch,
            teacherId: teacher._id,
            attendanceRecords: formik.values.attendanceRecords.map(student => ({
                studentId: student._id,
                present: student.present,
                remarks: student.remarks.trim() || undefined,
            })),
        };

        try {
            console.log('attendanceData', attendanceData);
            const response = await submitAttendanceData(attendanceData);
            console.log('submitAttendanceDataResponse', response);

            message.success('Attendance submitted successfully!');

            clearAttendanceData();
        } catch (error) {
            console.error('Error submitting attendance:', error);
            message.error('Failed to submit attendance. Please try again.');
        }
    }

    const ShimmerLoading = () => (
        <div className="animate-pulse">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                    <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                    <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                    <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            <TeacherSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden p-4">
                <div className="flex items-center justify-start mb-4">
                    <button onClick={toggleSidebar} className="p-2 rounded-md mr-4 md:hidden">
                        <FaBars className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Take Attendance</h2>
                </div>

                {/* Date Picker */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="p-1 mt-1 block w-52 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                {/* Batch Selector */}
                <div className="mb-4">
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Select Batch:</label>
                    <select
                        id="batch"
                        value={selectedBatch}
                        onChange={handleBatchChange}
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">Select a batch</option>
                        {batches.map((batch) => (
                            <option key={batch._id} value={batch._id}>
                                {batch.course.course} - {batch.batch} {batch.division}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Students Table */}
                {isLoading ? (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                        <ShimmerLoading />
                    </div>
                ) : (
                    !attendanceExists && formik.values.attendanceRecords.length > 0 && (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formik.values.attendanceRecords.map((student, index) => (
                                    <tr key={student._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.firstName} {student.lastName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => markAttendance(student._id, true)}
                                                    className={`p-2 rounded-full ${student.present === true ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => markAttendance(student._id, false)}
                                                    className={`p-2 rounded-full ${student.present === false ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={student.remarks}
                                                onChange={(e) => handleRemarks(student._id, e.target.value)}
                                                className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Add remarks"
                                            />
                                            {/* Display Formik error for remarks */}
                                            {formik.errors.attendanceRecords && (formik.errors.attendanceRecords as FormikErrors<StudentAttendanceInterface>[])[index]?.remarks && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {(formik.errors.attendanceRecords as FormikErrors<StudentAttendanceInterface>[])[index].remarks}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    )
                )}

                {/* Action Buttons */}
                {!attendanceExists && formik.values.attendanceRecords.length > 0 && (
                    <div className="mt-4 flex justify-between">
                        <button
                            type="button"
                            onClick={resetAttendance}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out flex items-center"
                        >
                            <FaUndo className="mr-2" /> Reset
                        </button>
                        <button
                            type="button"
                            onClick={() => formik.handleSubmit()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Submit Attendance
                        </button>
                    </div>
                )}

                {attendanceExists && (
                    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                        <p className="font-bold">Attendance Already Taken</p>
                        <p>Attendance for this batch and date has already been recorded. Please select a different date or batch.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TakeAttendance;