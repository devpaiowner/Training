import { url } from "./Config";

export const ApiConfig = {
    Login: '/sign-in',
    Register: '/sign-up',
    ForgotPassword: '/forgot-password',
    ResetPassword: '/reset-password',
    Withdraw: '/transactions/withdraw/request',
    Deposite: '/transactions/deposit/request',
    // GenerateRandomUpi: '/upi/get_random_upi',
    GenerateRandomUpi: '/upi/available_upi',
    GetPaymentUpi: '/upi/get_upi',
    HomeList: '/game/list',
    Banner: '/home/get-banner',
    Game: '/game/game-detail',
    GameList: '/game/get-games',
    GameCategory: '/categories/get-category',
    Provider: '/home/get-allmerchant',
    ProviderGames: '/home/get-game-by-merchantid',
    TransactionHistory: '/transactions/user-transaction-history',
    Logout: '/logout',
    ChangePassword: '/change-password',
    Profile: '/profile',
    SendUserMail: '/sendmail',
    UpdateProfile: '/update-profile',
    GetCms: '/home/get-cms/',
    NotificationList: '/notification/fetch',
    Search: '/game/search-api',
    AddKyc: '/upi/add-kyc',
    PromotionsList: '/bonus/list',
    GetSetting: '/setting/get',
    GamesHistory: '/game/user-game-history',
    VerifyEmailPhone:'verify_email_and_phone',
}

export const RouteConfig = {
    Login: url + '/login',
    Register: url + '/register',
    Home: url + '/',
    Deposite: url + '/deposite',
    GamesList: url + '/games',
    Promotions: url + '/promotions',
    Profile: url + '/profile',
    GamePage: url + '/game',
    Search: url + '/search',
    Pages: url + '/pages',
    Providers: url + '/providers',
    PaymentMethods: url + '/payment-methods',
    HelpCenter: url + '/help-center',
    LastPlayed: url + '/last-played',
    Notifications: url + '/notifications',
}

export const LoginType = {
    Email: "email",
    Phone: "phone",
    OneClick: "one-click"
}

export const RegisterType = {
    Email: "email",
    Phone: "phone",
    PhoneOtp: "phone_otp",
    PhoneConfirmOtp: "confirm_phone_otp",
    EmailOtp: "email_otp",
    EmailConfirmOtp: "confirm_email_otp",
    OneClick: "one-click"
}

export const BannerType = {
    Provider: "Provider",
    Game: "Game",
    Category: "Category",
    Custom: "Custom URL"
}