import * as yup from 'yup';

export const mcqCompetitionSchema = yup.object().shape({
  competitionTitle: yup.string()
    .required('Competition title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters')
    .test('no-whitespace', 'Competition title cannot contain only spaces', value => 
      value != null && value.trim().length > 0
    ),
    competitionSummary:yup.string()
    .required('Competition summary is required')
    .min(10, 'Summary must be at least 10 characters')
    .max(1500, 'Title must not exceed 1500 characters')
    .test('no-whitespace', 'Competition summary cannot contain only spaces', value => 
      value != null && value.trim().length > 0
    ),
  timeLimit: yup.number()
    .required('Time limit is required')
    .integer('Time limit must be an integer')
    .min(1, 'Time limit must be at least 1 minute')
    .max(180, 'Time limit must not exceed 180 minutes'),
  endDate: yup.date()
    .required('End date is required')
    .min(new Date(), 'End date must be in the future'),
  questions: yup.array().of(
    yup.object().shape({
      question: yup.string()
        .required('Question is required')
        .test('no-whitespace', 'Question cannot contain only spaces', value => 
          value != null && value.trim().length > 0
        ),
      options: yup.array()
        .of(yup.string()
          .required('Option is required')
          .test('no-whitespace', 'Option cannot contain only spaces', value => 
            value != null && value.trim().length > 0
          )
        )
        .min(4, 'At least 4 options are required')
        .test('unique', 'Options must be unique', (options) => 
          Array.isArray(options) && new Set(options.map(o => o?.trim())).size === options.length
        ),
      correctAnswer: yup.number()
        .required('Correct answer is required')
        .min(0, 'Correct answer must be a valid option index')
        .max(3, 'Correct answer must be a valid option index'),
      score: yup.number()
        .required('Score is required')
        .min(1, 'Score must be at least 1'),
    })
  ).min(1, 'At least one question is required'),
});
