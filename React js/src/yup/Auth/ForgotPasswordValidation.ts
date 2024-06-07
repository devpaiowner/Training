import * as yup from 'yup';
import ValidationMessage from '../../constants/Validation/ValidationMessage';

const ForgotPasswordValidation: any = yup.object().shape({
    email: yup.string().required(ValidationMessage.Field("email"))
        .email(ValidationMessage.EMAIL_ADDRESS)
        .matches(ValidationMessage.EMAIL_REGREX, ValidationMessage.EMAIL_ADDRESS)
        .max(150, ValidationMessage.MaxLength('Email', 150))
        .trim(),

    role_id: yup.number().required()

});

export default ForgotPasswordValidation;

