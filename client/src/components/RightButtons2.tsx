import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Icons from "./icons"
import TinyModal from "./Modals/tiny_modal";

const RightButtons2 = ({ setMainScreen, setShowScreen, setPastScreen, hideMenu }: { setMainScreen: any, setShowScreen: any, setPastScreen: any, hideMenu: boolean }) => {
  const isTab = useMediaQuery({ query: '(max-width: 1013px)' });
  const [showDelInterview, setShowDelInterview] = useState(false);

  return <div className={`kljadjfkl-jaem rightbuttons2 ${hideMenu ? "jkdslfsae" : isTab ? "lkhdfjksj-ajenw" : ""}`}>
    <button className="no-shadow circleButtons" onClick={() => setMainScreen(3)}>
      <Icons iconNumber={45} />
      Preview
    </button>
    <button className="no-shadow circleButtons" onClick={() => {
      setShowScreen(1);
      setPastScreen(6);
    }}>
      <Icons iconNumber={46} />
      Edit
    </button>
    <button className="no-shadow circleButtons">
      <Icons iconNumber={47} />
      Share
    </button>
    <button className="no-shadow circleButtons">
      <Icons iconNumber={48} />
      Messages
    </button>
    <button className="no-shadow circleButtons" onClick={() => setShowDelInterview(true)}>
      <Icons iconNumber={49} />
      Delete
    </button>
    <TinyModal show={showDelInterview} handleClose={() => setShowDelInterview(false)} type="delete_interview" setMainScreen={setMainScreen} jobView={''} />
  </div>
}

export default RightButtons2