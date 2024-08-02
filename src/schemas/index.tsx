import * as yup from 'yup';

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const addTeacherSchema = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  subject: yup.string().required('Required'),
  yearsOfExperience: yup
    .string()
    .required('Required')
    .matches(/^\d+$/, 'Must be a valid number')  // ensures it’s a numeric string
    .test('positive', 'Must be a positive number', value => Number(value) > 0)
    .test('integer', 'Must be an integer', value => Number.isInteger(Number(value))),
  image: yup
    .mixed<File>()
    .required('Required')
    .test('fileSize', 'File is too large', value => value && value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported File Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
});
