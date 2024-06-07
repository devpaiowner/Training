import * as yup from 'yup';
import ValidationMessage from '../../constants/Validation/ValidationMessage';

const LoginValidation: any = yup.object().shape({
    email: yup.string().required(ValidationMessage.Field("email"))
        .email(ValidationMessage.EMAIL_ADDRESS)
        .matches(ValidationMessage.EMAIL_REGREX, ValidationMessage.EMAIL_ADDRESS)
        .max(150, ValidationMessage.MaxLength('Email', 150))
        .trim(),

    password: yup.string().required(ValidationMessage.PASSWORD_REQUIRED)
        .min(8, ValidationMessage?.PASSWORD_MIN_CHAR)
        .max(15, ValidationMessage?.PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, ValidationMessage?.NO_SPACE_ALLOWED)
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=\[\]+_\-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()\[\]=+_\-]{8,15}$/, ValidationMessage?.PASSWORD_UPPER_CASE),
});

export default LoginValidation;

