import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFullscreen } from "../../hooks/useFullscreen";
import CheckFormBox from "../CheckBoxForm";
import Icons from "../icons";
import axios from "axios";
import { useEffect, useState } from "react";

const BeginForm = ({ setScreen, jobViewContext, recorded, setMainScreen, className = '', setJobViewContext, setFromShareScreen }: { setScreen: any, jobViewContext: any, recorded: any, setMainScreen: any, className?: any, setJobViewContext: any, setFromShareScreen: any }) => {

  const { user } = useAuth();
  const { setFullscreen }
    = useFullscreen()
  const navigate = useNavigate()
  function createFormData(object: any, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }

  return (
    <div className={`kjjfds-janwkea1 kjjfds-janwkea2 white-form height-none ${className}`}>
      <div className='wave-box'>
        <div className='wave'></div>
      </div>
      <div className="kafms-kfsamfer">
        <div className="skfalk-smdsefds">
          <div className="kdjnfakdsfm-jsamre">
            <img src={require("../../images/i5.png")} />
          </div>
          <div className="kjdflkads-mdskf">
            <h3>{jobViewContext?.job_title}</h3>
            <h5>
              <Icons iconNumber={16} /> {jobViewContext?.job_recruiter || jobViewContext?.interviewer.company_name}
            </h5>
            <h6>
              <Icons iconNumber={17} /> {jobViewContext?.interviewer.location}
            </h6>
          </div>
        </div>
        <div className="njfk-amew">
          {jobViewContext?.questions?.map((data: any, index: any) => (
            <CheckFormBox questions={data} recorded={recorded} noAction={true} />
          ))}
        </div>
        <div className="kdjsa-ajwnkelds afkfjnkas-edsm">
          <div className="continueBtnDiv snasdj-sawdne">
            <button className="btn" onClick={() => {
              if (recorded?.length === jobViewContext?.questions?.length) {
                let submitted = 0;

                recorded.forEach((obj: any, index: any) => {
                  var formData = new FormData();
                  formData.append(`question_id`, obj._id);
                  formData.append(`job_id`, jobViewContext._id);
                  formData.append(`interviewer`, jobViewContext.interviewer._id);
                  if (user?.id) {
                    formData.append(`interviewee`, `${user.id}`);
                  }
                  formData.append('video', obj.recording);

                  // axios.post(process.env.REACT_APP_BACKEND_URL + '/interviews', formData, {
                  //   headers: {
                  //     'Content-Type': 'multipart/form-data',
                  //   },
                  // }).then((res) => { }).finally(() => { submitted = submitted + 1 })
                });

                const _timer = setInterval(() => {
                  if (submitted === recorded.length) {
                    console.log("sumited case")
                    clearInterval(_timer);
                    setJobViewContext(null)
                    localStorage.removeItem('shared')
                    setFromShareScreen(false)
                    setFullscreen(false)
                    setMainScreen(1);
                    navigate('/')
                  }
                }, 100);
              } else {
                console.log("not submitted case")
                setScreen(1);
              }
            }}>
              {recorded?.length === jobViewContext?.questions?.length ? 'Submit' : recorded?.length ? 'Next Question' : 'Begin'}
              <div className="kdksa-ajwmd ">
                <Icons iconNumber={7} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="ldkjfal0-fdsnfe">
        <Icons iconNumber={62} />
      </div>
    </div>
  );
};

export default BeginForm;