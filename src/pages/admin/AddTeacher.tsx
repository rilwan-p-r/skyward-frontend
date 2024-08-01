import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebarItems';
import { useFormik } from 'formik';
import { addTeacherSchema } from '../../schemas';

interface TeacherFormValues {
  name: string;
  address: string;
  email: string;
  subject: string;
  yearsOfExperience: string;
  image: File | null;
  about: string;
}

const textInputFields: { name: keyof Omit<TeacherFormValues, 'image'>; label: string; type: string }[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
  { name: 'yearsOfExperience', label: 'Years of Experience', type: 'text' },
];

const FileInput = ({
  field,
  handleFileChange,
  fileType,
}: {
  field: keyof Pick<TeacherFormValues, 'image'>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof TeacherFormValues
  ) => void;
  fileType: string;
}) => (
  <div key={field} className="relative">
    <label
      htmlFor={field}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {field.charAt(0).toUpperCase() + field.slice(1)}
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={field}
            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
          >
            <span>Upload an image</span>
            <input
              id={field}
              name={field}
              type="file"
              className="sr-only"
              accept={fileType}
              onChange={(e) => handleFileChange(e, field)}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
      </div>
    </div>
  </div>
);

const AddTeacher = () => {


  const formik = useFormik<TeacherFormValues>({
    initialValues: {
      name: '',
      address: '',
      email: '',
      subject: '',
      yearsOfExperience: '',
      image: null,
      about: '',
    },
    validationSchema: addTeacherSchema,
    onSubmit: (values) => {
      console.log('Submitted.', values);
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof TeacherFormValues
  ) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    formik.setFieldValue(fieldName, file);
  };

  return (
    <div className="fixed flex bg-gray-100 w-full">
    <AdminSidebar />
  
    <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Add New Teacher
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {textInputFields.map((field) => (
              <div key={field.name} className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className="peer h-14 w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-black focus:ring-0 rounded-md px-3 pt-3 pb-2"
                  placeholder={field.label}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name as keyof Omit<TeacherFormValues, 'image'>] || ''}
                />
                <label
                  htmlFor={field.name}
                  className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black"
                >
                  {field.label}
                </label>
                {formik.touched[field.name as keyof Omit<TeacherFormValues, 'image'>] && formik.errors[field.name as keyof Omit<TeacherFormValues, 'image'>] && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors[field.name as keyof Omit<TeacherFormValues, 'image'>] as string}
                  </p>
                )}
              </div>
            ))}
  
            <FileInput
              field="image"
              handleFileChange={handleFileChange}
              fileType="image/jpeg, image/png"
            />
  
            <div className="relative">
              <textarea
                id="about"
                name="about"
                rows={4}
                className="peer h-32 w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-black focus:ring-0 rounded-md px-3 pt-6 pb-2"
                placeholder="About"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about || ''}
              ></textarea>
              <label
                htmlFor="about"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black"
              >
                About
              </label>
              {formik.touched.about && formik.errors.about && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.about as string}
                </p>
              )}
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-3 px-4 text-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              Create a teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default AddTeacher;
