import { useEffect, useState } from "react";
import Icons from "../icons";
import ProgressCircle from './progressCircle'

const ProgressForm = ({ setScreen, jobViewContext, recorded, setRecorded, className = '' }: { setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, className?: any }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById('targetElementProgress');

    if (targetElement) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDNone = targetElement.classList.contains('d-none');
            setShouldDisplay(!isDNone);
          }
        });
      });

      const config = { attributes: true };
      observer.observe(targetElement, config);
    }
  }, []);

  return (
    <div id="targetElementProgress" className={`kjjfds-janwkea knlsdj0wjew ${className}`} style={{ cursor: 'pointer', height: 520, width: 320 }}>
      {/* <video className="bg-video" src={"/assets/blue_bg.mp4"} autoPlay loop muted></video> */}
      <div className='wave-box'>
        <div className='wave'></div>
      </div>
      <div className="kjdslfk-sjadnkwe mb-5">
        {shouldDisplay ? (
          <ProgressCircle setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
        ) : null}
      </div>
      <div className="ldjkfsa-jwme" style={{ width: 280 }}>
        <div className="d-flex justify-content-center">
          <Icons iconNumber={22} />
          <h5>Awesome!</h5>
        </div>
        <div className="kdjsa-ajwnkelds afkfjnkas-edsm mb-2">
          <div className="continueBtnDiv snasdj-sawdne">
            <button className="btn" onClick={() => {
              setScreen(0)
            }}>
              CONTINUE
              <div className="kdksa-ajwmd ">
                <Icons iconNumber={7} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="ldkjfal0-fdsnfe">
        <Icons iconNumber={64} />
      </div>
    </div>
  );
};

export default ProgressForm;