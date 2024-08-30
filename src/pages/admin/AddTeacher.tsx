import React, { useState } from 'react';
import { useFormik } from 'formik';
import { addTeacherSchema } from '../../schemas';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { addTeacher } from '../../api/admin/addTeacher';
import { toast } from 'react-toastify';
import { TeacherFormValues } from '../../interfaces/teacherFormValue.interfaces';
import { message } from 'antd';

interface SuccessMessage {
  message: string;
}
interface ResponseData {
  data: SuccessMessage;
}

const textInputFields: { name: keyof Omit<TeacherFormValues, 'image'>; label: string; type: string }[] = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
  { name: 'yearsOfExperience', label: 'Years of Experience', type: 'text' },
];

const FileInput = ({
  field,
  handleFileChange,
  fileType,
  previewUrl,
  touched,
  error,
}: {
  field: keyof Pick<TeacherFormValues, 'image'>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof TeacherFormValues
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

const AddTeacher = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (values: TeacherFormValues) => {
    const formData = new FormData();

    const formattedValues = { ...values };
    if (formattedValues.yearsOfExperience) {
      formattedValues.yearsOfExperience = Number(formattedValues.yearsOfExperience);
    }
    Object.keys(formattedValues).forEach((key) => {
      if (formattedValues[key as keyof TeacherFormValues] !== null) {
        formData.append(key, formattedValues[key as keyof TeacherFormValues] as string);
      }
    });
    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    if (!values.image) {
      message.warning('Please upload an image');
      return;
    }


    try {
      const response = await addTeacher(formData) as ResponseData;
      console.log('Success:', response);
      const message = response.data.message || 'Teacher added';
      toast.success(message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      formik.resetForm();
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add teacher');
    }

  };

  const formik = useFormik<TeacherFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      subject: '',
      yearsOfExperience: '',
      image: null,
    },
    validationSchema: addTeacherSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  console.log('dataaa', formik.values);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof TeacherFormValues
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
              Add New Teacher
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
                      value={
                        formik.values[field.name as keyof Omit<TeacherFormValues, 'image'>] || ''
                      }
                    />
                    <label
                      htmlFor={field.name}
                      className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                    >
                      {field.label}
                    </label>
                    {formik.touched[field.name as keyof Omit<TeacherFormValues, 'image'>] &&
                      formik.errors[field.name as keyof Omit<TeacherFormValues, 'image'>] && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            formik.errors[
                            field.name as keyof Omit<TeacherFormValues, 'image'>
                            ] as string
                          }
                        </p>
                      )}
                  </div>
                ))}
              </div>
              <div className="col-span-full">
                <FileInput
                  field="image"
                  handleFileChange={handleFileChange}
                  fileType="image/jpeg, image/png, image/avif"
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
                  Create a teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
