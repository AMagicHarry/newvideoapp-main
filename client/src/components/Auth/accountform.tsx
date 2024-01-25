import React, { useEffect, useState } from "react";
import Icons from "../../components/icons";
import { useMediaQuery } from 'react-responsive'
import { errorByKey } from "../../helper";
import { validateEmail } from "../../utils/validate-email";
import PrivacyTerms from "../Modals/privacy_terms";

const SignInForm = ({ setshowScreen, className = '', handleFormChange, signUpFormErrors, setErrorMessage = null, signUpFormData = {} }: { setshowScreen: any, className?: string, handleFormChange: any, signUpFormErrors: any, setErrorMessage?: any, signUpFormData?: any }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [isAgree, setisAgree] = useState(false);
  const [hasError, setHasError] = useState('');
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);

  const handlePrivacyTermsModalClose = () => {
    setShowPrivacyTerms(false)
  };
  const handlePrivacyTermsModalShow = () => {
    setShowPrivacyTerms(true);
  };

  const showError = (key: any) => {
    return hasError === key;
  };

  useEffect(() => {
    if (errorByKey(signUpFormErrors, 'name')) {
      setHasError('name');
      setErrorMessage(errorByKey(signUpFormErrors, 'name'));
    } else if (errorByKey(signUpFormErrors, 'email')) {
      setHasError('email');
      setErrorMessage(errorByKey(signUpFormErrors, 'email'));
    } else {
      setHasError('');
      setErrorMessage('');
    }
  }, [signUpFormErrors]);

  const handleContinue = () => {
    if (typeof setErrorMessage === 'function') {
      if (!signUpFormData?.name?.length) {
        setHasError('name');
        setErrorMessage('You must enter your Full Name!');
      } else if (!signUpFormData?.email?.length) {
        setHasError('email');
        setErrorMessage('You must enter your Email!');
      } else if (signUpFormData?.email?.length && !validateEmail(signUpFormData?.email)) {
        setHasError('email');
        setErrorMessage('Invalid email address!');
      } else if (!isAgree) {
        setHasError('terms');
        setErrorMessage('You must agree to the Terms & Conditions');
      } else {
        setHasError('');
        setErrorMessage('');
        setshowScreen(2);
      }
    } else {
      setshowScreen(2);
    }
  };

  const onHandleStatus = (status:boolean) =>{

    setisAgree(status)
  }

  return (
    <div className={`${isTabletOrMobile ? "kjjfds-janwkea" : "kjjfds-janwkea1 kjjfds-janwkea2"} ${className}`}>
      <div className='wave-box'>
        <div className='wave'></div>
      </div>
      <div className={`jhjij-sanwe ${isTabletOrMobile ? "klhdlfj-ajee2" : ""}`} style={{ height: '100%', justifyContent: 'space-between', marginTop: 0 }}>
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop:156 }}>
          <h3 className={`${isTabletOrMobile ? "" : "hkjsda-jesa"}`} style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: 600, lineHeight: '19px', letterSpacing: '0.6000000238418579px', textAlign: 'center' }}>Create Account</h3>
          <h4 style={{ fontFamily: 'HK Grotesk', fontSize: 12, fontWeight: 500, lineHeight: '28px', letterSpacing: 0, textAlign: 'center' }}>Password must be at least 8 characters</h4>

          <div className={`${isTabletOrMobile ? "w-100" : "kdjsa-ajwnkelds"}`}>
            <div className={`${isTabletOrMobile ? "hjk-ajwednw" : ""} emailRowDiv sadhasdn-we`}>
              <div className={`jksd-kosaeknae ${showError('name') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="name"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={10} />
                <input placeholder="Full Name" name="name" onChange={handleFormChange} autoComplete="off" style={{ flex: 1 }} />
              </div>
              <div className={`jksd-kosaeknae ${showError('email') ? 'error-border' : ''}`} style={{ cursor: 'text' }} onClick={(e) => {
                const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="email"]');
                if (_node) {
                  _node.focus();
                }
              }}>
                <Icons iconNumber={10} />
                <input placeholder="Email" name="email" onChange={handleFormChange} autoComplete="off" style={{ flex: 1 }} />
              </div>
            </div>
            <div className="jdaskfjnas-ajaied">
              <div className="sandka-jwe">
                <Icons iconNumber={isTabletOrMobile ? 57 : isAgree ? 11 : 74} />
                <h5 className={`${isTabletOrMobile ? "jjlkajsd-awje" : ""}`}> 
                <span  > 
              I agree to the </span>
                <a href="javascript:void(0);" onClick={() => handlePrivacyTermsModalShow()}>terms & conditions</a> </h5>
              </div>
              <div className={`${isTabletOrMobile ? "jdsfknla-wnejnw" : ""}`}>
                <button onClick={() => {
                  setshowScreen(0)
                }} className="no-shadow no-background">Log in</button>
              </div>
            </div>
          </div>
          <div className={`${isTabletOrMobile ? "jjlkajsd-awje-msakm3e" : ""} continueBtnDiv snasdj-sawdne`} style={{  }}>
          <button onClick={handleContinue} className={`btn mb-0`}>
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
              <PrivacyTerms handleStatus={onHandleStatus}  handleClose={handlePrivacyTermsModalClose} show={showPrivacyTerms}></PrivacyTerms>
    </div>
  );
};

export default SignInForm;