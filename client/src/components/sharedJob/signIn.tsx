import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMediaQuery } from "react-responsive";
import { errorByKey } from "../../helper";
import Icons from "../icons";
import { BsEye, BsEyeSlash } from "react-icons/bs";


const SignIn = ({ setShareScreen, setMainScreen, setFromShareScreen }: { setShareScreen: any, setMainScreen: any, setFromShareScreen: any }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [isAgree, setisAgree] = useState(true);
    const [siginInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);

    const { login } = useAuth()

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setSignInForm({
            ...siginInForm,
            [name]: value,
        });
    };
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return (
        <div className={`${isTabletOrMobile ? "kjjfds-janwkea" : "kjjfds-janwkea1 kjjfds-janwkea2"} white-form `} style={{ marginTop: "100px", marginBottom: "140px" }}>
            <div className='wave-box'>
                <div className='wave'></div>
            </div>
            <div className={`jhjij-sanwe ${isTabletOrMobile ? "klhdlfj-ajee2" : ""} email-login-form`}>
                <h3 className={`${isTabletOrMobile ? "" : "hkjsda-jesa"}`}>Enter Login Details</h3>
                <h4>Enter your email and password for this account.</h4>

                <div className={`${isTabletOrMobile ? "w-100" : "kdjsa-ajwnkelds"}`}>
                    <div className={`${isTabletOrMobile ? "hjk-ajwednw" : ""} emailRowDiv sadhasdn-we`}>
                        <div className={`jksd-kosaeknae ${errorByKey(errors, 'email') || errorByKey(errors, 'password') ? 'error-border' : ''}`}>
                            <Icons iconNumber={90} />
                            <input placeholder="Email" name='email' onChange={handleChange} />
                        </div>
                        <div className={`jksd-kosaeknae ${errorByKey(errors, 'email') || errorByKey(errors, 'password') ? 'error-border' : ''}`}>
                            <Icons iconNumber={9} />
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" onChange={handleChange} />
                            <span className="currser-pointer" onClick={togglePasswordVisibility}>

                                {showPassword ? (
                                    <BsEyeSlash />
                                ) : (
                                    <BsEye />
                                )}
                            </span>
                        </div>
                        {errorByKey(errors, 'email') || errorByKey(errors, 'password') ? (
                            <p className="error-message">Invalid email or password</p>
                        ) : ''}
                    </div>
                    {/* <div className="jdaskfjnas-ajaied">
                        <div onClick={() => {
                            setisAgree(!isAgree)
                        }} className="sandka-jwe">
                            <button onClick={() => {
                                // setshowScreen(1)
                            }} className={`${isTabletOrMobile ? "jjlkajsd-awje" : ""}`}>Create Account</button>
                        </div>
                        <div className={`${isTabletOrMobile ? "jdsfknla-wnejnw" : ""}`}>
                            <button onClick={() => {
                                // setshowScreen(5)
                            }} className="no-shadow">Forgot Password?</button>
                        </div>
                    </div> */}
                    <div className={`${isTabletOrMobile ? "jjlkajsd-awje-msakm3e" : ""} continueBtnDiv snasdj-sawdne`}>
                        <button onClick={() => {
                            setErrors([]);
                            // setErrorMessage('');
                            login(siginInForm).then((res) => {
                                localStorage.setItem('loggedin', 'true');
                                setMainScreen(3)
                                setFromShareScreen(true)
                            }).catch((err) => {
                                if (err?.response?.data?.message?.length) {
                                    if (Array.isArray(err.response.data.message)) {
                                        setErrors(err.response.data.message);
                                    } else {
                                        // setErrorMessage(err.response.data.message);
                                    }
                                }
                            })
                            // setshowScreen(5)
                        }} className={`btn`}>
                            CONTINUE
                            <div className="kdksa-ajwmd">
                                <Icons iconNumber={7} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="ldkjfal0-fdsnfe">
                <Icons iconNumber={isTabletOrMobile ? 64 : 62} />
            </div>
        </div>
    );
};


export default SignIn