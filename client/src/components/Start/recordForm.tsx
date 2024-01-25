
import { useCallback, useEffect, useRef, useState } from "react";

import Icons from "../icons";
//@ts-ignore
import { Fade } from "react-awesome-reveal";

import Webcam from "react-webcam";

const RecordForm = ({ setScreen, jobViewContext, recorded, setRecorded, className = '', fromParent = false }: { setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, className?: any, fromParent?: boolean }) => {
  const [question, setQuestion] = useState<any>(null);
  const [status, setStatus] = useState("waiting");
  const [count, setCount] = useState(3);
  const [paginate, setPaginate] = useState(1);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [capturing, setCapturing] = useState(false);
  const [hasCaptured, setHasCaptured] = useState(false);
  const [timerInterval, setTimerInterval] = useState<any>(null);

  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);

  useEffect(() => {
    if (jobViewContext?.questions?.length) {
      const _question = jobViewContext.questions.find((q: any) => !recorded.find((r: any) => r._id === q._id));
      if (_question) {
        setQuestion(_question);
      }
    }
  }, [jobViewContext]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = ({ data }: any) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef && webcamRef) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      setStatus('waiting');
      setHasCaptured(true);
      clearLoader();
    }
  };

  useEffect(() => {
    if (hasCaptured) {
      handleSaveVideo();
    }
  }, [hasCaptured, recordedChunks]);

  const handleSaveVideo = () => {

    if (recordedChunks.length > 0) {

      const blob = new Blob(recordedChunks, {
        type: "video/mp4"
      });

      const myFile = new File(
        [blob],
        "demo.mp4",
        { type: 'video/mp4' }
      );

      const _recorded = [...recorded];
      const idx = _recorded.findIndex((_r: any) => _r._id === question._id);
      if (idx > -1) {
        _recorded[idx].recording = myFile;
      } else {
        _recorded.push({ ...question, recording: myFile });
      }
      setRecorded(_recorded);
      setRecordedChunks([]);
      setHasCaptured(false);
      setScreen(2);
      setPaginate(2)
      setTimeout(() => {
        setScreen(3);
        setPaginate(3)
      }, 3000);
    }
  }

  useEffect(() => {
    if (status == "countdown") {
      if (count == 0) {
        setStatus("recording");
        handleStartCaptureClick();
      }
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [status, count]);

  const clearLoader = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    // const timerElement = document.getElementById('timer');
    // if (timerElement) {
    //   timerElement.textContent = '';
    // }
  };

  const loadingBar = () => {
    const progressBar = document.getElementById('progress-bar');
    const timerElement = document.getElementById('timer');
    const totalDuration = 30; // Set the total animation duration in seconds
    const animationFrames = 60; // Number of frames per second for smoother animation
    const frameDuration = 1000 / animationFrames;
    let seconds = totalDuration; // Set the desired countdown duration in seconds

    function updateTimer() {
      if (timerElement && progressBar) {
        timerElement.textContent = `${Math.floor(seconds)}s`; // Format seconds without decimal places
        const progress = ((totalDuration - seconds) / totalDuration) * 100;
        progressBar.style.width = `${progress}%`;

        seconds -= 1 / animationFrames;

        if (seconds < 0) {
          // clearLoader();
          // setStatus('waiting');
          handleStopCaptureClick();
        }
      }
    }

    updateTimer(); // Initial update
    setTimerInterval(setInterval(updateTimer, frameDuration));
  }

  useEffect(() => {
    if (status === 'recording') {
      loadingBar();
      // if (timeDuration <= 0) {
      //   setStatus('waiting');
      //   handleStopCaptureClick();
      // }
      // setTimeout(() => {
      //   calculateWidth();
      //   setTimeDuration(timeDuration - 1);
      // }, 1000);
    }
  }, [status]);

  const videoConstraints = {
    width: 320,
    height: 520,
    facingMode: "user",
  };

  const render = () => {
    return (
      <>
        <div>
          <Webcam mirrored={true} audio={true} style={{ borderRadius: '20px', position: 'relative' }} videoConstraints={videoConstraints} ref={webcamRef} />
        </div>
        <div
          className='btn khjn-jnkawed' onClick={() => {

            if (status == 'recording') {
              handleStopCaptureClick()
            } else if (status == "waiting") {
              setStatus("countdown")
            };
          }}>
          {
            status == "waiting" ? <Icons iconNumber={101} /> :
              status == "recoding" ? null :
                <Icons iconNumber={106 + count - 3} />
          }
        </div>
        <div style={{ position: 'absolute', bottom: '95px', left: '135px' }}>
          <svg width="64" height="12" viewBox="0 0 64 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill={paginate == 1 ? '#06FBED' : 'white'} fill-opacity={paginate == 1 ? '0.8' : '0.5'} />
            <circle cx="57.5918" cy="6" r="6" fill={paginate == 2 ? '#06FBED' : 'white'} fill-opacity={paginate == 2 ? '0.8' : '0.5'} />
            <circle cx="31.7969" cy="6" r="6" fill={paginate == 3 ? '#06FBED' : 'white'} fill-opacity={paginate == 3 ? '0.8' : '0.5'} />
          </svg>
        </div>
        <div className='kdjasldk-ajsdmkd'>
        </div>
        <div className='kjfds-jandsa'>
          <div className="loading-bar" id="loading-bar">
            <div className="lb-progress-bar" id="progress-bar"></div>
            <div className="lb-timer" id="timer"></div>
          </div>
        </div>
        <div className='kjdsia-ajdwnkd' style={{ justifyContent: 'flex-start' }}>
          <Icons iconNumber={25} />
          <h5 style={{ marginLeft: 10 }}>{question?.question || 'What are your strengths and weaknesses?'}</h5>
        </div>
      </>
    );
  };

  return fromParent ? (
    <>
      {render()}
    </>
  ) : (
    <div className={`kjjfds-janwkea4 ${className}`}>
      <div
        style={{ width: 320, height: 520 }}
        className="kjdflmas-sdmfe kamnask-asnw kljdnas-jdnwd"
      >
        {render()}
      </div>
      <div className="ldkjfal0-fdsnfe1">
        <Icons iconNumber={63} />
      </div>
    </div>
  );
};

export default RecordForm;