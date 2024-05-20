
const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };


export const signupFormValidation = (values: any) => {
    const errorList: any = {};
    if (!values.name) {
        errorList.name = 'Name is required';
    }
    else if (!values.email) {
      errorList.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errorList.email = 'Email is not valid';
    }
    if (!values.password) {
      errorList.password = 'Password is required';
    } else if (values.password.length < 8) {
      errorList.password = 'Password  should have atleast eight alphabets';
    }
    return errorList;
  };
  export const profileFormValidation = (values:any) => {
    const errorList = {};
    
    if (!values.name) {
      errorList.name = 'Name is required';
    }
    
    if (!values.email) {
      errorList.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errorList.email = 'Email is not valid';
    }
    
    // if (!values.address) {
    //   errorList.address = 'Address is required';
    // }
    
    if (!values.phone) {
      errorList.phone = 'Phone number is required';
    } else if (!/^[0-9]+$/.test(values.phone)) {
      errorList.phone = 'Phone number must be only digits';
    }
    
    // if (values.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(values.image)) {
    //   errorList.image = 'Image URL is not valid';
    // }
    
    if (values.bloodGroup && !['A', 'B', 'AB', 'O'].includes(values.bloodGroup)) {
      errorList.bloodGroup = 'Invalid blood group';
    }
    
    return errorList;
  };