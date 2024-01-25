import React from "react";
import Icons from "../../components/icons";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useAuth } from "../../hooks/useAuth";
import authConfig from '../../configs/auth';
import { useFullscreen } from "../../hooks/useFullscreen";

const SharedLogin = ({ setShareScreen, setMainScreen, setFromShareScreen }: { setShareScreen: any, setMainScreen: any, setFromShareScreen: any }) => {
    const { setUser } = useAuth();
    const { setFullscreen } = useFullscreen()
    const [isHoverOrActive, setisHoverOrActive] = React.useState(false);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            // axios.get(process.env.REACT_APP_BACKEND_URL + '/auth/google/callback', { params: { code: tokenResponse.access_token } })
            //     .then((res) => {
            //         setUser(res.data)
            //         setMainScreen(3)
            //         setFromShareScreen(true)
            //         if (res?.data?.token) {
            //             window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.token);
            //         }
            //     })
        }
    });

    const { linkedInLogin } = useLinkedIn({
        clientId: '77ezxuyzh6xmh6',
        redirectUri: process.env.REACT_APP_FRONTEND_URL + '/linkedIn-Auth',
        scope: 'openid,profile,email',
        onSuccess: (code) => {
            // axios.get(process.env.REACT_APP_BACKEND_URL + '/auth/linkedin/callback', {
            //     params: {
            //         code,
            //     }
            // }).then((res) => {
            //     setUser(res.data);
            //     setMainScreen(3)
            //     setFromShareScreen(true)
            //     if (res?.data?.token) {
            //         window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.token);
            //     }
            // })
        },
        onError: (error) => {
            console.log(error)
            // setMainScreen(0)
        }
    });

    return (

        <div className={`kjjfds-janwkea`} style={{ marginTop: "100px", marginBottom: "140px" }}>
            {/* <video className="bg-video" src={"/assets/blue_bg.mp4"} autoPlay loop muted></video> */}
            <div className='wave-box'>
                <div className='wave'></div>
            </div>
            <div className="jhjij-sanwe" style={{ marginTop: '130px' }} >
                <h3>Sign in</h3>
                <div className="socialButtonsDiv">
                    <FacebookLogin
                        appId="873599547503766"
                        onSuccess={(response) => {
                            console.log('Login Success!', response);
                        }}
                        onFail={(error) => {
                            console.log('Login Failed!', error);
                        }}
                        onProfileSuccess={(response) => {
                            console.log('Get Profile Success!', response);
                        }}
                        render={({ onClick, logout }) => (
                            <button className="btn" onClick={onClick}>
                                <Icons iconNumber={3} />
                                Log in with Facebook
                            </button>

                        )}
                    />

                    <button className="btn" onClick={() => login()}>
                        <Icons iconNumber={4} />
                        Log in with Google
                    </button>
                    <button className="btn" onClick={() => linkedInLogin()}>
                        <Icons iconNumber={5} />
                        Log in with LinkedIn
                    </button>
                </div>
                <div className="jkdslafj-asdemk mt-1">
                    <div className="jkdsfs-dajem"></div>
                    <h5 className="fw-light mt-1 mx-2">or</h5>
                    <div className="jkdsfs-dajem"></div>
                </div>

                <div className="socialButtonsDiv mt-2">
                    <button className="btn" onClick={() => {
                        // setshowScreen(4)
                        setShareScreen(3)
                    }}>
                        <Icons iconNumber={90} />
                        Login in with Email
                    </button>
                </div>


            </div>
            <div className="ldkjfal0-fdsnfe">
                <Icons iconNumber={64} />
            </div>
        </div >

    );
};

export default SharedLogin;