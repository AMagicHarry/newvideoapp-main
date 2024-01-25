import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./screens/auth";
import { useEffect, useMemo, useState } from "react";
import Question from "./screens/questions";
import Answers from "./screens/answers";
import Start from './screens/start';
import Messages from './screens/messages'
import DemoScreen from "./screens/demo";
import { AuthProvider } from "./context/Auth";
import { SharedProvider } from "./context/Share";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FullscreenProvider } from "./context/Fullscreen";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Notify from "./components/Notify";
import { useShared } from "./hooks/useShare";
import SharedJobScreen from "./screens/sharedJobScreen";


function App() {
  const [mainScreen, setMainScreen] = useState(7);
  const [jobViewContext, setJobViewContext] = useState()
  const [watchAns, setWatchAns] = useState(false)
  const [chatUser, setChatUser] = useState()
  const [show, setShow] = useState(false)
  const [showSharedNotify, setShowNotify] = useState(false)
  const [fromShareScreen, setFromShareScreen] = useState(false)
  const params = useParams()
  const { setShared, setSharedJobData } = useShared()

  useEffect(() => {
    const { job_id } = params
    if (job_id) {
      // axios.get(`${process.env.REACT_APP_BACKEND_URL}/interviewer/${job_id}`).then((res) => {
      //   console.log("appts job api", res.data)
      //   window.localStorage.setItem('shared', 'true')
      //   setJobViewContext(res.data)
      //   setShowNotify(true)
      //   setShared(true)
      //   setMainScreen(8)

      // })
    }
  }, [params])

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <FullscreenProvider>
        <SharedProvider>
          <AuthProvider setMainScreen={setMainScreen}>
            {
              mainScreen == 0 ? <Auth mainScreen={mainScreen} setMainScreen={setMainScreen} />
                : mainScreen == 1 ? <Question mainScreen={mainScreen} setMainScreen={setMainScreen} jobViewContext={jobViewContext} setJobViewContext={setJobViewContext} setChatUser={setChatUser} setWatchAns={setWatchAns} showSharedNotify={showSharedNotify} setShowNotify={setShowNotify} />
                  : mainScreen == 2 ? <Answers mainScreen={mainScreen} setMainScreen={setMainScreen} setChatUser={setChatUser} jobViewContext={jobViewContext} watchAns={watchAns} />
                    : mainScreen == 3 ? <Start fromShareScreen={fromShareScreen} setMainScreen={setMainScreen} jobViewContext={jobViewContext} setJobViewContext={setJobViewContext} setFromShareScreen={setFromShareScreen} />
                      : mainScreen == 4 ? <Messages mainScreen={mainScreen} setMainScreen={setMainScreen} chatUser={chatUser} />
                        : mainScreen == 7 ? <DemoScreen mainScreen={mainScreen} setMainScreen={setMainScreen} />
                          // : null
                          : mainScreen == 8 ? <SharedJobScreen setFromShareScreen={setFromShareScreen} setMainScreen={setMainScreen} setJobViewContext={setJobViewContext} jobViewContext={jobViewContext} /> : <Auth mainScreen={mainScreen} setMainScreen={setMainScreen} />
            }
          </AuthProvider>
        </SharedProvider>
      </FullscreenProvider>
      <Notify show={show} handleClose={() => setShow(false)} title="Payment Method Added Successfully" />
    </GoogleOAuthProvider>
  );
}

export default App;