import * as yup from 'yup';

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const addTeacherSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
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


export const addStudentSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  gender: yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phoneNumber: yup.string()
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  emergencyContact: yup.string()
    .matches(/^[0-9]+$/, 'Emergency contact must only contain digits')
    .min(10, 'Emergency contact must be at least 10 digits')
    .required('Emergency contact is required'),
  bloodGroup: yup.string()
    .matches(/^(A|B|AB|O)[+-]$/, 'Please enter a valid blood group')
    .required('Blood group is required'),
  admissionDate: yup.date()
    .required('Admission date is required')
    .max(new Date(), 'Admission date cannot be in the future'),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('fileSize', 'File is too large', value => value && value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported File Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
});
