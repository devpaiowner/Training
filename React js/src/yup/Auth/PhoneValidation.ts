import * as yup from 'yup';
import ValidationMessage from '../../constants/Validation/ValidationMessage';

const PhoneValidation: any = yup.object().shape({
    mobile_number: yup.string().required(ValidationMessage.PHONE_REQUIRED)
        .min(7, ValidationMessage?.PASSWORD_MIN_CHAR)
        .max(10, ValidationMessage?.PASSWORD_MAX_CHAR)
});

export default PhoneValidation;
