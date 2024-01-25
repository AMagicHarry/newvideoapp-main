import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Icons from "./icons"
import TinyModal from "./Modals/tiny_modal";
import { useShared } from "../hooks/useShare"

const RightButtons = ({ setMainScreen, setShowScreen, setPastScreen, hideMenu, jobView, setChatUser, style = {} }: { setMainScreen: any, setShowScreen: any, setPastScreen: any, hideMenu: boolean, jobView: any, setChatUser: any, style?: any }) => {
  const isTab = useMediaQuery({ query: '(max-width: 1013px)' });
  const [showDelInterview, setShowDelInterview] = useState(false);
  const { setFlag } = useShared()

  return <div className={`kljadjfkl-jaem ${hideMenu ? "jkdslfsae" : isTab ? "lkhdfjksj-ajenw" : ""}`} style={{ right: '-75px' }}>
    <button className="no-shadow circleButtons" onClick={() => setMainScreen(3)}>
      <Icons iconNumber={45} />
      Preview
    </button>
    <button className="no-shadow circleButtons" onClick={() => {
      setFlag(true);
      setShowScreen(1);
      setPastScreen(7);
    }}>
      <Icons iconNumber={46} />
      Edit
    </button>
    <button className="no-shadow circleButtons" onClick={() => setShowScreen(8)}>
      <Icons iconNumber={47} />
      Share
    </button>
    <button className="no-shadow circleButtons" onClick={() => {
      setMainScreen(4)
      setChatUser(jobView)
    }}>
      <Icons iconNumber={48} />
      Messages
    </button>
    <button className="no-shadow circleButtons" onClick={() => setShowDelInterview(true)}>
      <Icons iconNumber={49} />
      Delete
    </button>
    <TinyModal show={showDelInterview} handleClose={() => setShowDelInterview(false)} type="delete_interview" setMainScreen={setMainScreen} setshowScreen={setShowScreen} jobView={jobView} />
  </div>
}

export default RightButtons