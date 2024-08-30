import * as yup from 'yup';

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/avif'];

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
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
  subject: yup
    .string()
    .required('Required')
    .matches(/^(?=(?:[^A-Za-z]*[A-Za-z]){3})[A-Za-z0-9\s,]*$/, 'Must contain at least 3 letters and can include numbers, spaces, and commas'),
  yearsOfExperience: yup
    .string()
    .required('Required')
    .matches(/^\d+$/, 'Must be a valid number')
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
    .oneOf(['Male', 'Female', 'Other'], 'Please select a valid gender')
    .required('Gender is required'),
  address: yup.string()
    .required('Address is required')
    .matches(/^(?=(?:.*[A-Za-z]){5})[A-Za-z0-9\s,]*$/, 'Must contain at least 5 letters and can include numbers, spaces, and commas'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
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
  batchId: yup.string()
    .required('Batch ID is required')
    .notOneOf([''], 'Course must be selected'),
});

export const editStudentSchema = yup.object().shape({
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
    .oneOf(['Male', 'Female', 'Other'], 'Please select a valid gender')
    .required('Gender is required'),
  address: yup.string()
    .required('Address is required')
    .matches(/^(?=(?:.*[A-Za-z]){5})[A-Za-z0-9\s,]*$/, 'Must contain at least 5 letters and can include numbers, spaces, and commas'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
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


export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
})

export const forgotPassword = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address'),
})


export const newPassword = yup.object().shape({
  newPassword: yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number"
    )
    .test(
      "no-only-spaces",
      "Password cannot consist only of spaces",
      (value) => {
        return value !== undefined && value.trim().length > 0;
      }
    ),
  confirmPassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});


const validateBatchGap = (batch: string | undefined): boolean => {
  if (!batch) return false;

  const match = batch.match(/^(\d{4})-(\d{4})$/);
  if (!match) return false;

  const [startYear, endYear] = match.slice(1).map(Number);

  const yearGap = endYear - startYear;
  return yearGap >= 3 && yearGap <= 6;
};

export const createBatchFormSchema = yup.object().shape({
  courseId: yup
    .string()
    .required('Course name is required'),
  division: yup
    .string()
    .matches(/^[A-Z]$/, 'Division must be a single uppercase letter')
    .required('Division is required'),
  batch: yup
    .string()
    .matches(/^\d{4}-\d{4}$/, 'Batch must be in the format YYYY-YYYY')
    .test('batch-gap', 'Batch must be between 3 to 6 years', (value) => validateBatchGap(value))
    .required('Batch is required'),
  teacherId: yup
    .string()
    .required('Teacher is required'),
  noOfStudentsCapacity: yup
    .number()
    .typeError('Capacity must be a number')
    .positive('Capacity must be a positive number')
    .integer('Capacity must be an integer')
    .max(60, 'Capacity cannot exceed 60')
    .required('Capacity is required'),
});


export const createCourseFormSchema = yup.object().shape({
  course: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z0-9\s!@#$%^&*()_+={}[\]|\\;:'",.<>?/`~-]*$/, 'Course name must start with a letter and can contain letters')
    .required('Course name is required'),

  description: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z0-9\s!@#$%^&*()_+={}[\]|\\;:'",.<>?/`~-]*$/, 'Description must start with a letter and can contain letters')
    .required('Description is required'),

  subjects: yup
    .array()
    .of(yup.string().matches(/^[A-Za-z\s]*$/, 'Each subject must contain only letters')
      .required('Each subject must be specified'))
    .min(1, 'At least one subject is required')
    .required('Subjects are required'),
});
