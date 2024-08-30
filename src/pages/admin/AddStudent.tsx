import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { addStudentSchema } from '../../schemas';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { addStudent } from '../../api/admin/addStudent';
import { getBatchList } from '../../api/admin/getBatchList';
import { BatchInterface } from '../../interfaces/BatchInterface';
import { StudentFormValues } from '../../interfaces/studentFormValues';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

interface SuccessMessage {
  message: string;
}

interface ResponseData {
  data: SuccessMessage;
}

const textInputFields: { name: keyof Omit<StudentFormValues, 'image'>; label: string; type: string; options?: { value: string; label: string }[] }[] = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'emergencyContact', label: 'Emergency Contact', type: 'tel' },
  { name: 'bloodGroup', label: 'Blood Group', type: 'text' },
  { name: 'admissionDate', label: 'Admission Date', type: 'date' },
  { name: 'batchId', label: 'Course', type: 'select' },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
];

const AddStudent = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [batch, setBatches] = useState<BatchInterface[]>([]);

  const fetchBatchList = useCallback(async () => {
    try {
      const response = await getBatchList();
      setBatches(response);
    } catch (error) {
      message.error('Error fetching course list');
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchBatchList();
  }, [fetchBatchList]);

  const handleSubmit = async (values: StudentFormValues) => {
    message.loading('Student is adding');
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof StudentFormValues];
      if (value !== null) {
        formData.append(key, value);
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
      console.log('values', values);

      const response = (await addStudent(formData)) as ResponseData;
      console.log('response:', response);
      const msg = response.data.message || 'Student added';
      message.success(msg);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      formik.resetForm();
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to add student');
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
      batchId: '',
    },
    validationSchema: addStudentSchema,
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
              Add New Student
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {textInputFields.map((field) => (
                  <div key={field.name} className="relative">
                    {field.type === 'select' ? (
                      <>
                        <select
                          id={field.name}
                          name={field.name}
                          className="peer w-full h-12 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-3 pt-5 pb-2"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values[field.name]}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options ? (
                            field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))
                          ) : (
                            batch.map((batch) => (
                              <option key={batch._id} value={batch._id}>
                                {batch.courseId.course} {batch.batch}
                              </option>
                            ))
                          )}
                        </select>
                        <label
                          htmlFor={field.name}
                          className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                          {field.label}
                        </label>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                    {formik.touched[field.name] && formik.errors[field.name] && (
                      <p className="mt-2 text-sm text-red-600">
                        {formik.errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="col-span-full">
                  <Upload.Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: 'gray' }} />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag an image file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single upload. Only image files (PNG, JPG) up to 1MB are allowed.
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
                        {formik.errors.image}
                      </p>
                    )}
                  </Upload.Dragger>
                </div>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Student
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
