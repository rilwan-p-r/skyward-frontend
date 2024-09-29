import * as yup from 'yup';

// Function to set time to 00:00:00 for comparison
const today = new Date();
today.setHours(0, 0, 0, 0);

export const leaveApplyStudentSchema = yup.object().shape({
  startDate: yup.date()
    .required('Start date is required')
    .min(today, 'Start date cannot be in the past'),
  endDate: yup.date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after the start date'),
  reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason must not exceed 500 characters')
    .test(
      'at-least-ten-letters',
      'Reason must contain at least ten alphabetic characters',
      (value) => {
        if (!value) return false;
        return value.replace(/[^a-zA-Z]/g, '').length >= 10;
      }
    )
    .test(
      'not-only-numbers-and-spaces',
      'Reason cannot consist solely of numbers or spaces',
      (value) => {
        if (!value) return false;
        return !/^[0-9\s]+$/.test(value);
      }
    )
});
