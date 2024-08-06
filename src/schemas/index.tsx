import * as yup from 'yup';

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const addTeacherSchema = yup.object().shape({
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
    .matches(/^(?=(?:.*[A-Za-z]){5})[A-Za-z0-9\s,]*$/, 'Must contain at least 5 letters and can include numbers, spaces, and commas'),
    email: yup
  .string()
  .email('Please enter a valid email')
  .required('Email is required'),
  subject: yup.string().required('Required').matches(/^[A-Za-z]+$/, 'Must contain only letters'),
  yearsOfExperience: yup
    .string()
    .required('Required')
    .matches(/^\d+$/, 'Must be a valid number')  // ensures it’s a numeric string
    .test('positive', 'Must be a positive number', value => Number(value) > 0)
    .test('integer', 'Must be an integer', value => Number.isInteger(Number(value)))
    .test('maxValue', 'Must not exceed 35 years', value => Number(value) <= 35),
  image: yup
    .mixed<File>()
    .required('Required')
    .test('fileSize', 'File is too large', value => value && value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported File Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
});


export const addStudentSchema = yup.object().shape({
  firstName: yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Must contain only letters and spaces')
    .test('not-only-spaces', 'First name cannot contain only spaces', value => value.trim().length > 0),
  lastName: yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Must contain only letters and spaces')
    .test('not-only-spaces', 'Last name cannot contain only spaces', value => value.trim().length > 0),
  dateOfBirth: yup
  .date()
  .required('Date of birth is required')
  .max(new Date(), 'Date of birth cannot be in the future')
  .min(new Date('1980-01-01'), 'Date of birth cannot be before January 1, 1980')
  .test('age', 'Must be at least 5 years old', value => {
    if (!value) return false;
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 5;
    }
    return age >= 5;
  }),
  gender: yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
    address: yup.string()
    .required('Address is required')
    .matches(/^(?=(?:.*[A-Za-z]){5})[A-Za-z0-9\s,]*$/, 'Must contain at least 5 letters and can include numbers, spaces, and commas'),
  email: yup
  .string()
  .email('Please enter a valid email')
  .required('Email is required'),
  // .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
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

export const loginSchema=yup.object().shape({
  email: yup
  .string()
  .email('Please enter a valid email')
  .required('Email is required'),
  // .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
})


