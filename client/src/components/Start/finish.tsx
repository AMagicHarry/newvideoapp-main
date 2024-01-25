import { useEffect, useState, useRef } from "react";
import Icons from "../icons";
//@ts-ignore
import { Fade } from "react-awesome-reveal";

const FinishForm = ({ setScreen, jobViewContext, recorded, setRecorded, className = '' }: { setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, className?: any }) => {
  const [playing, setPlaying] = useState(false);
  const [hoverShow, setHoverShow] = useState(false);
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (recorded[recorded.length - 1]?.recording && videoRef?.current && canvasRef?.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const videoObjectUrl = URL.createObjectURL(recorded[recorded.length - 1].recording);

      video.src = videoObjectUrl;
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 1;
      });
      video.addEventListener('timeupdate', () => {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setPreviewUrl(imageDataUrl);
        video.currentTime = 0;
      });
      //alert("sdffs")
    }
   
  }, [videoRef, canvasRef]);
  useEffect(() => {
    console.log("sdfdfsdfsdfsdf");
    // setTimeout(() => {
      setScreen(3);
      //}, 3000);
  }, []);

  const _showHover = () => {
    setHoverShow(true);
  };

  const _hideHover = () => {
    setHoverShow(false);
  };

  return (
    <div className={`kjjfds-janwkea4 ${className}`}>
      <div className="kjdflmas-sdmfe"
        onMouseOver={_showHover} onMouseOut={_hideHover}>
        {playing ? (
          <video style={{ width: 320, height: 520, background: 'black', borderRadius: 20 }} autoPlay={true} loop={true}>
            <source src={URL.createObjectURL(recorded[recorded.length - 1].recording)} type={recorded[recorded.length - 1].recording.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={previewUrl || require("../../images/i6.png")} />
        )}

        <div style={{ position: 'absolute', width: '100%', height: '100%' }} className={`${hoverShow ? `d-flex` : `d-${playing ? 'none' : 'flex'}`}`}>
          <div className="d-flex justify-content-between skdjand-wkemd ksljfsa-asjd">
            <div className="circleButtons" onClick={() => {
              const _recorded = [...recorded];
              _recorded.pop();
              setRecorded(_recorded);
              setScreen(1);
            }}>
              <Icons iconNumber={19} />
              <h5>Retry</h5>
            </div>
            <div className="circleButtons" onClick={() => {
              setPlaying(!playing);
            }}>
              <Icons iconNumber={playing ? 20.1 : 20} />
              <h5>{playing ? 'Stop' : 'Watch'}</h5>
            </div>
            {/* <div className="circleButtons" onClick={() => {
              setScreen(3)
            }}>
              <Icons iconNumber={21} />
              <h5>Next</h5>
            </div> */}
          </div>
        </div>
        <div className={`klasdjf-jdsifm d-${playing ? 'none' : 'flex'}`}></div>
        <div className="ldkjfal0-fdsnfe1">
          <Icons iconNumber={63} />
        </div>
        <video ref={videoRef} style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} width="320" height="520" />
      </div>
    </div>
  );
};

export default FinishForm