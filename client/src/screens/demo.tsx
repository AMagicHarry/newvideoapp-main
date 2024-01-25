import { useEffect, useState } from "react"
import RightLayout from "../components/rightLayout2"
import axios from "axios"
import LinearBackground from "../components/LinearBackground"
import Carousel from "../components/Demo/Carousel"
import BottomMenu from "../components/Demo/bottomMenu"
import BackButton from "../components/Demo/backButton"
import VideoForm from "../components/Demo/Video"

interface Interview {
  videoLink: string;
  interviewee?: {
    _id?: string;
    name?: string;
    email?: string;
    birth_date?: string;
    location?: string;
    company_name?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  favourite?: any,
  id?: any
}

const DemoScreen = ({ setMainScreen, mainScreen = '' }: { setMainScreen: any, mainScreen?: any }) => {
  const [mainAllInterviews, setMainAllInterviews] = useState<Array<any>>([]);
  const [selectedInterview, setSelectedInterview] = useState<any>()
  const [paginate, setPaginate] = useState<any>(1)

  const handleFilteration = (array: any) => {
    const questionsArray: Array<Interview> = array?.map((obj: any) => ({
      videoLink: obj.questions[0].video_url,
      interviewee: obj.interviewee,
      interviewer: obj.interviewer,
      id: obj._id
    }));

    setSelectedInterview(questionsArray[0])
    setMainAllInterviews(questionsArray)
  }

  useEffect(() => {
    // axios.get(process.env.REACT_APP_BACKEND_URL + '/interviews/random',
    // ).then((res) => {
    //   handleFilteration(res.data)
    // })
  }, [])

  const prevInterview = () => {
    if (mainAllInterviews?.length && selectedInterview?.id) {
      const currentIndex = mainAllInterviews.findIndex(i => i.id === selectedInterview.id);
      const prevIndex = currentIndex - 1;
      if (prevIndex == -1) {
        setSelectedInterview(mainAllInterviews[mainAllInterviews.length - 1]);
      } else {
        setSelectedInterview(mainAllInterviews[prevIndex]);
      }
    }
    if(paginate == 1) {
      setPaginate(2);
    } else if(paginate == 2) {
      setPaginate(3);
    } else if(paginate == 3) {
      setPaginate(1);
    } else {
      setPaginate(1);
    }
  };

  const nextInterview = () => {
    if (mainAllInterviews?.length && selectedInterview?.id) {
      const currentIndex = mainAllInterviews.findIndex(i => i.id === selectedInterview.id);
      const nextIndex = currentIndex + 1;
      if (nextIndex > (mainAllInterviews.length - 1)) {
        setSelectedInterview(mainAllInterviews[0]);
      } else {
        setSelectedInterview(mainAllInterviews[nextIndex]);
      }
      if(paginate == 1) {
        setPaginate(3);
      } else if(paginate == 2) {
        setPaginate(1);
      } else if(paginate == 3) {
        setPaginate(2);
      } else {
        setPaginate(1);
      }
    }
  };

  return (
    <LinearBackground style={{ width: '100%' }}>
      <div className="pageContainer" style={{ padding: 0, gap: 0 }}>

        <div className="leftSideDiv rightSideBg pos-rel over-hdn auth-page bg-transparent" style={{ borderRadius: 0 }}>
          <div className="leftSideHeader kjsf-ajmwe w-100">
            <BackButton setMainScreen={setMainScreen} />
          </div>

          <div className="lkljdfsl-sifkmd carousal-btn" style={{ width: 'auto', left: 25 }} onClick={prevInterview}>
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_b_5913_7947)">
                <rect x="52.6562" y="52.6562" width="52.6565" height="52.6565" rx="26.3283" transform="rotate(-180 52.6562 52.6562)" fill="#787FBB" fill-opacity="0.2" />
                <path d="M30.4736 32.8435L23.3886 25.5001L30.4736 19.0454C31.3167 18.227 31.3167 16.9012 30.4736 16.0828C29.6306 15.2644 28.2648 15.2644 27.4218 16.0828L18.7889 23.4474C16.5869 25.5001 16.5898 25.5645 18.7889 27.4258L27.4218 35.8061C28.2648 36.6245 29.6306 36.6245 30.4736 35.8061C31.3167 34.9877 31.3167 33.6619 30.4736 32.8435Z" fill="white" />
              </g>
              <g filter="url(#filter1_b_5913_7947)">
                <rect x="52.6562" y="52.6562" width="52.6565" height="52.6565" rx="26.3283" transform="rotate(-180 52.6562 52.6562)" fill="#787FBB" fill-opacity="0.2" />
                <path d="M30.16 32.1073L23.9276 25.9551L30.16 20.5475C30.9016 19.8619 30.9016 18.7512 30.16 18.0656C29.4184 17.3799 28.217 17.3799 27.4754 18.0656L19.8813 24.2354C17.9443 25.9551 17.9469 26.0091 19.8813 27.5684L27.4754 34.5893C28.217 35.2749 29.4184 35.2749 30.16 34.5893C30.9016 33.9037 30.9016 32.7929 30.16 32.1073Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_b_5913_7947" x="-35.1044" y="-35.1044" width="122.865" height="122.865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="17.5522" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5913_7947" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5913_7947" result="shape" />
                </filter>
                <filter id="filter1_b_5913_7947" x="-35.1044" y="-35.1044" width="122.865" height="122.865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="17.5522" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5913_7947" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5913_7947" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
          <Carousel selectedInterview={selectedInterview} setMainScreen={setMainScreen} paginate={paginate} />
          <div className="lkljdfsl-sifkmd carousal-btn" style={{ width: 'auto', right: 25 }} onClick={nextInterview}>
            <svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_b_5913_7942)">
                <rect x="0.943359" width="52.6565" height="52.6565" rx="26.3283" fill="#787FBB" fill-opacity="0.2" />
                <path d="M23.126 19.8147L30.211 27.1581L23.126 33.6128C22.2829 34.4312 22.2829 35.757 23.126 36.5754C23.969 37.3938 25.3348 37.3938 26.1778 36.5754L34.8107 29.2108C37.0128 27.1581 37.0098 27.0937 34.8107 25.2324L26.1778 16.8521C25.3348 16.0337 23.969 16.0337 23.126 16.8521C22.2829 17.6705 22.2829 18.9963 23.126 19.8147Z" fill="white" />
              </g>
              <g filter="url(#filter1_b_5913_7942)">
                <rect x="0.943359" width="52.6565" height="52.6565" rx="26.3283" fill="#787FBB" fill-opacity="0.2" />
                <path d="M23.4396 20.5489L29.672 26.7011L23.4396 32.1087C22.698 32.7943 22.698 33.9051 23.4396 34.5907C24.1812 35.2763 25.3826 35.2763 26.1242 34.5907L33.7183 28.4208C35.6553 26.7011 35.6527 26.6472 33.7183 25.0878L26.1242 18.067C25.3826 17.3813 24.1812 17.3813 23.4396 18.067C22.698 18.7526 22.698 19.8633 23.4396 20.5489Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_b_5913_7942" x="-34.161" y="-35.1044" width="122.865" height="122.865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="17.5522" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5913_7942" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5913_7942" result="shape" />
                </filter>
                <filter id="filter1_b_5913_7942" x="-34.161" y="-35.1044" width="122.865" height="122.865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="17.5522" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5913_7942" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5913_7942" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="dkfnmsd-awde">
            <div className="wh-100 l1" style={{ right: '25%' }}>
              <VideoForm />
            </div>
            <div className="wh-100 l2" style={{ left: '25%' }}>
              <VideoForm />
            </div>
          </div>
          <div className="ldkf-kasmdaw"></div>

          <div className="d-flex justify-content-center kdnklms-awendwd-11">
            <BottomMenu setMainScreen={setMainScreen} />
          </div>
        </div>

        <RightLayout mainScreen={mainScreen} setMainScreen={setMainScreen} setShowScreen={''} style={{ borderRadius: 33, top: 0, height: 'calc(100% - 50px)', marginRight: 25 }} />

      </div>
    </LinearBackground>
  )
}

export default DemoScreen