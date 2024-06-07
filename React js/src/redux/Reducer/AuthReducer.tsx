import { CHECK_USER, FORGOT_PASSWORD, RESEND_OTP, RESET_PASSWORD, LOGIN, SIGNUP, VERIFY_OTP, GET_MOBILITY_EQIPMENTS, GET_TRANSFERS_LEVELS, GET_PROFILE, UPDATE_NOTIFICATION_STATUS, MOBILE_VERIFICATION, SOCIAL_LOGIN, PROFILE_SETUP, UPDATE_PROFILE_IMAGE, DELETE_ACCOUNT, PRIVACY_POLICY } from "../../constants/AuthConstants";
import { createGetDataReducer } from "./CommonReducer";

const CheckUserReducer = createGetDataReducer(CHECK_USER);
const SignUpReducer = createGetDataReducer(SIGNUP);
const ForgotPasswordReducer = createGetDataReducer(FORGOT_PASSWORD);
const VerifyOtpReducer = createGetDataReducer(VERIFY_OTP);
const ResetPasswordReducer = createGetDataReducer(RESET_PASSWORD);
const LoginReducer = createGetDataReducer(LOGIN);
const GetMobilityEquipmentReducer = createGetDataReducer(GET_MOBILITY_EQIPMENTS);
const GetTransferLevelsReducer = createGetDataReducer(GET_TRANSFERS_LEVELS);
const GetProfileReducer = createGetDataReducer(GET_PROFILE);
const ProfileSetupReducer = createGetDataReducer(PROFILE_SETUP);
const MobileVerificationReducer = createGetDataReducer(MOBILE_VERIFICATION);
const UpdateNotificationStatusReducer = createGetDataReducer(UPDATE_NOTIFICATION_STATUS);
const SocialLoginReducer = createGetDataReducer(SOCIAL_LOGIN);
const UpdateProfileImageReducer = createGetDataReducer(UPDATE_PROFILE_IMAGE);
const DeleteAccountReducer = createGetDataReducer(DELETE_ACCOUNT);
const PrivacyPolicyReducer = createGetDataReducer(PRIVACY_POLICY);

export const AuthReducers = {
    CheckUserState: CheckUserReducer,
    ForgotPasswordState: ForgotPasswordReducer,
    VerifyOtpState: VerifyOtpReducer,
    SignUpState: SignUpReducer,
    LoginState: LoginReducer,
    GetMobilityEquipmentState: GetMobilityEquipmentReducer,
    GetTransferLevelsState: GetTransferLevelsReducer,
    GetProfileState: GetProfileReducer,
    ResetPasswordState: ResetPasswordReducer,
    ProfileSetupState: ProfileSetupReducer,
    MobileVerificationState: MobileVerificationReducer,
    UpdateNotificationStatusState: UpdateNotificationStatusReducer,
    SocialLoginState: SocialLoginReducer,
    UpdateProfileImageState: UpdateProfileImageReducer,
    DeleteAccountState: DeleteAccountReducer,
    PrivacyPolicyState: PrivacyPolicyReducer,
}