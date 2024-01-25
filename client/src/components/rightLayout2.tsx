import React, { useEffect, useState } from 'react';
import Icons from './icons';
import SimpleCheckBox from './simpleCheck';
import SettingMenuIcon from './SettingMenuIcon';
import { useAuth } from '../hooks/useAuth';
import Typed from "typed.js";
const RightLayout = ({ setMainScreen, setShowScreen, showScreen = null, style = {}, mainScreen = null }: { setMainScreen: any, setShowScreen: any, showScreen?: any, style?: any, mainScreen?: any }) => {
  const { isLoggedIn } = useAuth();
  const [isLoginChecked, setIsLoginChecked] = useState(true);
  useEffect(() => {
    const typed = new Typed('.headline', {
    strings: [
    '"Tell me about <br/> yourself in <br/> <span class="activeTypedblue">30 seconds"</span>',
    '"Tell me why <br/> you’re <span class="activeTypedgreen">perfect</span> for this role"',
    '"Tell me about <br/> your relevant <br/><span class="activeTypedblue">experience"</span>',
    '"Where do you <br/> see yourself in <br/> <span class="activeTypedgreen"> 5 years"</span>',
    '"What are you <br/> <span class="activeTypedblue">passionate </span><br/> about?"',
    '"How do you <br/> stay <span class="activeTypedgreen">organised</span><br/> at work?"',
    '"Tell me about <br"/> a time you face <br/> <span class="activeTypedblue">adversity"</span>',
    '"What makes you <br/> <span class="activeTypedgreen">unique"</span>',
    '"Tell me what <br/> you most enjoy about <span class="activeTypedblue">work"</span>',
    '"Tell me what <br/> makes you a great <br/><span class="activeTypedgreen">candidate"</span>',
    '"Tell me what <br/> you’d like to <span class="activeTypedblue">ask</span> about the position"'
    ],
    startDelay: 1000,
    typeSpeed: 50,
    backSpeed: 35,
    backDelay: 10000,
    smartBackspace: true,
    loop: true,
    showCursor: true,
    });
    
    
    
    return () => {
    typed.destroy();
    };
    }, []);
  useEffect(() => {
    switch (showScreen) {
      case 0:
      case 4:
        setIsLoginChecked(true);
        break;
      case 1:
        setIsLoginChecked(false);
        break;
      default:
        break;
    }
  }, [showScreen]);

  return <div className="rightSideDiv kjdsfkn-ajdnkw" style={style}>
    <div className={`d-${isLoggedIn() ? 'flex' : 'none'} justify-content-end`}>
      <SettingMenuIcon setMainScreen={setMainScreen} />
    </div>
    {!isLoggedIn() && (mainScreen == 0 || mainScreen == 7) ? (
      <div className="tabs-container">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" onChange={() => {
            if (typeof setShowScreen === 'function') {
              setIsLoginChecked(false);
              setShowScreen(1);
            } else if (typeof setMainScreen === 'function') {
              setMainScreen(0);
            }
          }} checked={!isLoginChecked} />
          <label className="tab" htmlFor="radio-1">SIGN UP</label>
          <input type="radio" id="radio-2" name="tabs" onChange={() => {
            if (typeof setShowScreen === 'function') {
              setIsLoginChecked(true);
              setShowScreen(0);
            } else if (typeof setMainScreen === 'function') {
              setMainScreen(0);
            }
          }} checked={isLoginChecked} />
          <label className="tab" htmlFor="radio-2">LOGIN</label>
          <span className="glider"></span>
        </div>
      </div>
    ) : null}
    <div className="nakds-ajews" style={{textAlign: "left"}}>
      <div className="topSectionDiv d-flex">
        {/* <h1>“</h1> */}
        <h1 className='kjjsad-wjwdwe headline'>Tell me why you’re <span>perfect</span> for this role” </h1>
      </div>
      <div className="middleSectionDiv">
        <SimpleCheckBox span="Choose" title=" 3 Questions" />
        <SimpleCheckBox span="Share" title=" link with candidates" />
        <SimpleCheckBox span="Watch" title=" the video responses roll in" />
      </div>
      <div className="createVideoInterviewBtnDiv ">
        <button className="btn no-shadow asjdsajde" onClick={() => {
          setMainScreen(0);
          setShowScreen(0);
        }}>Create Video Interview</button>
      </div>
      <div className="homescreenFloater">
        <img src={require("../images/i1.png")} />
      </div>
      <div className="homescreenFloater1">
        <img src={require("../images/i2.png")} />
      </div>
      <div className="homescreenFloater2 c-pr">
        {/* <img src={require("../images/i3.png")} /> */}
      </div>
    </div>
    <div className='kjladsm-sajdw'>
      <Icons iconNumber={60} />
    </div>
  </div>
}
export default RightLayout;