import * as yup from 'yup';

export const announcementFormSchema = yup.object().shape({
  title: yup.string()
    .min(8, 'Title must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Title must contain at least one alphabet')
    .test('not-only-spaces', 'Title must not be only spaces', (value) => (value?.trim().length || 0) > 0)
    .required('Title is required'),
  content: yup.string()
    .matches(/[a-zA-Z]/, 'Content must contain at least one alphabet')
    .test('not-only-spaces', 'Content must not be only spaces', (value) => (value?.trim().length || 0) > 0)
    .required('Content is required'),
});
