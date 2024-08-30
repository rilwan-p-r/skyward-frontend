import { useFormik } from "formik";
import { createCourseFormSchema } from "../../../schemas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CourseFormInterface } from "../../../interfaces/courseFormValues";
import { createCourse } from "../../../api/admin/createCourse";
import { toast } from "react-toastify";

export const CreateCourseForm = ({ onClose,fetchCourses }: { onClose: () => void, fetchCourses:()=>void }) => {
    const formik = useFormik({
        initialValues: {
            course: '',
            description: '',
            subjects: [''],
        },
        validationSchema: createCourseFormSchema,
        onSubmit: (values) => {
            handleSubmitForm(values)
            console.log('Form Submitted:', values);
            onClose();
        },
    });

    const handleSubmitForm=async(values:CourseFormInterface)=>{
        try{
            const response = await createCourse(values);
            if(response && response.status === 201){
                toast.success('Course created succesfully')
                fetchCourses()
            }else{
                toast.error('Failed to create course')
            }
        }catch(error){
            toast.error('error creating course');
            console.log('error',error);
        }finally{
            onClose();
        }
    }
    const handleAddSubject = () => {
        const newSubjects = [...formik.values.subjects, ''];
        formik.setFieldValue('subjects', newSubjects);
    };

    const handleRemoveSubject = (index: number) => {
        const newSubjects = formik.values.subjects.filter((_, i) => i !== index);
        formik.setFieldValue('subjects', newSubjects);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full h-[80vh] overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Course Name</label>
                        <input
                            type="text"
                            name="course"
                            onChange={formik.handleChange}
                            value={formik.values.course}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {formik.errors.course && <p className="text-red-500 text-sm mt-1">{formik.errors.course}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {formik.errors.description && <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Subjects</label>
                        <div className="space-y-2">
                            {formik.values.subjects.map((subject, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        name={`subjects[${index}]`}
                                        onChange={(e) => {
                                            const newSubjects = [...formik.values.subjects];
                                            newSubjects[index] = e.target.value;
                                            formik.setFieldValue('subjects', newSubjects);
                                        }}
                                        value={subject}
                                        className="w-full px-3 py-2 border rounded-lg mr-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubject(index)}
                                        className="w-6 h-6 text-red-500 hover:text-red-700"
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSubject}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Subject
                            </button>
                        </div>
                        {formik.errors.subjects && <p className="text-red-500 text-sm mt-1">{formik.errors.subjects}</p>}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
