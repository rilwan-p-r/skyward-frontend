import { FaTimes } from 'react-icons/fa';
import { createBatchFormSchema, } from '../../../schemas';
import { useFormik } from 'formik';
import { TeacherInterface } from '../../../interfaces/teacherInterface';
import { BatchFormValues, } from '../../../interfaces/batchFormValues';
import { createBatch, } from '../../../api/admin/createBatch';
import { toast } from 'react-toastify';
import { CourseInterface } from '../../../interfaces/CourseInterface';


interface CreateBatchFormProps {
  onClose: () => void;
  teachers: TeacherInterface[];
  courses: CourseInterface[];
  fetchBatchList: () => void;
}

const CreateBatchForm: React.FC<CreateBatchFormProps> = ({ onClose, teachers, fetchBatchList, courses }) => {


  const formik = useFormik<BatchFormValues>({
    initialValues: {
      courseId: '',
      division: '',
      batch: '',
      teacherId: '',
      noOfStudentsCapacity: '',
    },
    validationSchema: createBatchFormSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (values: BatchFormValues) => {
    try {
      const submittedValues = {
        ...values,
        noOfStudentsCapacity: typeof values.noOfStudentsCapacity === 'string'
          ? parseInt(values.noOfStudentsCapacity, 10)
          : values.noOfStudentsCapacity,
      };
      const response = await createBatch(submittedValues);
      if (response && response.status === 201) {
        toast.success('Batch created successfully');
        fetchBatchList();
      } else {
        toast.error('Failed to create Course');
      }
    } catch (error) {
      toast.error('Error creating Course');
      console.error('Error:', error);
    } finally {
      onClose();
    }
  };

  const selectedTeacher = teachers.find(teacher => teacher._id === formik.values.teacherId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Batch</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
              Course Name
            </label>
            <select
              id="courseId"
              {...formik.getFieldProps('courseId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course}
                </option>
              ))}
            </select>
            {formik.touched.courseId && formik.errors.courseId && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.courseId}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="division" className="block text-gray-700 font-bold mb-2">
              Division
            </label>
            <input
              type="text"
              id="division"
              {...formik.getFieldProps('division')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched.division && formik.errors.division && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.division}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="batch" className="block text-gray-700 font-bold mb-2">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              {...formik.getFieldProps('batch')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched.batch && formik.errors.batch && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.batch}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="teacherId" className="block text-gray-700 font-bold mb-2">
              Teacher
            </label>
            <select
              id="teacherId"
              {...formik.getFieldProps('teacherId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher, index) => (
                <option key={teacher._id || `teacher-${index}`} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>

            {formik.touched.teacherId && formik.errors.teacherId && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.teacherId}</div>
            )}
          </div>
          {selectedTeacher && (
            <div className="mb-4">
              <p className="text-gray-700">
                Selected Teacher: {selectedTeacher.firstName} {selectedTeacher.lastName}
              </p>
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="noOfStudentsCapacity" className="block text-gray-700 font-bold mb-2">
              Maximum Students
            </label>
            <input
              type="number"
              id="noOfStudentsCapacity"
              {...formik.getFieldProps('noOfStudentsCapacity')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched.noOfStudentsCapacity && formik.errors.noOfStudentsCapacity && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.noOfStudentsCapacity}</div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatchForm;
