import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Icons from "../../components/icons";
import { useAuth } from "../../hooks/useAuth";
import { errorByKey } from "../../helper";
import { BsEyeSlash,BsEye  } from "react-icons/bs";
const EmailLoginForm = ({ setshowScreen, className = '', setMainScreen, setErrorMessage }: { setshowScreen: any, className?: string, setMainScreen: any, setErrorMessage: any }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [isAgree, setisAgree] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [siginInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const { login } = useAuth()
  const [hasError, setHasError] = useState('');

  const showError = (key: any) => {
    return hasError === key;
  };

  useEffect(() => {
    if (errorByKey(errors, 'password')) {
      setHasError('password');
      setErrorMessage(errorByKey(errors, 'password'));
    } else if (errorByKey(errors, 'confirm_password')) {
      setHasError('confirm_password');
      setErrorMessage(errorByKey(errors, 'confirm_password'));
    } else {
      setHasError('');
      setErrorMessage('');
    }
  }, [errors]);

  const handleContinue = () => {
    if (typeof setErrorMessage === 'function') {
      if (!siginInForm?.email?.length) {
        setHasError('email');
        setErrorMessage('You must enter a Email');
      } else if (!siginInForm?.password?.length) {
        setHasError('password');
        setErrorMessage('You must enter a Password');
      } else {
        submit();
      }
    } else {
      submit();
    }
  };

  const submit = () => {
    setErrors([]);
    setHasError('');
    setErrorMessage('');
    login(siginInForm).then((res) => {
      localStorage.setItem('loggedin', 'true');
      setMainScreen(1)
    }).catch((err) => {
      if (err?.response?.data?.message?.length) {
        if (Array.isArray(err.response.data.message)) {
          setErrors(err.response.data.message);
        } else {
          setErrorMessage(err.response.data.message);
        }
      }
    })
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setSignInForm({
      ...siginInForm,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`${isTabletOrMobile ? "kjjfds-janwkea" : "kjjfds-janwkea1 kjjfds-janwkea2"} white-form-test ${className}`}>
      <div className='wave-box'>
        <div className='wave'></div>
      </div>
      <div className={`jhjij-sanwe ${isTabletOrMobile ? "klhdlfj-ajee2" : ""} email-login-form`} style={{ height: '100%', justifyContent: 'space-between', marginTop: 0, paddingTop: 179 }}>
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className={`${isTabletOrMobile ? "" : "hkjsda-jesa"}`} style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 600, lineHeight: '19px', letterSpacing: '0.6000000238418579px', textAlign: 'center' }}>Enter Login Details</h3>
          <h4 style={{ fontFamily: 'HK Grotesk', fontSize: 12, fontWeight: 500, lineHeight: '28px', letterSpacing: 0, textAlign: 'center' }}>Enter your email and password for this account</h4>

          <div className={`${isTabletOrMobile ? "w-100" : "kdjsa-ajwnkelds"}`}>
            <div className={`${isTabletOrMobile ? "hjk-ajwednw" : ""} emailRowDiv sadhasdn-we`}>
              <div className={`jksd-kosaeknae ${showError('email') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="email"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={90} />
                <input placeholder="Email" name='email' onChange={handleChange} autoComplete="off" style={{ flex: 1 }} />
              </div>
              <div className={`jksd-kosaeknae ${showError('password') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="password"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={9} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" onChange={handleChange} autoComplete="off" style={{ flex: 1 }} />
                <span className="currser-pointer" onClick={togglePasswordVisibility}>

                  {showPassword ? (
                    <BsEyeSlash />
                  ) : (
                    <BsEye />
                  )}
                </span>
              </div>
            </div>
            <div className="jdaskfjnas-ajaied">
              <div onClick={() => {
                setisAgree(!isAgree)
              }} className="sandka-jwe">
                <button onClick={() => {
                  setshowScreen(1)
                }} className={`${isTabletOrMobile ? "jjlkajsd-awje" : ""}`}>Create Account</button>
              </div>
              <div className={`${isTabletOrMobile ? "jdsfknla-wnejnw" : ""}`}>
                <button onClick={() => {
                  setshowScreen(5)
                }} className="no-shadow">Forgot Password?</button>
              </div>
            </div>

            <div className={`${isTabletOrMobile ? "jjlkajsd-awje-msakm3e" : ""} continueBtnDiv snasdj-sawdne`} style={{ marginBottom: 20 }}>
              <button onClick={handleContinue} className={`btn`}>
                CONTINUE
                <div className="kdksa-ajwmd">
                  <Icons iconNumber={7} />
                </div>
              </button>
            </div>
          </div>
        </div>


      </div>
      <div className="ldkjfal0-fdsnfe">
        <Icons iconNumber={isTabletOrMobile ? 64 : 62} />
      </div>
    </div>
  );
};

export default EmailLoginForm;