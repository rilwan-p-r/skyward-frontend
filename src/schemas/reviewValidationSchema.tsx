import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  feedback: yup
    .string()
    .test(
      'min-8-alphabets',
      'Feedback must contain at least 8 alphabetic characters',
      value => (value?.match(/[a-zA-Z]/g) || []).length >= 8
    )
    .required('Feedback is required'),
  rating: yup.number().min(1, 'Please select a rating').max(5).required('Rating is required'),
});
