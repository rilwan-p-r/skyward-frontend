import React, { useState } from 'react';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';
import { postMCQCompetition } from '../../api/admin/postMCQCompetition';
import { toast, ToastContent } from 'react-toastify';
import { FormikErrors, useFormik } from 'formik';
import { mcqCompetitionSchema } from '../../schemas/mcqCompetitionSchema';
import { MCQFormValueInterface } from '../../interfaces/mcqFormValueInterface';
import { Question } from '../../interfaces/mcqFormValueInterface';

const AddMCQCompetition: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik<MCQFormValueInterface>({
    initialValues: {
      competitionTitle: '',
      competitionSummary: '',
      timeLimit: 60,
      endDate: '',
      questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, score: 1 }],
    },
    validationSchema: mcqCompetitionSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setErrors }) => {
      const errors = await formik.validateForm(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      
      setSubmitting(true);
      try {
        await postMCQCompetition(values);
        toast.success('Competition created successfully!');
        formik.resetForm();
      } catch (error) {
        toast.error((error as Error).message as ToastContent);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addQuestion = () => {
    formik.setFieldValue('questions', [
      ...formik.values.questions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0, score: 1 },
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = formik.values.questions.filter((_, i) => i !== index);
    formik.setFieldValue('questions', newQuestions);
  };

  const getFieldError = (fieldName: keyof MCQFormValueInterface): string | undefined => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? (formik.errors[fieldName] as string)
      : undefined;
  };

  const getQuestionFieldError = (index: number, field: keyof Question): string | undefined => {
    if (
      formik.touched.questions?.[index] &&
      formik.errors.questions?.[index] &&
      typeof formik.errors.questions[index] === 'object'
    ) {
      const error = (formik.errors.questions[index] as FormikErrors<Question>)[field];
      return typeof error === 'string' ? error : undefined;
    }
    return undefined;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.h1
          className="text-4xl font-bold mt-10 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Add New MCQ Competition
        </motion.h1>
        <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="competitionTitle" className="block text-sm font-medium mb-2">Competition Title</label>
            <input
              type="text"
              id="competitionTitle"
              {...formik.getFieldProps('competitionTitle')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter competition title"
            />
            {getFieldError('competitionTitle') && (
              <div className="text-red-500 mt-1">{getFieldError('competitionTitle')}</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="competitionSummary" className="block text-sm font-medium mb-2">Competition Summary</label>
            <textarea
              id="competitionSummary"
              {...formik.getFieldProps('competitionSummary')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter a brief summary of the competition"
              rows={3}
            />
            {getFieldError('competitionSummary') && (
              <div className="text-red-500 mt-1">{getFieldError('competitionSummary')}</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label htmlFor="timeLimit" className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
            <input
              type="number"
              id="timeLimit"
              {...formik.getFieldProps('timeLimit')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              min="1"
            />
            {getFieldError('timeLimit') && (
              <div className="text-red-500 mt-1">{getFieldError('timeLimit')}</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">Final Day for Attending</label>
            <input
              type="date"
              id="endDate"
              {...formik.getFieldProps('endDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            />
            {getFieldError('endDate') && (
              <div className="text-red-500 mt-1">{getFieldError('endDate')}</div>
            )}
          </motion.div>

          <AnimatePresence>
            {formik.values.questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8 p-6 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Question {index + 1}</h2>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm">Score:</label>
                    <input
                      type="number"
                      {...formik.getFieldProps(`questions[${index}].score`)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                      min="1"
                    />
                    <motion.button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
                <input
                  type="text"
                  {...formik.getFieldProps(`questions[${index}].question`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out mb-4"
                  placeholder="Enter question"
                />
                {getQuestionFieldError(index, 'question') && (
                  <div className="text-red-500 mt-1 mb-2">{getQuestionFieldError(index, 'question')}</div>
                )}
                {question.options.map((_, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`q${index}-option${optionIndex}`}
                      name={`questions[${index}].correctAnswer`}
                      value={optionIndex}
                      checked={formik.values.questions[index].correctAnswer === optionIndex}
                      onChange={() => formik.setFieldValue(`questions[${index}].correctAnswer`, optionIndex)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      {...formik.getFieldProps(`questions[${index}].options[${optionIndex}]`)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                  </div>
                ))}
                {getQuestionFieldError(index, 'options') && (
                  <div className="text-red-500 mt-2">{getQuestionFieldError(index, 'options')}</div>
                )}
                {getQuestionFieldError(index, 'correctAnswer') && (
                  <div className="text-red-500 mt-2">{getQuestionFieldError(index, 'correctAnswer')}</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={addQuestion}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ease-in-out flex items-center justify-center mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} className="mr-2" /> Add Question
          </motion.button>

          <motion.div
            className="flex justify-between items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg font-semibold">
              Total Score: {formik.values.questions.reduce((sum, q) => sum + q.score, 0)}
            </p>
            <div className="flex items-center space-x-4">
              <Clock size={20} />
              <p>{formik.values.timeLimit} minutes</p>
              <Calendar size={20} />
              <p>{formik.values.endDate || 'Not set'}</p>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={submitting}
            className={`w-full bg-black hover:bg-gray-900 text-white py-3 px-4 rounded-md transition-colors duration-200 ease-in-out text-lg font-semibold ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {submitting ? 'Creating Competition...' : 'Create Competition'}
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default AddMCQCompetition;