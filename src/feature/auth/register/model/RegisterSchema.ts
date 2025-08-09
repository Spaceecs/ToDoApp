import * as Yup from 'yup';

export const registerSchema = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^[A-Za-z0-9]+$/,
            'Password can contain only Latin letters and numbers (no special characters)'
        )
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match.')
        .required('Password confirmation is required.'),
});
