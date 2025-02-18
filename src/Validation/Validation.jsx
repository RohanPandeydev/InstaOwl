import * as Yup from 'yup'


 // Check if the input is either a valid email or a valid phone number
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const phoneRegex = /^\d{10}$/;
//  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
//   return 'Invalid email or phone number';
// }
export const UserEntranceValidation = Yup.object().shape({
  details: Yup.string().email().required('Email is Required')
  .max(160, 'Max 160 char'),
})

export const RegisterUserDetails = Yup.object().shape({
  username: Yup.string().required('Required'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  // gender: Yup.string().oneOf(['male', 'female'], 'Invalid gender').required('Gender is required'),
})

export const ContactValidation = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .max(10, 'Max 10 digit allowed')
    .matches(/^[0-9]+$/, "Must be only digits")
    .typeError('Please enter numeric value'),
  email: Yup.string()
    .email()
    .typeError('Email should be in format')
    .required('Required'),

  message: Yup.string()
    .required('Required')
    .max(250, 'Max 250 character valid'),
})
