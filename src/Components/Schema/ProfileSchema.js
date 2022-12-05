import * as Yup from 'yup';


export const profileSchema = Yup.object({
    Name:Yup.string().min(3).max(20).required('User name is required'),
    Email:Yup.string().required('Email is required'),
    Mobile:Yup.number().required().positive().integer(),
    Password: Yup.string()
        .required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPass: Yup.string().required('Confirm Password Required').oneOf([Yup.ref('Password'), null], 'Passwords must match')
})