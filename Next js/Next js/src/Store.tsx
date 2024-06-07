import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserLoginReducer, UserRegisteredReducer, UserChangePasswordReducer, UserGetProfileReducer, UserLogoutReducer, UserUpdateProfileReducer, GetCmsPageReducer, AddKycReducer, ForgotPasswordReducer, ResetPasswordReducer, VerifyEmailPhoneReducer } from "./Redux/Reducers/AuthReducer";
import { DepositeReducer, GenerateRandomUpiReducer, GetPaymentUpiReducer, TransactionHistoryReducer, UserDepositeDetailsReducer, WithdrawDetailsReducer, WithdrawReducer } from "./Redux/Reducers/PaymentReducer";
import { GetHomeBannerListReducer, GetHomeListReducer, GetNotificationReducer, GetPromotionsReducer, GetProviderGamesListReducer, GetProviderListReducer, NotificationGetSocketReducer, UserWalletBalanceUpdateSocketReducer } from "./Redux/Reducers/HomeReducer";
import { GetAllGameListReducer, GetGameCategoryReducer, GetGameDetailsReducer, GetGameListReducer, GetGameReducer, GetGamesLikeThisListReducer, GetInstantGameListReducer, GetJackpotGameListReducer, GetLastPlayedGamesReducer, GetLiveCasinoGameListReducer, GetNewGameListReducer, GetTableGameListReducer, GetTopGameListReducer, GetPopularGameListReducer,GetTvGameListReducer, SearchReducer } from "./Redux/Reducers/GameReducer";

const reducer = combineReducers({
    //Auth
    UserLoginState: UserLoginReducer,
    UserRegisteredState: UserRegisteredReducer,
    UserChangePasswordState: UserChangePasswordReducer,
    UserGetProfileState: UserGetProfileReducer,
    UserLogoutState: UserLogoutReducer,
    UserUpdateProfileState: UserUpdateProfileReducer,
    AddKycState:AddKycReducer,
    GetCmsPageState: GetCmsPageReducer,
    ForgotPasswordState:ForgotPasswordReducer,
    ResetPasswordState:ResetPasswordReducer,
    VerifyEmailPhoneState:VerifyEmailPhoneReducer,
    UserWalletBalanceUpdateSocketState:UserWalletBalanceUpdateSocketReducer,
    NotificationGetSocketState:NotificationGetSocketReducer,
    
    //Home
    GetHomeListState: GetHomeListReducer,
    GetHomeBannerListState: GetHomeBannerListReducer,
    GetProviderGamesListState: GetProviderGamesListReducer,
    GetProviderListState: GetProviderListReducer,
    GetPromotionsState:GetPromotionsReducer,

    //Payment
    WithdrawState: WithdrawReducer,
    DepositeState: DepositeReducer,
    WithdrawDetailsState: WithdrawDetailsReducer,
    UserDepositeDetailsState: UserDepositeDetailsReducer,
    GenerateRandomUpiState: GenerateRandomUpiReducer,
    TransactionHistoryState: TransactionHistoryReducer,
    GetPaymentUpiState:GetPaymentUpiReducer,

    // Game
    GetGameListState: GetGameListReducer,
    GetGameState: GetGameReducer,
    GetGameCategoryState: GetGameCategoryReducer,
    GetGameDetailsState: GetGameDetailsReducer,
    GetNewGameListState: GetNewGameListReducer,
    GetTableGameListState: GetTableGameListReducer,
    GetInstantGameListState: GetInstantGameListReducer,
    GetJackpotGameListState: GetJackpotGameListReducer,
    GetTvGameListState: GetTvGameListReducer,
    GetAllGameListState: GetAllGameListReducer,
    GetNotificationState: GetNotificationReducer,
    SearchState: SearchReducer,
    GetTopGameListState: GetTopGameListReducer,
    GetPopularGameListState:GetPopularGameListReducer,
    GetLiveCasinoGameListState: GetLiveCasinoGameListReducer,
    GetGamesLikeThisListState: GetGamesLikeThisListReducer,
    GetLastPlayedGamesState:GetLastPlayedGamesReducer,
});


let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;


