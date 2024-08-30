import { useState, useEffect } from 'react';
import { Button, Input, message, Modal, Select, Skeleton } from 'antd';
import { BatchInterface } from '../../../interfaces/BatchInterface';
import { TeacherInterface } from '../../../interfaces/teacherInterface';
import { useFormik } from 'formik';
import { BatchFormValues } from '../../../interfaces/batchFormValues';
import { EditBatchSchema } from '../../../schemas/editBatch';
import { editBatch } from '../../../api/admin/editBatch';

interface SuccessMessage {
    message: string;
}
interface ResponseData {
    status: number;
    data: SuccessMessage;
}
interface BatchEditModalProps {
    handleCloseBatchModal: () => void;
    batch: BatchInterface | null;
    fetchBatchList: () => void;
    teachers: TeacherInterface[];
}

const BatchEditModal: React.FC<BatchEditModalProps> = ({ handleCloseBatchModal, batch, teachers, fetchBatchList }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);


    const formik = useFormik<BatchFormValues>({
        initialValues: {
            batch: batch?.batch || '',
            division: batch?.division || '',
            noOfStudentsCapacity: batch?.noOfStudentsCapacity || '',
            teacherId: batch?.teacherId?._id || '',
            courseId: batch?.courseId?._id || '',
        },
        validationSchema: EditBatchSchema,
        onSubmit: (values) => {
            handleEditSubmit(values, batch?._id);
        },
        validateOnChange: true,
        validateOnBlur: true,
    });

    const handleEditSubmit = async (values: BatchFormValues, batchId: string | undefined) => {
        try {

            const payload = {
                ...values,
                noOfStudentsCapacity: Number(values.noOfStudentsCapacity),
            }
            const response = await editBatch(batchId, payload) as ResponseData;
            const messages = response.data.message ;
            if(response.status===200){
                message.success(messages)
            }else{
                message.info(messages);
            }
            fetchBatchList();
            handleCloseBatchModal();
        } catch (error) {
            console.error(error);
            message.error('Error updating batch');
        }
    };

    return (
        <Modal
            title={<h2 className="text-2xl font-bold text-gray-800">Edit Batch</h2>}
            maskClosable={false}
            onCancel={handleCloseBatchModal}
            footer={[
                <Button key="cancel" onClick={handleCloseBatchModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
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
            {loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch Name</label>
                        <Input
                            id="batch"
                            name="batch"
                            value={formik.values.batch}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        />
                        {formik.touched.batch && formik.errors.batch && (
                            <div className="text-red-500 text-sm">{formik.errors.batch}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
                        <Input
                            id="division"
                            name="division"
                            value={formik.values.division}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        />
                        {formik.touched.division && formik.errors.division && (
                            <div className="text-red-500 text-sm">{formik.errors.division}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="noOfStudentsCapacity" className="block text-sm font-medium text-gray-700">No of Students Capacity</label>
                        <Input
                            id="noOfStudentsCapacity"
                            name="noOfStudentsCapacity"
                            type="number"
                            value={formik.values.noOfStudentsCapacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        />
                        {formik.touched.noOfStudentsCapacity && formik.errors.noOfStudentsCapacity && (
                            <div className="text-red-500 text-sm">{formik.errors.noOfStudentsCapacity}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Select Teacher</label>
                        <Select
                            id="teacherId"
                            value={formik.values.teacherId}
                            onChange={(value) => formik.setFieldValue('teacherId', value)}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        >
                            {teachers.map(teacher => (
                                <Select.Option key={teacher._id} value={teacher._id}>
                                    {teacher.firstName} {teacher.lastName}
                                </Select.Option>
                            ))}
                        </Select>
                        {formik.touched.teacherId && formik.errors.teacherId && (
                            <div className="text-red-500 text-sm">{formik.errors.teacherId}</div>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default BatchEditModal;
