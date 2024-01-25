import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Icons from "../icons";
//@ts-ignore
import { Flip } from "react-awesome-reveal"
import Notify from "../Notify";
import {
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";
import RightButtons from "../RightButtons";

const ShareForm = ({
  setMainScreen,
  setShowScreen,
  setPastScreen,
  showScreen,
  jobView,
  setChatUser
}: {
  setMainScreen: any;
  setShowScreen: any;
  setPastScreen: any;
  showScreen: number;
  jobView: any;
  setChatUser: any;
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1013px)' });
  const [notify_show, setNotifyShow] = useState(false);
  const [linkToCopy, setLinkToCopy] = useState<any>(process.env.REACT_APP_FRONTEND_URL);

  useEffect(() => {
    if (jobView?._id) {
      setLinkToCopy(`${process.env.REACT_APP_FRONTEND_URL}/${jobView._id}`);
    }
  }, []);

  return (
    <>
      
      {notify_show && (<Notify classes="notifi-sharelink" title="Direct link copied!" show={notify_show} handleClose={() => setNotifyShow(false)} />)}
      
      
      <Flip direction="horizontal">
        <div className="jkljfkld-jdskfe">
          <div className="kjjfds-janwkea hover-anim sharebox-kdj-w">
            {/* <video className="bg-video" src={"/assets/blue_bg.mp4"} autoPlay loop muted></video> */}
            <video className="bg-video" src={"/assets/blue_bg.mp4"} autoPlay loop muted style={{ height: 'auto', width:'338px !important' }}></video>
            <div className='wave-box'>
              <div className='wave'></div>
            </div>
            <div className="jhjij-sanwe" style={{ height: '100%', justifyContent: 'space-between', marginTop: 71, paddingTop: 56 }}>

              <h3>Share Questions</h3>
              <h4 className="ksajdsd-sjad">
                Invite people to Answer
              </h4>
              <div className="copyLinkDiv">
                <button className="btn" style={{
                  paddingLeft: 40,
                  paddingRight: 30
                }} onClick={() => {
                  navigator.clipboard.writeText(linkToCopy).then(() => setNotifyShow(true))
                }}>
                  <Icons iconNumber={44} />
                  Copy Direct Link to Questions
                </button>
              </div>
              <div className="jkdslafj-asdemk">
                <div className="jkdsfs-dajem"></div>
                <h5>or</h5>
                <div className="jkdsfs-dajem"></div>
              </div>
              <div className="socialButtonsDiv">
                <FacebookShareButton className="btn" url={linkToCopy} children={
                  <button className="btn">
                    <Icons iconNumber={3} />
                    Share via Facebook
                  </button>
                } />
                <LinkedinShareButton className="btn" url={linkToCopy} children={
                  <button className="btn">
                    <Icons iconNumber={5}></Icons>
                    Share via LinkedIn
                  </button>
                } />
              </div>
              <div className="continueBtnDiv snasdj-sawdne">
                <button onClick={() => {
                  setShowScreen(7);
                }} className="btn kjlsjadm-kdmsd-2">
                  CLOSE
                  <Icons iconNumber={43} />
                </button>
              </div>
            </div>
            
            <div className="ldkjfal0-fdsnfe">
              <Icons iconNumber={64} />
            </div>
          </div>
          <RightButtons setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} hideMenu={isMobile ? true : false} style={{ right: '-80px' }} />
        </div>
      </Flip>
    </>
  );
};

export default ShareForm