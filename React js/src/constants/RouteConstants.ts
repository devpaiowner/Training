import { Config } from "../config/Config";

export const Routes = {
    Home: Config?.url + '/',
    Login: Config?.url + '/login',
    Register: Config?.url + '/register',
    ForgotPassword: Config?.url + '/forgot-password',
    VerifyOtp: Config?.url + '/verify-otp',
    PhoneVerify: Config?.url + '/phone-verify',
    ResetPassword: Config?.url + '/reset-password',
    ProfileSetup: Config?.url + '/profile-setup',
    Notifications: Config?.url + '/notifications',
    AccountInfo: Config?.url + '/account-info',
    AccountInfoEdit: Config?.url + '/account-info-edit',
    SettingsLayout: Config?.url + '/settings',
    BookRide: Config?.url + '/book-ride',
    RideType: Config?.url + '/ride-type',
    EmailVerification: Config?.url + '/verify-email',
    Map: Config?.url + '/map',
    MyRides: Config?.url + '/my-rides',
    DriverForm: Config?.url + '/driver-form'
}