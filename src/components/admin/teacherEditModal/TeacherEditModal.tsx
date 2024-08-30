import { useState, useEffect } from 'react';
import { Avatar, Button, Input, message, Modal, Skeleton, Upload } from 'antd';
import { useFormik } from 'formik';
import { TeacherFormValues } from '../../../interfaces/teacherFormValue.interfaces';
import { editTeacherSchema } from '../../../schemas/editTeacher';
import { UploadOutlined } from '@ant-design/icons';
import { editTeacher } from '../../../api/admin/editTeacher';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { TeacherInterface } from '../../../interfaces/teacherInterface';

interface SuccessMessage {
    message: string;
}

interface ResponseData {
    status:number;
    data: SuccessMessage;
}

interface TeacherEditModalProps {
    handleCloseModal: () => void;
    teacher: TeacherInterface | null;
    fetchTeachers: () => void; 
}

const TeacherEditModal: React.FC<TeacherEditModalProps> = ({ handleCloseModal, teacher, fetchTeachers }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [imagePreview, setImagePreview] = useState<string | null>(teacher?.imageUrl || null);

    useEffect(() => {
        if (loading) {
            setTimeout(()=>{
                setLoading(false);
            },2000)
        }
    }, [loading]);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);


    const formik = useFormik<TeacherFormValues>({
        initialValues: {
            firstName: teacher?.firstName || '',
            lastName: teacher?.lastName || '',
            address: teacher?.address || '',
            email: teacher?.email || '',
            image: null,
            yearsOfExperience: teacher?.yearsOfExperience || '',
            subject: teacher?.subject || '',
        },
        validationSchema: editTeacherSchema, 
        onSubmit: (values) => {
            handleEditSubmit(values, teacher?._id);
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });

    const handleEditSubmit = async (values: TeacherFormValues, teacherId: unknown) => {
        try {
            const formData = new FormData();
            console.log(teacherId);
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
            const response = await editTeacher(teacherId, formData) as ResponseData;
            console.log(response);
            const messages = response.data.message;
            if(response.status===200){
                message.success(messages)
            }else{
                message.info(messages);
            }
            fetchTeachers();
            handleCloseModal();
        } catch (error) {
            console.error(error);
            message.error('Error updating teacher');
        }
    };

    const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.fileList.length > 0) {
            const file = info.fileList[info.fileList.length-1].originFileObj;
            if (file) {
                console.log('Selected file:', file);
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

    const isDirty = Object.keys(formik.values).some((key) => {
        return formik.values[key as keyof TeacherFormValues] !== formik.initialValues[key as keyof TeacherFormValues];
    });

    return (
        <Modal
            title={<h2 className="text-2xl font-bold text-gray-800">Edit Teacher</h2>} 
            maskClosable={false}
            onCancel={handleCloseModal}
            footer={[
                <Button key="cancel" onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                </Button>,
                <Button
                key="save"
                className={`bg-black text-white hover:bg-white font-bold py-2 px-4 rounded ml-2 ${isDirty ? '' : 'opacity-50 cursor-not-allowed'}`}
                onClick={() => formik.handleSubmit()}
                disabled={!isDirty}
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
            <Skeleton active avatar paragraph={{ rows: 6 }} />:
            
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <Input
                        id="subject"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                    {formik.touched.subject && formik.errors.subject && (
                        <div className="text-red-500 text-sm">{formik.errors.subject}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">Years Of Experience</label>
                    <Input
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        value={formik.values.yearsOfExperience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                    {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                        <div className="text-red-500 text-sm">{formik.errors.yearsOfExperience}</div>
                    )}
                </div>
                
               
            </div>
                }
        </Modal>
    );
};

export default TeacherEditModal;
