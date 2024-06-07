export const CODE = {
    OK_CODE: 200,
    CREATED: 201,
    BAD_REQUEST_CODE: 400,
    UNAUTHORIZED_CODE: 401,
    VALIDATION_CODE: 422,
    NO_CONTENT: 204,
    INTERNAL_SERVER_ERROR: 500
}

export const VALIDATION_MESSAGE = {
    CATCH_ERROR: "Something went wrong. Please try again.",
}


export const StorageConstants = {
    IS_USER_LOGIN_TOKEN: 'isUserLoginToken',
    USER_DETAIL: 'user_details',
};

export const UserRoleTypes = {
    Rider: 2,
    Driver: 3
}
export const UserRoles = {
    Rider: 'rider',
    Driver: 'driver'
}

export const VerifyOtpTypes = {
    SignUp: 'signup',
    ForgotPassword: 'forgot',
    ContactVerify:"phone_verify"
}

export const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];  

export const SocialTypes ={
    Google:'GOOGLE',
    Facebook:'FACEBOOK',
    Apple:'APPLE',
};  