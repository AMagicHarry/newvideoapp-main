
import { useEffect, useState } from "react";
import Icons from "../icons";
import RecordForm from "./recordForm";
import { useFullscreen } from "../../hooks/useFullscreen";

const RecordFormParent = ({ setScreen, jobViewContext, recorded, setRecorded, className = '', fromShareScreen }: { setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, className?: any, fromShareScreen: any }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const { setFullscreen } = useFullscreen()
  useEffect(() => {

    if (fromShareScreen) {
      setFullscreen(true)

    }


  }, [fromShareScreen])
  useEffect(() => {
    const targetElement = document.getElementById('targetElement');

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
    <div id="targetElement" className={`kjjfds-janwkea4 ${className}`}>
      <div
        style={{ width: 320, height: 520 }}
        className="kjdflmas-sdmfe kamnask-asnw kljdnas-jdnwd"
      >
        {shouldDisplay ? (
          <RecordForm fromParent={true} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
        ) : null}
      </div>
      <div className="ldkjfal0-fdsnfe1">
        <Icons iconNumber={63} />
      </div>
    </div>
  );
};

export default RecordFormParent;