const ValidationMessage = {
    Field: (name: any) => `Please enter your ${name}`,
    MinLength: (name: string, length: number) => `${name} must be at least ${length} characters`,
    MaxLength: (name: string, length: number) => `${name} cannot exceed more than ${length} characters`,


    EMAIL_ADDRESS: 'Please enter valid email ',
    EMAIL_REGREX: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    ANY_REQUIRED: 'Please enter your ',

    PHONE_REQUIRED: "Please enter your phone number.",
    PHONE_MIN_CHAR: "Phone number must have at least 7 numbers.",
    PHONE_MAX_CHAR: "Phone number must be at most 10 numbers.",

    PASSWORD_REQUIRED: "Please enter your password.",
    PASSWORD_MIN_CHAR: "Password must have at least 8 characters.",
    PASSWORD_MAX_CHAR: "Password must be at most 15 characters.",

    CONFIRM_PASSWORD_REQUIRED: "Please enter your confirm password.",
    CONFIRM_PASSWORD_MIN_CHAR: "Confirm password must have at least 8 characters.",
    CONFIRM_PASSWORD_MAX_CHAR: "Confirm password must be at most 15 characters.",
    CONFIRM_PASSWORD_VALID: "Password must have uppercase, lowercase, special character and number.",

    PASSWORD_CONFIRM_PASSWORD_MUST_MATCH: "Password and confirm password must be same",

    NO_SPACE_ALLOWED: "No space allowed.",
    PASSWORD_UPPER_CASE: "Password must contain alphanumeric characters that includes atleast 1 uppercase, 1 lowercase and 1 special character.",
    PASSWORD_MATCH: "Password should be between 8 to 15 characters and should contain atleat one uppercase, one lowercase, one number and one special character.",
}


export default ValidationMessage;
