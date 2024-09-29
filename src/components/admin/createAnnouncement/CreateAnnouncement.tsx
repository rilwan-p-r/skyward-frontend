import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { AnnouncementFormInterface } from '../../../interfaces/AnnouncementFormInterface';
import { createAnnouncement } from '../../../api/admin/createAnnouncement';
import { announcementFormSchema } from '../../../schemas/AnnouncementFormSchema';
import { XIcon } from 'lucide-react';
import { message } from 'antd';

const CreateAnnouncement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (
    values: AnnouncementFormInterface,
    { setSubmitting, resetForm }: FormikHelpers<AnnouncementFormInterface>
  ) => {
    try {
      const response = await createAnnouncement(values);
      if (response && response.status === 200) {
        message.success('Announcement created successfully');
        resetForm();
        setIsModalOpen(false);
      } else {
        message.error('Failed to create announcement');
      }
    } catch (error) {
      message.info('An error occurred while creating the announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Create New Announcement
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Create New Announcement</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
              >
                <XIcon size={24} />
              </button>
            </div>
            <Formik
              initialValues={{ title: '', content: '' }}
              validationSchema={announcementFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="p-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Enter announcement title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
                    />
                    <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <Field
                      name="content"
                      as="textarea"
                      rows={4}
                      placeholder="Enter announcement content"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
                    />
                    <ErrorMessage name="content" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Announcement'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAnnouncement;