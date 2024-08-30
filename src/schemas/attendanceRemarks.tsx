import * as yup from 'yup';

export const AttendanceSchema = yup.object().shape({
    attendanceRecords: yup.array().of(
        yup.object().shape({
            present: yup.boolean().nullable().required('Attendance is required'),
            remarks: yup.string()
                .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Must contain only letters and spaces')
                .test('not-only-spaces', 'Remarks cannot contain only spaces', value => {
                    if (!value) return true; // Allow empty remarks
                    return value.trim().length > 0;
                }),
        })
    ),
});