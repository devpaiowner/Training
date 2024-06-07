import { ApiConstants } from "../../constants/ApiConstants";
import { CHECK_USER, FORGOT_PASSWORD, GET_MOBILITY_EQIPMENTS, GET_PROFILE, GET_TRANSFERS_LEVELS, LOGIN, RESEND_OTP, SETUP_PROFILE, SIGNUP, SOCIAL_LOGIN, UPDATE_NOTIFICATION_STATUS, UPDATE_PROFILE_IMAGE, VERIFY_OTP, MOBILE_VERIFICATION, PROFILE_SETUP, RESET_PASSWORD, DELETE_ACCOUNT, PRIVACY_POLICY } from "../../constants/AuthConstants";
import { createFormDataAction, createPostDataAction } from "./CommonAction"


export const CheckUserAction = (payload: any) => createFormDataAction(CHECK_USER, ApiConstants?.CheckUser, payload, true);
export const SignUpAction = (payload: any) => createFormDataAction(SIGNUP, ApiConstants?.Register, payload, true);
export const OtpVerifyAction = (payload: any) => createFormDataAction(VERIFY_OTP, ApiConstants?.VerifyOtp, payload, true);
export const ResendOtpAction = (payload: any) => createFormDataAction(RESEND_OTP, ApiConstants?.ResendOtp, payload, true);
export const ForgotPasswordAction = (payload: any) => createFormDataAction(FORGOT_PASSWORD, ApiConstants?.ForgotPassword, payload, true);
export const ResetPasswordAction = (payload: any) => createFormDataAction(RESET_PASSWORD, ApiConstants?.ResetPassword, payload, true);
export const MobileVerificationAction = (payload: any) => createFormDataAction(MOBILE_VERIFICATION, ApiConstants?.MobileVerification, payload, true);
export const ProfileSetupAction = (payload: any) => createFormDataAction(PROFILE_SETUP, ApiConstants?.ProfileSetup, payload, true);
export const LoginAction = (payload: any) => createFormDataAction(LOGIN, ApiConstants?.Login, payload);
export const GetMobilityEquipmentAction = (payload: any) => createFormDataAction(GET_MOBILITY_EQIPMENTS, ApiConstants?.GetMobilityEquipments, payload, false);
export const GetTransferLevelsAction = (payload: any) => createFormDataAction(GET_TRANSFERS_LEVELS, ApiConstants?.GetTransferLevels, payload, false);
export const GetProfileAction = (payload: any) => createFormDataAction(GET_PROFILE, ApiConstants?.GetProfile, payload, false);
export const SetupProfileAction = (payload: any) => createFormDataAction(SETUP_PROFILE, ApiConstants?.SetupProfile, payload, false);
export const UpdateNotificationStatusAction = (payload: any) => createFormDataAction(UPDATE_NOTIFICATION_STATUS, ApiConstants?.UpdateNotificationStatus, payload, true);
export const UpdateProfileImageAction = (payload: any) => createFormDataAction(UPDATE_PROFILE_IMAGE, ApiConstants?.UpdateProfileImage, payload, false);
export const SocialLoginAction = (payload: any) => createFormDataAction(SOCIAL_LOGIN, ApiConstants?.SocialLogin, payload, false);
export const DeleteAccountAction = (payload: any) => createFormDataAction(DELETE_ACCOUNT, ApiConstants?.DeleteAccount, payload, false);

export const PrivacyPolicyAction = (payload: any) => createFormDataAction(PRIVACY_POLICY, ApiConstants?.PrivacyPolicy, payload, false);
