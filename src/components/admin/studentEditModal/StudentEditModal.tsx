import { useState, useEffect } from 'react';
import { Avatar, Button, DatePicker, Input, message, Modal, Select, Skeleton, Upload } from 'antd';
import { StudentInterface } from '../../../interfaces/studentInterface';
import moment from 'moment';
import { getBatchList } from '../../../api/admin/getBatchList';
import { BatchInterface } from '../../../interfaces/BatchInterface';
import { useFormik } from 'formik';
import { StudentFormValues } from '../../../interfaces/studentFormValues';
import { editStudentSchema } from '../../../schemas';
import { UploadOutlined } from '@ant-design/icons';
import { editStudent } from '../../../api/admin/editStudent';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

interface SuccessMessage {
  message: string;
}
interface ResponseData {
  status: number;
  data: SuccessMessage;
}
interface StudentEditModalProps {
  handleClose: () => void;
  student: StudentInterface | null;
  fetchStudents: () => void
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({ handleClose, student, fetchStudents }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [batches, setBatches] = useState<BatchInterface[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(student?.imageUrl || null);

  useEffect(() => {
    fetchBatchList();
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const fetchBatchList = async () => {
    try {
      const response = await getBatchList();
      setBatches(response);
    } catch (error) {
      message.error('Error fetching batch list');
      console.error('Error:', error);
    }
  };

  const formik = useFormik<StudentFormValues>({
    initialValues: {
      firstName: student?.firstName || '',
      lastName: student?.lastName || '',
      dateOfBirth: student?.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
      gender: student?.gender || '',
      address: student?.address || '',
      email: student?.email || '',
      phoneNumber: student?.phoneNumber || '',
      emergencyContact: student?.emergencyContact || '',
      bloodGroup: student?.bloodGroup || '',
      admissionDate: student?.admissionDate ? new Date(student.admissionDate).toISOString().split('T')[0] : '',
      image: null,
      batchId: student?.batchId?._id || '',
    },
    validationSchema: editStudentSchema,
    onSubmit: (values) => {
      handleEditSubmit(values, student?._id);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleEditSubmit = async (values: StudentFormValues, studentId: unknown) => {
    try {
      console.log(studentId);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key as keyof StudentFormValues] !== null) {
          formData.append(key, values[key as keyof StudentFormValues] as string);
        }
      });

      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await editStudent(studentId, formData) as ResponseData;
      console.log(response);
      const messages = response.data.message;
      if(response.status===200){
        message.success(messages)
    }else{
        message.info(messages);
    }
      fetchStudents();
      handleClose();
    } catch (error) {
      console.error(error);
      message.error('Error updating student');
    }
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length-1].originFileObj;
      if (file) {
        console.log('Selected file:', file);
        // setImageFile(file);
        formik.setFieldValue('image', file);
        formik.setFieldTouched('image', true, true);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };


  return (
    <Modal
      title={<h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>}
      maskClosable={false}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Cancel
        </Button>,
        <Button
          key="save"
          className={`bg-black text-white hover:bg-white font-bold py-2 px-4 rounded ml-2 ${formik.isValid && formik.dirty ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => formik.handleSubmit()}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Save
        </Button>,
      ]}
      loading={loading}
      open={true}
      className="max-w-2xl"
      style={{ maxHeight: '450px', overflowY: 'auto' }}
    >
      {loading ?
        <Skeleton active avatar paragraph={{ rows: 6 }} />
        :
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar
              size={64}
              src={imagePreview}
              className="rounded-full" />
            <Upload
              name="image"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Change Image</Button>
            </Upload>
          </div>
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
            <Input
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            )}
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth ? moment(formik.values.dateOfBirth) : null}
              onChange={(date) => formik.setFieldValue('dateOfBirth', date ? date.format('YYYY-MM-DD') : null)}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <div className="text-red-500 text-sm">{formik.errors.dateOfBirth}</div>
            )}
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <Select
              id="gender"
              value={formik.values.gender}
              onChange={(value) => formik.setFieldValue('gender', value)}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
            )}
          </div>
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={formik.values.emergencyContact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.emergencyContact && formik.errors.emergencyContact && (
              <div className="text-red-500 text-sm">{formik.errors.emergencyContact}</div>
            )}
          </div>
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
            <Input
              id="bloodGroup"
              name="bloodGroup"
              value={formik.values.bloodGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.bloodGroup && formik.errors.bloodGroup && (
              <div className="text-red-500 text-sm">{formik.errors.bloodGroup}</div>
            )}
          </div>
          <div>
            <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">Admission Date</label>
            <DatePicker
              id="admissionDate"
              name="admissionDate"
              value={formik.values.admissionDate ? moment(formik.values.admissionDate) : null}
              onChange={(date) => formik.setFieldValue('admissionDate', date ? date.format('YYYY-MM-DD') : '')}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            {formik.touched.admissionDate && formik.errors.admissionDate && (
              <div className="text-red-500 text-sm">{formik.errors.admissionDate}</div>
            )}
          </div>
          <div>
            <label htmlFor="newBatchId" className="block text-sm font-medium text-gray-700">Select New Batch</label>
            <Select
              id="newBatchId"
              value={formik.values.batchId}
              onChange={(value) => formik.setFieldValue('batchId', value)}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {batches.map(batch => (
                <Select.Option key={batch._id} value={batch._id}>
                  {batch.batch} - {batch.courseId.course}
                </Select.Option>
              ))}
            </Select>
            {formik.touched.batchId && formik.errors.batchId && (
              <div className="text-red-500 text-sm">{formik.errors.batchId}</div>
            )}
          </div>
        </div>
      }
    </Modal>
  );
};

export default StudentEditModal;