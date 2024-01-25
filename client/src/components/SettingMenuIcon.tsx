import { useEffect, useState } from "react";
import { OverlayTrigger, CloseButton } from 'react-bootstrap';
// @ts-ignore
import $ from "jquery";
import Icons from './icons';

import profile_img from "../images/Profile Pic.svg";
import company_img from "../images/Vector.svg";
import location_img from "../images/Location.svg";
import PrivacyTermsModal from './Modals/privacy_terms';
import AccountSecurityModal from "./Modals/account_security";
import PaymentSettingModal from "./Modals/payment_setting";
import TinyModal from "./Modals/tiny_modal";
import Notify from "./Notify";
//import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "../hooks/useAuth";
//import { Elements } from "@stripe/react-stripe-js";

//const stripePromise: any = loadStripe('pk_test_51OPPTIKkpvXbNi5LxvHVYnYO4DTMyAPoQ8E1Vy8IJmHpWu7EfXVDSNja46vNEIh15U5uaLMOIybXfQjs3Ft3p5dS00P6OdNmXE');

const SettingMenuIcon = ({ setMainScreen }: { setMainScreen: any }) => {
  useEffect(() => {
    $(".overlay.btn-close").hide();
    $(".overlay.btn-close").click(function () {
      // @ts-ignore
      $(this).hide();
    });

    $(".btn-show").click(function () {
      $(".overlay.btn-close").show();
    });

    $(window).click(function () {
      if ($(".overlay.show").length == 0) {
        $(".overlay.btn-close").hide();
      }
    });
  }, []);

  const [showAccount, setShowAccount] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState("Settings Changed");
  const [notifyShow, setNotifyShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth()

  const handleAccountClose = () => setShowAccount(false);
  const handleAccountShow = () => {
    $(".overlay").hide();
    setShowAccount(true);
  }

  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => {
    $(".overlay").hide();
    setShowPayment(true);
  }

  const handlePrivacyClose = () => setShowPrivacy(false);
  const handlePrivacyShow = () => {
    $(".overlay").hide();
    setShowPrivacy(true);
  }

  const handleLogoutClose = () => setShowLogout(false);
  const handleLogoutShow = () => {
    $(".overlay").hide();
    setShowLogout(true);
  }
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOverlayShow = () => {
    setShowOverlay(true);
  };

  const handleOverlayHide = () => {
    setShowOverlay(false);
  };
  return (
    <>
      {/* <CloseButton className="overlay" variant="white" /> */}
      {/* <OverlayTrigger trigger="click" placement="left" overlay={ */}
      {showOverlay && (<div className="postion_relative"><div className="overlay text-white" onMouseLeave={handleOverlayHide}>
          <div className="header text-center">
            {/* <img src={profile_img} className="profile" /> */}
            <img
              className="profile rounded-circle border border-2 border-white"
              src={user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000") || user?.profile_image || profile_img}
              onError={(e: any) => {
                e.target.src = profile_img;
                e.target.src = user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000");
              }}
              alt="Profile Picture"
              style={{ width: 95, height: 95 }}
            />
            <h5>{user?.name}</h5>
            <div className="desc"><img src={company_img} /> {user?.company_name}</div>
            <div className="desc"><img src={location_img} /> {user?.location}</div>
          </div>
          <div className="overlay-part">
            <div onClick={handleAccountShow}>
              <Icons iconNumber={96} />
              Account & Security
            </div>
            <div onClick={handlePaymentShow}>
              <Icons iconNumber={97} />
              Payment Settings
            </div>
          </div>
          <div className="overlay-part">
            <div>
              <Icons iconNumber={98} />Help Center
            </div>
            <div onClick={handlePrivacyShow}>
              <Icons iconNumber={99} />Privacy & Terms
            </div>
            <div>
              <Icons iconNumber={100} />Contact Us
            </div>
          </div>
          <div onClick={handleLogoutShow} className='text-center logout'>
            <span>LOG OUT</span>
          </div>
        </div></div>)}
      {/* } rootClose> */}
        <button  onMouseOver={handleOverlayShow} className="profile-img-btn btn btn-show no-shadow border-0 outline-0">
          {/* <Icons iconNumber={1} /> */}
          <img
            className="profile-img p-0 rounded-circle border border-2 border-white"
            src={user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000") || user?.profile_image || profile_img}
            onError={(e: any) => {
              e.target.src = profile_img;
              e.target.src = user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000");
            }}
            alt="Profile Picture"
            style={{ width: '45px', height: '45px' }}
          />
        </button>
      {/* </OverlayTrigger> */}
      <AccountSecurityModal show={showAccount} handleClose={handleAccountClose} setNotifyShow={setNotifyShow} setMainScreen={setMainScreen} setNotifyTitle={setNotifyTitle} setErrorMessage={setErrorMessage} />
      
      {/*<Elements stripe={stripePromise} >
        <PaymentSettingModal show={showPayment} handleClose={handlePaymentClose} />
          </Elements>*/}

      <PrivacyTermsModal show={showPrivacy} handleClose={handlePrivacyClose} />
      <TinyModal show={showLogout} handleClose={handleLogoutClose} type="logout" setMainScreen={setMainScreen} jobView={''} />
      <Notify show={notifyShow} title={notifyTitle} handleClose={() => {
        setNotifyShow(false)
        setNotifyTitle("Settings Changed")
      }} />
      <Notify type="danger" title={errorMessage} show={!!errorMessage?.length} handleClose={() => setErrorMessage('')} />
    </>
  )
}

export default SettingMenuIcon;