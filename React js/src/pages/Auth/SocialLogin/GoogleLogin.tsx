import React from 'react'
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Config } from '../../../config/Config';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { SocialTypes } from '../../../constants/Constants';
import { SocialLoginAction } from '../../../redux/Action/AuthAction';

const GoogleSocialLogin = () => {
    const dispatch = useDispatch<any>();

    const handleSocialLogin = (response: any) => {
        const socialDetails: any = jwtDecode(response?.credential)
        const payload = {
            social_id: socialDetails?.sub,
            social_type: SocialTypes?.Google,
            email: socialDetails?.email,
            device_type: 'Web',
            role_id: Config?.ACTIVE_ROLE,
            full_name: socialDetails?.name,
            mobile_number: '',
            country_code: '',
        }
        dispatch(SocialLoginAction(payload))
    }

    return (
        <>
            <GoogleOAuthProvider clientId={Config?.GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleSocialLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleSocialLogin