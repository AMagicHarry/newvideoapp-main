import { useEffect, useState } from "react";
import Icons from "../../components/icons";
import { useMediaQuery } from 'react-responsive'
import { errorByKey } from "../../helper";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const NewPwdForm = ({ setshowScreen, className = '', handleFormChange, signUpFormErrors, setErrorMessage = null, signUpFormData = {} }: { setshowScreen: any, className?: string, handleFormChange: any, signUpFormErrors: any, setErrorMessage?: any, signUpFormData?: any }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [hasError, setHasError] = useState('');

  const showError = (key: any) => {
    return hasError === key;
  };

  useEffect(() => {
    if (errorByKey(signUpFormErrors, 'password')) {
      setHasError('password');
      setErrorMessage(errorByKey(signUpFormErrors, 'password'));
    } else if (errorByKey(signUpFormErrors, 'confirm_password')) {
      setHasError('confirm_password');
      setErrorMessage(errorByKey(signUpFormErrors, 'confirm_password'));
    } else {
      setHasError('');
      setErrorMessage('');
    }
  }, [signUpFormErrors]);

  const handleContinue = () => {
    if (typeof setErrorMessage === 'function') {
      if (!signUpFormData?.password?.length) {
        setHasError('password');
        setErrorMessage('Password must not be empty');
      } else if (signUpFormData?.password?.length < 8) {
        setHasError('password');
        setErrorMessage('Password must be at least 8 characters');
      } else if (signUpFormData?.password !== signUpFormData?.confirm_password) {
        setHasError('confirm_password');
        setErrorMessage('Passwords do not match');
      } else {
        setHasError('');
        setErrorMessage('');
        setshowScreen(3);
      }
    } else {
      setshowScreen(3);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`${isTabletOrMobile ? "kjjfds-janwkea" : "kjjfds-janwkea1 kjjfds-janwkea2"} white-form ${className}`}>
      <div className='wave-box'>
        <div className='wave'></div>
      </div>
      <div className={`jhjij-sanwe ${isTabletOrMobile ? "klhdlfj-ajee2" : ""}`} style={{ height: '100%', justifyContent: 'space-between', marginTop: 0 }}>
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 197 }}>
          <h3 className={`${isTabletOrMobile ? "" : "hkjsda-jesa"}`} style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 600, lineHeight: '19px', letterSpacing: '0.6000000238418579px', textAlign: 'center' }}>Create Password</h3>
          <h4 style={{ fontFamily: 'HK Grotesk', fontSize: 12, fontWeight: 500, lineHeight: '28px', letterSpacing: 0, textAlign: 'center' }}>Password must be at least 8 characters</h4>

          <div className={`${isTabletOrMobile ? "w-100" : "kdjsa-ajwnkelds"}`}>
            <div className={`${isTabletOrMobile ? "hjk-ajwednw" : ""} emailRowDiv sadhasdn-we`}>
              <div className={`jksd-kosaeknae ${showError('password') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="password"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={9} />
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" onChange={handleFormChange} autoComplete="off" style={{ flex: 1 }} />
                <span className="currser-pointer" onClick={togglePasswordVisibility}>

                  {showPassword ? (
                    <BsEyeSlash />
                  ) : (
                    <BsEye />
                  )}
                </span>
              </div>

              <div className={`jksd-kosaeknae ${showError('confirm_password') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="confirm_password"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={9} />
                <input type={showPassword ? 'text' : 'password'} name="confirm_password" placeholder="Confirm Password" onChange={handleFormChange} autoComplete="off" style={{ flex: 1 }} />
                <span className="currser-pointer" onClick={togglePasswordVisibility}>

                  {showPassword ? (
                    <BsEyeSlash />
                  ) : (
                    <BsEye />
                  )}
                </span>
              </div>

              <div className={`${isTabletOrMobile ? "jjlkajsd-awje-msakm3e" : ""} continueBtnDiv snasdj-sawdne`} style={{}}>
                <button onClick={handleContinue} className={`btn`}>
                  CONFIRM CHANGES
                  <div className="kdksa-ajwmd">
                    <Icons iconNumber={7} />
                  </div>
                </button>
              </div>
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

export default NewPwdForm;