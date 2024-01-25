import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import Icons from "../icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { AnswerFilter } from "../../screens/answers";
import { useAuth } from "../../hooks/useAuth";

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
  favourite?: any;
  id?: any;
  createdAt?: string;
}

const MainForm = ({ setMainScreen, showScreen, setshowScreen, selectedFilter, setSelectedInterview, allInterviews, setAllInterviews, jobViewContext, watchAns }: { setMainScreen: any, showScreen: number, setshowScreen: any, selectedFilter: AnswerFilter, setSelectedInterview: any, allInterviews: any, setAllInterviews: any, jobViewContext: any, watchAns: any }) => {
  const [filteredInterviews, setFilteredInterviews] = useState<Array<Interview>>([])
  const [myAnswers, setMyAnswers] = useState<any>(false)
  const { user } = useAuth()

  const handleFilteration = (array: any) => {
    const questionsArray: Array<Interview> = array?.map((obj: any) => ({
      videoLink: obj.questions[0].video_url,
      interviewee: obj.interviewee,
      favourite: obj.favourite,
      interviewer: obj.interviewer,
      id: obj._id,
      createdAt: obj.createdAt
    }));
    setAllInterviews(questionsArray)
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/interviews',
    ).then(response => {
      // if (watchAns) {
      //   const filtered = response?.data?.filter((obj: any) => obj.job_id == jobViewContext?._id)
      //   handleFilteration(filtered)

      // }
      // else 
      if (myAnswers) {
        const filtered = response?.data?.filter((obj: any) => obj.interviewer._id == user?.id)
        handleFilteration(filtered)
      } else {
        handleFilteration(response.data)
      }
    }).catch(console.error)
  }, [myAnswers]);

  useEffect(() => {
    if (selectedFilter && allInterviews?.length) {
      const now = new Date();
      let filteredInterviews: Array<Interview> = [];

      switch (selectedFilter) {
        case AnswerFilter.LastHour:
          filteredInterviews = allInterviews.filter((interview: Interview) => {
            if (interview?.createdAt) {
              const interviewDate = new Date(interview.createdAt);
              const timeDifference = now.getTime() - interviewDate.getTime();
              const hoursDifference = timeDifference / (1000 * 3600);
              return hoursDifference <= 1;
            }
          }).filter((i: any) => i);
          break;
        case AnswerFilter.Today:
          filteredInterviews = allInterviews.filter((interview: any) => {
            if (interview?.createdAt) {
              const interviewDate = new Date(interview.createdAt);
              return (
                interviewDate.getDate() === now.getDate() &&
                interviewDate.getMonth() === now.getMonth() &&
                interviewDate.getFullYear() === now.getFullYear()
              );
            }
          }).filter((i: any) => i);
          break;
        case AnswerFilter.ThisWeek:
          filteredInterviews = allInterviews.filter((interview: any) => {
            if (interview?.createdAt) {
              const interviewDate = new Date(interview.createdAt);
              const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(endOfWeek.getDate() + 6);

              return interviewDate >= startOfWeek && interviewDate <= endOfWeek;
            }
          }).filter((i: any) => i);
          break;
        case AnswerFilter.ThisMonth:
          filteredInterviews = allInterviews.filter((interview: any) => {
            if (interview?.createdAt) {
              const interviewDate = new Date(interview.createdAt);
              return (
                interviewDate.getMonth() === now.getMonth() &&
                interviewDate.getFullYear() === now.getFullYear()
              );
            }
          }).filter((i: any) => i);
          break;
        case AnswerFilter.ThisYear:
          filteredInterviews = allInterviews.filter((interview: any) => {
            if (interview?.createdAt) {
              const interviewDate = new Date(interview.createdAt);
              return interviewDate.getFullYear() === now.getFullYear();
            }
          }).filter((i: any) => i);
          break;
        default:
          filteredInterviews = [...allInterviews];
          break;
      }
      
      setFilteredInterviews(filteredInterviews);
    }
  }, [selectedFilter, allInterviews]);

  return (
    <div className="leftSideMain">
      
      <div className="option-btn">
        <button className={`lamdl-anwid radiusLeft ${myAnswers ? 'active' : ''}`} onClick={() => {
          setFilteredInterviews([])
          setMyAnswers(true)
        }}>
          <Icons iconNumber={50} />
          Your Answers
        </button>
        <button className={`lamdl-anwid radiusRight ${myAnswers ? '' : 'active'}`} onClick={() => setMyAnswers(false)}>
          <Icons iconNumber={32} />
          Nearby
        </button>
      </div>

      <div className="kdhfkjjdsfo">
        <Icons iconNumber={32} />
        <h5 className="mksaldkamaw-jdwa">London, UK</h5>
      </div>
      
      <div className="leftSideContentAnswers">
        <div className="h-auto">
         <Row className="row-cols-3 row-cols-sm-4 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-start mxrow-answers" style={{gap:10, padding: '4px 14px'}} > 
        
          {filteredInterviews?.length ? filteredInterviews.map((interview, index) => (
            <Col className="p-0 mb-0 d-inline-flex justify-content-center align-items-center" style={{ cursor: 'pointer', maxWidth: '120px', maxHeight: '226px' }} key={index}>
              <Card setMainScreen={setMainScreen} showScreen={showScreen} setshowScreen={setshowScreen} interview={interview} handleFilteration={handleFilteration} setSelectedInterview={setSelectedInterview} />
            </Col>
          )) : (
            <Col className="p-0 w-100 text-center text-white small">
              No Interviews. Try to change Filter.
            </Col>
          )}
          
        </Row>
        </div>
      </div>
      
    </div>
  );
}

export default MainForm;