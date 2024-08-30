import * as yup from 'yup';

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/avif'];


export const editTeacherSchema = yup.object().shape({
  firstName: yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Must contain only letters and spaces')
    .test('not-only-spaces', 'First name cannot contain only spaces', value => value.trim().length > 0),
  lastName: yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Must contain only letters and spaces')
    .test('not-only-spaces', 'Last name cannot contain only spaces', value => value.trim().length > 0),
  address: yup.string()
    .required('Address is required')
    .matches(/^(?=(?:[^A-Za-z]*[A-Za-z]){3})[A-Za-z0-9\s,]*$/, 'Must contain at least 3 letters and can include numbers, spaces, and commas'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
  subject: yup.string().required('Required').matches(/^(?=(?:.*[A-Za-z]){3})[A-Za-z0-9\s,]*$/, 'Must contain at least 5 letters and can include numbers, spaces, and commas'),
  yearsOfExperience: yup
    .string()
    .required('Required')
    .matches(/^\d+$/, 'Must be a valid number')  // ensures it’s a numeric string
    .test('positive', 'Must be a positive number', value => Number(value) > 0)
    .test('integer', 'Must be an integer', value => Number.isInteger(Number(value)))
    .test('maxValue', 'Must not exceed 35 years', value => Number(value) <= 35),
  image: yup
    .mixed<File>()
    .notRequired() // Make it optional for editing
    .test('fileSize', 'File is too large', (value) => {
      if (!value) return true;
      return value && value.size <= FILE_SIZE;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      if (!value) return true;
      return value && SUPPORTED_FORMATS.includes(value.type);
    }),
});