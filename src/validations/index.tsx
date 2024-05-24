
const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  import * as yup from 'yup';

 export const signupFormValidation = yup.object().shape({
    name: yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    
    email: yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    
    phone: yup.string()
      .required('Phone number is required'),
    
      address: yup.object().shape({
        latitudeDrop: yup.number().required('Address is required'),
        longitudeDrop: yup.number().required('Address is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
      }).required('Address is required'),

    
    bloodGroup: yup.string()
      .required('Blood group is required'),
    
  });

  // export const profileFormValidation = (values:any) => {
  //   const errorList = {};
    
  //   if (!values.name) {
  //     errorList.name = 'Name is required';
  //   }
    
  //   if (!values.email) {
  //     errorList.email = 'Email is required';
  //   } else if (!validateEmail(values.email)) {
  //     errorList.email = 'Email is not valid';
  //   }
    
  //   // if (!values.address) {
  //   //   errorList.address = 'Address is required';
  //   // }
    
  //   if (!values.phone) {
  //     errorList.phone = 'Phone number is required';
  //   } else if (!/^[0-9]+$/.test(values.phone)) {
  //     errorList.phone = 'Phone number must be only digits';
  //   }
    
  //   // if (values.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(values.image)) {
  //   //   errorList.image = 'Image URL is not valid';
  //   // }
    
  //   if (values.bloodGroup && !['A', 'B', 'AB', 'O'].includes(values.bloodGroup)) {
  //     errorList.bloodGroup = 'Invalid blood group';
  //   }
    
  //   return errorList;
  // };