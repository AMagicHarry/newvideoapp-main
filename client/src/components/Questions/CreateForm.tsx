import { useState, useEffect } from "react";
import Icons from "../icons";
import CheckForm from "./CheckForm";
import Question from "./Questions";
//@ts-ignore
import { Zoom } from "react-awesome-reveal";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import authConfig from "../../configs/auth";
import TinyModal from "../Modals/tiny_modal";
import { useShared } from "../../hooks/useShare";

const CreateForm = ({
  setShowScreen,
  showScreen,
  setJobView,
  jobView,
}: {
  setShowScreen: any;
  showScreen: number;
  setJobView: any;
  jobView: any;
}) => {
  const { addQuestion, user } = useAuth();
  const { flag }: { flag: any } = useShared();
  const [valuec, setValuechange] = useState("");
  const [selected, setselected] = useState(0);
  const [questionIds, setQuestionsIds] = useState<any>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    time_duration: 30,
    user_id: user?.id,
  });
  const [questions, setQuestions] = useState<any>();
  const [job, setjob] = useState({
    questions: questionIds,
    job_title: "",
    interviewer: user?.id,
    job_recruiter: "",
  });
  const [newJob, setNewJob] = useState<any>(null);
  const [toBeDeleteQuestion, setToBeDeleteQuestion] = useState<any>(null);

  const getJobDetails = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/interviewer/${jobView._id}`)
      .then((response: any) => {
        setjob(response.data);
        setjob({
          job_title: response.data.job_title,
          job_recruiter: response.data.job_recruiter,
          interviewer: user?.id,
          questions: questions,
        });
        console.log(response.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getQuestions();
    if (flag == true) getJobDetails();
  }, []);

  useEffect(() => {
    if (newJob) {
      setShowScreen(5);
    }
  }, [newJob]);

  const getQuestions = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}${authConfig.addQuestion}${
          user?.id ? `?user_Id=${user?.id}` : ""
        }`
      )
      .then(async (response) => {
        setQuestions(response.data.reverse());
      })
      .catch(console.error);
  };

  const handleDeleteClose = () => {
    const questionData: any = [...questionIds];
    const index = questionData.indexOf(toBeDeleteQuestion._id);
    questionData.splice(index, 1);
    setQuestionsIds(questionData);
    setselected(selected - 1);

    setToBeDeleteQuestion(null);
    getQuestions();
    setShowScreen(3);
  };

  // const addJob = (params: any) => {
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}${authConfig.addJobEndPoint}`, params)
  //     .then(async response => {
  //       setJobView(response.data);
  //       setNewJob(response.data);
  //     })
  //     .catch(err => {
  //     })
  // }

  useEffect(() => {
    // if (showScreen == 3) {
    //   $(".kdnklms-awendwd").css("z-index", -1);
    // } else {
    //   $(".kdnklms-awendwd").css("z-index", 1000);
    // }

    try {
      // Check if the input field is in focus and set the arrowBtn fill - opacity to 1 if it is
      document
        .getElementById("questionInput")!
        .addEventListener("focus", () => {
          document.getElementById("arrowBtn")!.style.opacity = "1";
          document.getElementById("arrowBtn")!.style.backgroundColor =
            "#ADB8FA";

          document.getElementById("questionInput")!.style.backgroundColor =
            "#fff";
          document.getElementById("questionInput")!.style.opacity = "1.0";
        });

      document
        .getElementById("questionInput")!
        .addEventListener("focusout", () => {
          document.getElementById("arrowBtn")!.style.opacity = "0.5";
          document.getElementById("arrowBtn")!.style.backgroundColor =
            "#ADB8FA";

          document.getElementById("questionInput")!.style.backgroundColor =
            "#EFF1FFD9";
          document.getElementById("questionInput")!.style.opacity = "0.85";
        });
    } catch (error) {}
  }, [showScreen]);
  const MAX_TEXTAREA_LENGTH = 50;
  const MAX_INPUT_LENGTH_1 = 35;
  const MAX_INPUT_LENGTH_2 = 15;
  const handleQuestionChange = (e: any) => {
    const { name, value } = e.target;
    const limitedValue = value.slice(0, MAX_TEXTAREA_LENGTH);

    setNewQuestion({
      ...newQuestion,
      [name]: limitedValue,
    });
  };

  const handleJobData = (e: any) => {
    const { name, value } = e.target;
    let limitedValue = 100;
    if (showScreen == 1) {
      limitedValue = value.slice(0, MAX_INPUT_LENGTH_1);
    } else if (showScreen == 2) {
      limitedValue = value.slice(0, MAX_INPUT_LENGTH_2);
    }
    setjob({
      ...job,
      [name]: limitedValue,
    });
  };

  return (
    // <Fade direction="left" big>
    <div
      className="kjkndask-ankdnwd"
      style={{ position: "fixed", borderRadius: 0, left: 0, top: 0 }}
    >
      <div
        className={`leftSideHeader kjsfdkl-adsj ${
          showScreen >= 3 ? "w-50" : ""
        }`}
        style={{ padding: 15 }}
      >
        <div
          onClick={() => {
            if (showScreen == 1) {
              setShowScreen(0);
            } else if (showScreen == 2) {
              setShowScreen(1);
            } else if (showScreen == 3) {
              setShowScreen(2);
            } else if (showScreen == 4) {
              setShowScreen(3);
            } else if (showScreen == 5) {
              setShowScreen(3);
            } else if (showScreen == 6) {
              setShowScreen(5);
            } else if (showScreen == 7) {
              setShowScreen(6);
            }
          }}
          className="backButtonDiv"
        >
          <button className="hkjndankad-dnsd">
            <Icons iconNumber={29} />
          </button>
          <h5 className="mksaldkamaw-jdwa">Back</h5>
        </div>
        {showScreen == 3 ? (
          <button
            onClick={() => {
              setShowScreen(4);
            }}
            className="kjlma0o-dwa jkksjdf-awe"
          >
            <Icons iconNumber={41} />
            Add Question{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`kjdfkksd-aweinmd hkasjfdlmf-dsfsd align-items-start ${
          showScreen == 3
            ? "kdjsf-awejdn"
            : showScreen == 5
            ? "kdjsf-awejdn"
            : ""
        }`}
      >
        <div className="absolute top-0 left-0 w-50">
          <div className="kjdsfms-awddw2 d-flex align-items-center justify-content-center">
            <Icons iconNumber={36} />
            <Icons iconNumber={showScreen >= 2 ? 36 : 37} />
            <Icons iconNumber={showScreen >= 3 ? 36 : 37} />
            <Icons
              iconNumber={showScreen == 5 ? 36 : showScreen == 3 || 4 ? 37 : 36}
            />
          </div>
          <div className="kjdfsajs0edjawe-232">
            <h4>
              {showScreen == 1
                ? "What's the Position?"
                : showScreen == 2
                ? "Who's Asking?"
                : showScreen == 3
                ? "Which Questions?"
                : showScreen == 4
                ? "What’s the Question?"
                : showScreen == 5
                ? "All Good?"
                : "What’s it About?"}
            </h4>
            <h5>
              {showScreen == 1
                ? "ENTER JOB TITLE"
                : showScreen == 2
                ? "ENTER RECRUITER NAME"
                : showScreen == 3
                ? "SELECT 3 QUESTIONS YOU’D LIKE TO ASK"
                : showScreen == 4
                ? "ENTER QUESTION"
                : showScreen == 5
                ? "CHECK BEFORE PUBLISHING"
                : "ENTER ASKER SUBJECT"}
            </h5>
          </div>
          {showScreen == 3 ? (
            <div className="d-flex justify-content-center flex-column">
              <div className="kjdaflj-adjkwmd align-self-center">
                {questions?.map((data: any, index: number) => (
                  <Question
                    key={index}
                    setselected={setselected}
                    selected={selected}
                    questions={data}
                    questionIds={questionIds}
                    setQuestionIds={setQuestionsIds}
                    mainStyle={
                      data?.user_id?._id === user?.id
                        ? {
                            background:
                              "linear-gradient(180deg, rgba(84, 104, 255, 0.59) 0%, rgba(84, 104, 255, 0.34) 100%)",
                            position: "relative",
                            height: 74,
                            //paddingRight: 46
                          }
                        : {
                            position: "relative",
                            height: 74,
                            //paddingRight: 46
                          }
                    }
                    timerStyle={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: "100%",
                      paddingRight: 12,
                      paddingLeft: 12,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: questionIds.find(
                        (qId: any) => qId === data._id
                      )
                        ? ""
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                    showDelete={
                      questionIds.find((qId: any) => qId === data._id) &&
                      data?.user_id?._id === user?.id
                    }
                    onDeleteClick={(e: any) => {
                      e.stopPropagation();
                      setToBeDeleteQuestion(data);
                    }}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {selected >= 3 ? (
                  <button
                    onClick={() => {
                      const jobFinalData = { ...job };
                      jobFinalData.questions = questionIds;
                      // setJobView(jobFinalData);
                      setNewJob(jobFinalData);
                      // addJob(jobFinalData)
                    }}
                    className="kjdflj0-jsads pos-rel"
                    style={{
                      boxShadow: "0px 10px 25px 0px rgba(84, 104, 255, 0.3)",
                    }}
                  >
                    CONTINUE
                    <Icons iconNumber={85} />
                  </button>
                ) : (
                  <button className="hkjdsf-dsjfin fw-light">
                    <span className="fs-6">{selected}</span> OF{" "}
                    <span className="fs-6">3</span> QUESTIONS SELECTED
                  </button>
                )}
              </div>
            </div>
          ) : showScreen == 5 ? (
            <>
              <CheckForm
                showScreen={showScreen}
                setShowScreen={setShowScreen}
                questionIds={questionIds}
                questions={questions}
                newJob={newJob}
                setJobView={setJobView}
                jobView={jobView}
              />
            </>
          ) : (
            <div className="sfjkdfjsd-dsnaf">
              <div
                className={`djsfisdmo-sfmef mt-0 ${
                  (showScreen == 1 && job?.job_title?.length >= 6) ||
                  (showScreen == 2 && job?.job_recruiter?.length >= 6) ||
                  (showScreen == 4 && newQuestion?.question?.length >= 6)
                    ? "ijfako-asdm"
                    : ""
                }`}
              >
                {showScreen == 1 ? (
                  <>
                    <input
                      id="questionInput"
                      placeholder="e.g Bar Staff Position Available"
                      name="job_title"
                      className="ojdfkak-ksmd"
                      type="text"
                      onChange={(e) => {
                        handleJobData(e);
                      }}
                      autoComplete="off"
                      value={job?.job_title}
                      autoFocus
                    />
                    <button
                      id="arrowBtn"
                      className={`no-sh arrowBtn ${
                        job?.job_title?.length >= 6 ? "ijfako-asdm-btn" : ""
                      }`}
                      onClick={() => {
                        if (job?.job_title?.length >= 6) {
                          setShowScreen(2);
                        }
                      }}
                    >
                      <Icons iconNumber={38} />
                    </button>
                  </>
                ) : showScreen == 2 ? (
                  <>
                    <input
                      id="questionInput"
                      placeholder="e.g Recruitment Agency"
                      name="job_recruiter"
                      className="ojdfkak-ksmd"
                      type="text"
                      onChange={(e) => {
                        handleJobData(e);
                      }}
                      autoComplete="off"
                      value={job?.job_recruiter || ""}
                      autoFocus
                    />
                    <button
                      id="arrowBtn"
                      className={`no-sh arrowBtn ${
                        job?.job_recruiter?.length >= 6 ? "ijfako-asdm-btn" : ""
                      }`}
                      onClick={() => {
                        if (job?.job_recruiter?.length >= 6) {
                          setShowScreen(3);
                        }
                      }}
                    >
                      <Icons iconNumber={38} />
                    </button>
                  </>
                ) : showScreen == 4 ? (
                  <>
                    <textarea
                      id="questionInput"
                      placeholder="e.g What’s your 5 year plan?"
                      name="question"
                      className="ojdfkak-ksmd"
                      onChange={(e) => {
                        handleQuestionChange(e);
                      }}
                      autoComplete="off"
                      value={newQuestion?.question || ""}
                      autoFocus
                    />
                    <button
                      id="arrowBtn"
                      className={`no-sh arrowBtn ${
                        newQuestion?.question?.length >= 6
                          ? "ijfako-asdm-btn"
                          : ""
                      }`}
                      onClick={() => {
                        if (newQuestion?.question?.length >= 6) {
                          addQuestion(newQuestion).then((res) => {
                            getQuestions();
                            setShowScreen(3);
                          });
                        }
                      }}
                    >
                      <Icons iconNumber={38} />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      id="questionInput"
                      placeholder="e.g What’s your 5 year plan?"
                      name="question"
                      className="ojdfkak-ksmd"
                      type="text"
                      onChange={(e) => {
                        handleQuestionChange(e);
                      }}
                      autoComplete="off"
                      value={newQuestion?.question || ""}
                      autoFocus
                    />
                    <button
                      id="arrowBtn"
                      className={`no-sh arrowBtn ${
                        newQuestion?.question?.length >= 3 ? "ijfako-asdm" : ""
                      }`}
                      onClick={() => {
                        if (newQuestion?.question?.length >= 3) {
                          addQuestion(newQuestion).then((res) => {
                            getQuestions();
                            setShowScreen(3);
                          });
                        }
                      }}
                    >
                      <Icons iconNumber={38} />
                    </button>
                  </>
                )}
                {/* <input
                placeholder={showScreen == 1
                  ? "e.g Bar Staff Position Available "
                  : showScreen == 2
                    ? "e.g Recruitment Agency"
                    : "e.g What’s your 5 year plan?"
                }
                onChange={(e) => {
                  setValuechange(e.target.value)
                }}
                className="ojdfkak-ksmd"
                value={valuec}
                type="text"
                id="questionInput"
              /> */}
                {/* <button id="arrowBtn" className={`no-sh arrowBtn ${valuec.length > 5 ? "ijfako-asdm" : ""}`} onClick={() => {
                if (showScreen == 1) setShowScreen(2);
                if (showScreen == 2) setShowScreen(3);
                if (showScreen == 4) setShowScreen(3);
              }}>
                <Icons iconNumber={38} />
              </button> */}
              </div>
            </div>
          )}
        </div>

        {toBeDeleteQuestion?._id ? (
          <TinyModal
            show={toBeDeleteQuestion}
            handleClose={handleDeleteClose}
            type="delete_question"
            setMainScreen={""}
            jobView={toBeDeleteQuestion}
          />
        ) : null}
      </div>
    </div>
    // </Fade>
  );
};

export default CreateForm;
