import { useEffect, useState, useRef } from "react";
import Icons from "../icons";
import axios from "axios";

const VideoForm = ({ selectedInterview, favourite, paginate = 1 }: { selectedInterview?: any, favourite?: any, paginate?: any }) => {
  const [job, setSetJob] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPlayPause, setShowPlayPause] = useState(false);
  const [playPromise, setPlayPromise] = useState<any>(undefined);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [counterSeconds, setCounterSeconds] = useState<any>(30);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (counterSeconds <= 0) {
      clearLoader();
    }
  }, [counterSeconds]);

  useEffect(() => {
    if (showPlayPause) {
      setTimeout(() => {
        setShowPlayPause(false);
      }, 500);
    }
  }, [showPlayPause]);

  useEffect(() => {
    if (selectedInterview?.id) {
      // setPlaying(true);
      clearLoader();
      getJobDetails(selectedInterview.id);

      if (selectedInterview?.videoLink && selectedInterview?.id) {
        setTimeout(() => {
          setPlaying(true);
          loadingBar();
        }, 500);
      }
    }
  }, [selectedInterview]);

  useEffect(() => {
    if (videoRef?.current) {
      clearLoader();
      if (playing) {
        setPlayPromise(videoRef.current.play());
        loadingBar(counterSeconds);
      } else {
        if (playPromise != undefined) {
          playPromise.then((_: any) => {
            videoRef.current.pause();
          }).catch(() => { }).finally(() => {
            setPlayPromise(undefined);
          });
        } else {
          videoRef.current.pause();
          setPlayPromise(undefined);
        }
      }
    }
  }, [playing]);

  const getJobDetails = (_id: any) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/interviews/${_id}`)
      .then(async response => {
        setSetJob(response.data)
      })
      .catch(console.error)
  }

  const clearLoader = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const loadingBar = (s = 30) => {
    const progressBar = document.getElementById('progress-bar');
    const timerElement = document.getElementById('timer');
    const totalDuration = 30; // Set the total animation duration in seconds
    const animationFrames = 60; // Number of frames per second for smoother animation
    const frameDuration = 1000 / animationFrames;
    let seconds = s; // Set the desired countdown duration in seconds

    function updateTimer() {
      if (timerElement && progressBar) {
        timerElement.textContent = `${Math.floor(seconds)}s`; // Format seconds without decimal places
        const progress = ((totalDuration - seconds) / totalDuration) * 100;
        progressBar.style.width = `${progress}%`;

        seconds -= 1 / animationFrames;
        setCounterSeconds(seconds);

        // if (seconds <= 0) {
        //   clearLoader();
        // }
      }
    }

    updateTimer(); // Initial update
    setTimerInterval(setInterval(updateTimer, frameDuration));
  }

  return (
    <div style={{ position: 'relative', marginLeft: 60 }}>
      <div className="kjjfds-janwkea4" style={{ overflow: 'hidden', borderRadius: 23, height: 585 }}>
        {/* <img src={require("../../images/i6.png")} /> */}
        <div className={`jljdskaflsd d-flex`} style={{ background: 'linear-gradient(182.61deg, rgba(0, 0, 0, 0.2) -0.73%, rgba(0, 0, 0, 0) 93.15%)' }}>
          <div className='kldfjads' style={{ padding: '10px 13px' }}>
            <div>
              <img src={require('../../images/i5.png')} />
            </div>
            <div>
              <h5 style={{ top: 7 }}>{selectedInterview?.interviewee?.name || 'Sarah Pillman-Murphy'}</h5>
              <h6>
                <Icons iconNumber={17} />
                28, {selectedInterview?.interviewee?.location || '-'}
              </h6>
            </div>
          </div>
          <div className='odjfks-amds' style={{ right: '3.5px', top: 4 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
  <path d="M44.6734 16.7575L42.1474 10.7527C42.096 10.6333 42.0006 10.5289 41.8684 10.4767C41.6041 10.3648 41.303 10.4841 41.1929 10.7527L38.6669 16.7649L32.5087 17.3258L32.2787 17.3468C32.2431 17.3488 32.2075 17.354 32.1726 17.3628C32.0775 17.3866 31.9867 17.4365 31.9115 17.5183C31.728 17.7347 31.75 18.0703 31.9629 18.2568L36.8092 22.5534L35.3773 28.9237C35.348 29.0506 35.3627 29.1923 35.4361 29.3116C35.583 29.5578 35.8987 29.6398 36.141 29.4907L41.6628 26.1339L47.1699 29.4757C47.28 29.5503 47.4269 29.5802 47.5664 29.5503C47.8454 29.4832 48.0217 29.2072 47.9556 28.9237L46.5237 22.5534L48.9255 20.4241L50.5034 19.0251L51.37 18.2568C51.4728 18.1673 51.5315 18.048 51.5462 17.9062C51.5683 17.6153 51.3627 17.3617 51.0763 17.3393L44.6734 16.7575Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M61 25.3012V60L15.703 15.4458C16.3698 15.5154 17.1806 15.5947 18.1116 15.6858C21.6175 16.0289 26.8314 16.539 32.5087 17.3258L32.2787 17.3468C32.2431 17.3488 32.2075 17.354 32.1726 17.3628C32.0775 17.3866 31.9867 17.4365 31.9115 17.5183C31.728 17.7347 31.75 18.0703 31.9629 18.2568L36.8092 22.5534L35.3773 28.9237C35.348 29.0506 35.3627 29.1923 35.4361 29.3116C35.583 29.5578 35.8987 29.6398 36.141 29.4907L41.6628 26.1339L47.1699 29.4757C47.28 29.5503 47.4269 29.5802 47.5664 29.5503C47.8454 29.4832 48.0217 29.2072 47.9556 28.9237L46.5237 22.5534L48.9255 20.4241C53.8574 21.7081 58.1931 23.3064 61 25.3012Z" fill="#FFB800"/>
  <path d="M0 0L15.703 15.4458C16.3698 15.5154 17.1806 15.5947 18.1116 15.6858C21.6175 16.0289 26.8314 16.539 32.5087 17.3258L38.6669 16.7649L41.1929 10.7527C41.303 10.4841 41.6041 10.3648 41.8684 10.4767C42.0006 10.5289 42.096 10.6333 42.1474 10.7527L44.6734 16.7575L51.0763 17.3393C51.3627 17.3617 51.5683 17.6153 51.5462 17.9062C51.5315 18.048 51.4728 18.1673 51.37 18.2568L50.5034 19.0251L48.9255 20.4241C53.8574 21.7081 58.1931 23.3064 61 25.3012V22C61 9.84974 51.1503 0 39 0H0Z" fill="#FFC700"/>
</svg>
          </div>
        </div>
        <div className="kjdflmas-sdmfe kamnask-asnw kljdnas-jdnwd" onClick={() => {
          setPlaying(!playing);
          setShowPlayPause(!showPlayPause);
        }} style={{ cursor: 'pointer', borderRadius: 23 }}>
          {selectedInterview?.videoLink && selectedInterview?.id ? (
            <video key={selectedInterview.id} ref={videoRef} style={{ position: 'relative', borderRadius: 23, width: '98%', height: '98.5%', top: '0.75%', background: 'black' }} loop={true} muted={muted}>
              <source src={selectedInterview.videoLink} type="video/mp4" />
              Couldn't load video.
            </video>
          ) : (
            <img src={require("../../images/i6.png")} style={{ position: 'relative', borderRadius: 23, width: '98%', height: '98.5%', top: '0.75%' }} />
          )}

          <div style={{ position: 'absolute', width: '100%', height: '100%' }} className={`d-flex`}>
            <div className={`d-flex justify-content-center skdjand-wkemd ksljfsa-asjd`} style={showPlayPause ? { opacity: '1' } : { transition: 'opacity 500ms', opacity: '0' }}>
              <Icons iconNumber={playing ? 113 : 112} />
            </div>
          </div>
          {/* <div className={`klasdjf-jdsifm d-flex`} style={{ width: '99%', left: 1 }}></div> */}

          <div className='kdjasldk-ajsdmkd'>
            {/* <img src={require('../../images/i8.png')} /> */}
          </div>
          {/* <div className={`kjfds-jandsa d-flex`} >
        </div>
        <div className={`kjjsad-awek d-flex`} style={{
          width: "93%",
          borderRadius: 12
        }}>
        </div> */}
          <div className="ic-muted" onClick={(e) => {
            e.stopPropagation();
            setMuted(!muted);
          }}>
            {muted ? (
              <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path d="M9.77576 1.125L5.2861 5.03675H1.06055V9.99164H5.2861L9.77576 13.9034V1.125Z" fill="white" stroke="white" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.4277 5.70703L15.9992 9.27846M15.9992 5.70703L12.4277 9.27846" stroke="white" stroke-width="1.42857" stroke-linecap="round" />
                </g>
              </svg>
            ) : (
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path d="M9.71521 0.707031L5.22556 4.61878H1V9.57367H5.22556L9.71521 13.4854V0.707031Z" fill="white" stroke="white" stroke-width="1.34558" stroke-linejoin="round" />
                  <path d="M12.0273 9.2779C12.9149 9.2779 13.6345 8.31851 13.6345 7.13504C13.6345 5.95158 12.9149 4.99219 12.0273 4.99219V9.2779Z" fill="white" />
                  <path d="M12.3398 12.1367C14.4109 12.1367 16.0898 9.89813 16.0898 7.13671C16.0898 4.37529 14.4109 2.13672 12.3398 2.13672" stroke="white" stroke-width="1.42857" stroke-linecap="round" />
                </g>
              </svg>

            )}
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
              <div style={{ position: 'absolute', right: '12px', top: '15px' }}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49998 0.980469C12.6423 0.980469 16 4.33825 16 8.48047C16 12.6227 12.6423 15.9805 8.49998 15.9805C4.35791 15.9805 1 12.6227 1 8.48047C1 4.33825 4.35791 0.980469 8.49998 0.980469Z" fill="black" fill-opacity="0.01" stroke="#ADB8FA" stroke-width="1.25" />
                  <line x1="8.375" y1="8.35547" x2="8.375" y2="4.60547" stroke="#ADB8FA" stroke-width="1.25" stroke-linecap="round" />
                  <line x1="8.72064" y1="8.58968" x2="11.7303" y2="10.1387" stroke="#ADB8FA" stroke-width="1.25" stroke-linecap="round" />
                </svg>
              </div>
              <div className="lb-timer" id="timer"></div>
            </div>
          </div>
          <div className='kjdsia-ajdwnkd' style={{ justifyContent: 'flex-start' }}>
            <Icons iconNumber={15} />
            <h5 style={{ marginLeft: 10 }}>{job?.questions?.length ? job?.questions[0]?.question_id?.question : 'What are your strengths and weaknesses?'}</h5>
          </div>

          {/* <div className={`kjdsia-ajdwnkd d-flex`}>
          <Icons iconNumber={25} />
          <h5>{job?.questions?.length ? job?.questions[0]?.question_id?.question : 'What are your strengths and weaknesses?'}</h5>
          <div className='kjda-ejmnwae'>
            <Icons iconNumber={26} />
            <h6>{job?.questions?.length ? job?.questions[0]?.question_id?.time_duration : '30s'}</h6>
          </div>
        </div> */}
          <div className={`jljdskaflsd`} style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2) -0.73%, rgba(0, 0, 0, 0) 93.15%)' }}></div>
        </div>
      </div>
      <div className="ldkjfal0-fdsnfe1 d-block" style={{ bottom: '-23px' }}>
        <Icons iconNumber={63} />
      </div>
    </div>
  );
};
export default VideoForm