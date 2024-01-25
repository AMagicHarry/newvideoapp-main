import { useEffect, useState } from "react";
import RightLayout2 from "../components/rightLayout2";
import BottomMenu from "../components/bottomMenu";
import BackMenu from "../components/Questions/BackMenu";
import OptionButtons from "../components/Questions/OptionButton";
import QuestionForm from "../components/Questions/QuestionsForm";
import CreateForm from "../components/Questions/CreateForm";
import ShareForm from "../components/Questions/ShareForm";
import ViewForm from "../components/Questions/ViewForm";
import { useMediaQuery } from "react-responsive";
import RightButtons from "../components/RightButtons";
import LinearBackground from "../components/LinearBackground";
import { useFullscreen } from "../hooks/useFullscreen";
import Notify from "../components/Notify";

function View({ mainScreen, setMainScreen, setJobViewContext, setChatUser, jobViewContext, setWatchAns, showSharedNotify, setShowNotify }: { mainScreen: number, setMainScreen: any, setJobViewContext: any, setChatUser: any, jobViewContext: any, setWatchAns: any, showSharedNotify: any, setShowNotify: any }) {
  const [showScreen, setShowScreen] = useState(0);
  const [pastScreen, setPastScreen] = useState(0);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const isTab = useMediaQuery({ query: '(max-width: 1013px)' });
  const [jobView, setJobView] = useState(null)

  const [myQuestions, setMyQuestions] = useState(false)
  const { fullscreen } = useFullscreen();
  const [selectedInterview, setSelectedInterview] = useState<any>(null);

  useEffect(() => {
     
    
  
    const _window: any = window;
    if(_window?.setShowScreen > -1) {
      setShowScreen(_window?.setShowScreen);
      delete _window?.setShowScreen;
    }
   
  
  }, []);

  
  useEffect(() => {
    if (jobView) {
      setJobViewContext(jobView)
    }
  }, [jobView])

  return (
    <LinearBackground style={{ width: '100%' }}>
      <div className="pageContainer" style={{ padding: 25 }}>
        <div className="leftSideDiv" style={fullscreen ? { width: '100%' } : {}}>
          {
            showScreen <= 5 ?
              <div className="leftSideMain leftsideWhithTransparentBg">
                {pastScreen > 5 ? (
                  <div className={`lnjsadnksa-sda ${isMobile && pastScreen == 7 ? "" : "kjsadl-asdksm"}`}>
                     
                     
                    {pastScreen == 6 ? (
                      <>
                     
                      <ShareForm setMainScreen={setMainScreen} showScreen={showScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} />
                      <RightButtons setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} hideMenu={showRightMenu && isTab ? false : true} />

                                             </>
                    ) : ( <>
                     
                      <ViewForm setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} jobViewContext={jobViewContext} setWatchAns={setWatchAns} />
                      <RightButtons setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} hideMenu={showRightMenu && isTab ? false : true} />
                   
                    
                    </> )
                    }

                  </div>
                ) : <>
                  <OptionButtons myQuestions={myQuestions} setMyQuestions={setMyQuestions} showSharedNotify={showSharedNotify} setShowNotify={setShowNotify}/>
                  <QuestionForm setMainScreen={setMainScreen} setShowScreen={setShowScreen} setJobView={setJobView} myQuestions={myQuestions} />
                </>}
              </div> :
              <></>
          }
          {showScreen > 5 ? (
            <div className={`lnjsadnksa-sda ${isMobile && showScreen == 7 ? "" : "kjsadl-asdksm"}`} style={{ position: 'absolute', top: 0 }}>
              
              
              {showScreen == 6 || showScreen == 7 ? (
                <>
                  
                  <ViewForm setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} jobViewContext={jobViewContext} setWatchAns={setWatchAns} />
                  <RightButtons setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} hideMenu={showRightMenu && isTab ? false : true} />
                
                </>
              ) : showScreen == 8 ?  (
                <>
                <ShareForm setMainScreen={setMainScreen} showScreen={showScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} />
                  <RightButtons setMainScreen={setMainScreen} setShowScreen={setShowScreen} setPastScreen={setPastScreen} jobView={jobView} setChatUser={setChatUser} hideMenu={showRightMenu && isTab ? false : true} />
                
                
                </>
              ):<></>}

            </div>
          ) : <></>}
          <BackMenu showRightMenu={showRightMenu} setShowRightMenu={setShowRightMenu} showScreen={showScreen} setShowScreen={setShowScreen} />
          {showScreen >= 1 && showScreen <= 5 ? (
            <CreateForm showScreen={showScreen} setShowScreen={setShowScreen} setJobView={setJobView} jobView={jobView}/>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-center kdnklms-awendwd-11">
            <BottomMenu setShowScreen={setShowScreen} showScreen={showScreen} mainScreen={mainScreen} setMainScreen={setMainScreen} />
          </div>
        </div>
        <RightLayout2 setMainScreen={setMainScreen} setShowScreen={setShowScreen} style={fullscreen ? { display: 'none', borderRadius: 33 } : { borderRadius: 33 }} />
      </div>
    </LinearBackground>
  );
}

export default View;
