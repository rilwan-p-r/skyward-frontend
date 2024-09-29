import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { message } from 'antd';
import { reviewValidationSchema } from '../../../schemas/reviewValidationSchema';
import { addReview } from '../../../api/review/addReview';
import { ReviewFormValues } from '../../../interfaces/ReviewFormValues';
import { LocalStudentInterface } from '../../../interfaces/LocalStudentInterface';
import { RootState } from '../../../redux/store/store';

export const ReviewForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [submitStatus, setSubmitStatus] = useState('idle');
    const student = useSelector((state: RootState) => state.studentInfo.studentInfo)as LocalStudentInterface;
    const name = `${student.firstName} ${student.lastName}`
    const email = student.email

    const formik = useFormik<ReviewFormValues>({
      initialValues: {
        name,
        email,
        feedback: '',
        rating: 0,
      },
      validationSchema: reviewValidationSchema,
      onSubmit: async (values) => {
        setSubmitStatus('submitting');
        try {
          const response = await addReview(values);
          if (response && response.status === 201) {
            message.success('Review submitted successfully!');
            setSubmitStatus('success');
            setTimeout(() => {
              onClose();
            }, 1000);
          } else {
            throw new Error('Unexpected response status');
          }
        } catch (error) {
          console.error('Error submitting review:', error);
          message.error('Failed to submit review. Please try again.');
          setSubmitStatus('error');
        }
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <textarea
          name="feedback"
          placeholder="Feedback"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.feedback}
          className={`w-full p-2 border rounded h-24 ${formik.touched.feedback && formik.errors.feedback ? 'border-red-500' : ''}`}
        ></textarea>
        {formik.touched.feedback && formik.errors.feedback && (
          <div className="text-red-500 text-sm">{formik.errors.feedback}</div>
        )}
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => formik.setFieldValue('rating', star)}
              className={`text-2xl ${star <= formik.values.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </motion.button>
          ))}
        </div>
        {formik.touched.rating && formik.errors.rating && (
          <div className="text-red-500 text-sm">{formik.errors.rating}</div>
        )}
        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className={`w-full ${submitStatus === 'submitting' ? 'bg-gray-400' : 'bg-black hover:bg-gray-600'
            } text-white p-2 rounded`}
        >
          {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    );
};