import React, { useState } from 'react';
import { useFormik } from 'formik';
import { addStudentSchema } from '../../schemas';
import AdminSidebar from '../../components/admin/AdminSidebarItems';
import { addStudent } from '../../api/admin/addStudent';
import { toast } from 'react-toastify';

interface StudentFormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  bloodGroup: string;
  admissionDate: string;
  image: File | null;
}

interface SuccessMessage {
  message: string;
}

interface ResponseData {
  data: SuccessMessage;
}

const textInputFields: { name: keyof Omit<StudentFormValues, 'image' | 'gender'>; label: string; type: string }[] = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'emergencyContact', label: 'Emergency Contact', type: 'tel' },
  { name: 'bloodGroup', label: 'Blood Group', type: 'text' },
  { name: 'admissionDate', label: 'Admission Date', type: 'date' },
];


const FileInput = ({
    field,
    handleFileChange,
    fileType,
    previewUrl,
    touched,
    error,
  }: {
    field: keyof Pick<StudentFormValues, 'image'>;
    handleFileChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldName: keyof StudentFormValues
    ) => void;
    fileType: string;
    previewUrl: string | null;
    touched: boolean;
    error?: string;
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
          {previewUrl ? (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto h-48 w-48 object-cover rounded-md shadow-md border-4 border-gray-200"
              />
            </div>
          ) : (
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
          )}
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
          {touched && error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
  
const AddStudent = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (values: StudentFormValues) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof StudentFormValues];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    if (!values.image) {
      toast.warning('Please upload an image');
      return;
    }

    try {
      const response = await addStudent(formData) as ResponseData;
      console.log('Success:', response);
      const message = response.data.message || 'Student added';
      toast.success(message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      formik.resetForm();
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add student');
    }
  };

  const formik = useFormik<StudentFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      email: '',
      phoneNumber: '',
      emergencyContact: '',
      bloodGroup: '',
      admissionDate: '',
      image: null,
    },
    validationSchema: addStudentSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof StudentFormValues
  ) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    formik.setFieldValue(fieldName, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
              Add New Student
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {textInputFields.map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="peer w-full h-12 border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-3 pt-5 pb-2"
                      placeholder={field.label}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field.name]}
                    />
                    <label
                      htmlFor={field.name}
                      className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                    >
                      {field.label}
                    </label>
                    {formik.touched[field.name] && formik.errors[field.name] && (
                      <p className="mt-2 text-sm text-red-600">
                        {formik.errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    className="peer w-full h-12 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-3 pt-5 pb-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Gender
                  </label>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <FileInput
                  field="image"
                  handleFileChange={handleFileChange}
                  fileType="image/jpeg, image/png"
                  previewUrl={previewUrl}
                  touched={formik.touched.image || false}
                  error={formik.errors.image as string}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  Create a student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;