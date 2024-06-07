import { useDispatch } from 'react-redux';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useEffect, useState } from "react";
import { Config } from '../../../config/Config';

function FacebookSocialLogin(){

      return (
         <>
             <FacebookLogin
                appId={Config?.FACEBOOK_SOCIAL_LOGIN_APP_ID}
                className="btn btn-outline-primary"
                style={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem"
                    }}
                children={<span className="icon-facebook"></span>}
                onSuccess={(response) => {
                    console.log('onSuccess----------------->',response);

                }}
                onFail={(error) => {
                    console.log('error----------------->',error);

                }}
                onProfileSuccess={(response:any) => {
                    console.log('onProfileSuccess----------------->',response);
                }}
              />
         </>
    );
}
export default FacebookSocialLogin;