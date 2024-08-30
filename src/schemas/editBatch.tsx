import * as yup from 'yup';

const validateBatchGap = (batch: string | undefined): boolean => {
    if (!batch) return false;
  
    const match = batch.match(/^(\d{4})-(\d{4})$/);
    if (!match) return false;
  
    const [startYear, endYear] = match.slice(1).map(Number);
  
    const yearGap = endYear - startYear;
    return yearGap >= 3 && yearGap <= 6;
  };
  
export const EditBatchSchema = yup.object().shape({
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