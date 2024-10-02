import { useState } from 'react';
import { useFormik } from 'formik';
import { addTeacherSchema } from '../../schemas';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { addTeacher } from '../../api/admin/addTeacher';
import { toast } from 'react-toastify';
import { TeacherFormValues } from '../../interfaces/teacherFormValue.interfaces';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

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

    if (!values.image) {
      message.warning('Please upload an image');
      return;
    }

    try {
      const response = await addTeacher(formData) as ResponseData;
      console.log('Success:', response);
      const msg = response.data.message || 'Teacher added';
      toast.success(msg);
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

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'image/png, image/jpeg, image/avif',
    beforeUpload: (file: File) => {
      formik.setFieldValue('image', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      return false;
    },
    onRemove: () => {
      formik.setFieldValue('image', null);
      setPreviewUrl(null);
    },
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
                <Upload.Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: 'gray' }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag an image file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload. Only image files (PNG, JPG, AVIF) up to 1MB are allowed.
                  </p>
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-48 w-48 object-cover rounded-md shadow-md border-4 border-gray-200"
                      />
                    </div>
                  )}
                  {formik.touched.image && formik.errors.image && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.image as string}
                    </p>
                  )}
                </Upload.Dragger>
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