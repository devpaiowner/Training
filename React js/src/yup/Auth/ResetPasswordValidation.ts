import * as yup from 'yup';
import ValidationMessage from '../../constants/Validation/ValidationMessage';

const ResetPasswordValidation: any = yup.object().shape({
    password: yup.string().required(ValidationMessage.PASSWORD_REQUIRED)
        .min(8, ValidationMessage?.PASSWORD_MIN_CHAR)
        .max(15, ValidationMessage?.PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, ValidationMessage?.NO_SPACE_ALLOWED)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=\[\]+_\-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()\[\]=+_\-]{8,15}$/, ValidationMessage?.PASSWORD_UPPER_CASE),
 
    confirm_password: yup.string().required(ValidationMessage.CONFIRM_PASSWORD_REQUIRED)
        .min(8, ValidationMessage?.CONFIRM_PASSWORD_MIN_CHAR)
        .max(15, ValidationMessage?.CONFIRM_PASSWORD_MAX_CHAR)
        .oneOf([yup.ref('password')], ValidationMessage?.PASSWORD_CONFIRM_PASSWORD_MUST_MATCH),

});

export default ResetPasswordValidation;
