import { useEffect, useState } from "react";
import Icons from "./icons";
import axios from "axios";

const CheckFormBox = ({ questions, forcedActive = false, recorded = [], noAction = false }: { questions: any, forcedActive?: boolean, recorded?: any, noAction?: boolean }) => {
  const [question, setQuestion] = useState(questions);

  const _isActive = (id: string) => {
    return recorded?.length && !!recorded.find((aid: any) => aid._id === id && aid?.recording);
  };

  const [isActive, setIsactive] = useState(forcedActive || _isActive(question?._id) ? 1 : 0);

  useEffect(() => {
    if (!question?._id && typeof question === 'string') {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/questions/${question}`).then(res => {
        if (res?.data?._id) {
          setQuestion(res.data);
        }
      })
    }
  }, []);

  return (
    <button
      // onMouseEnter={noAction || forcedActive || _isActive(question?._id) ? () => { } : () => {
      //   if (isActive == 0) {
      //     setIsactive(1)
      //   }
      // }}
      // onMouseLeave={noAction || forcedActive || _isActive(question?._id) ? () => { } : () => {
      //   if (isActive != 2)
      //     setIsactive(0)
      // }}
      // onClick={noAction || forcedActive || _isActive(question?._id) ? () => { } : () => {
      //   if (isActive != 2) {
      //     setIsactive(2)
      //   } else {
      //     setIsactive(0)
      //   }
      // }}
      className="kadfmsod-wem sadamodajm-e dsjskd-kads no-shadow check-item"
      style={{ width: 303 }}
    >
      <div>
        <Icons iconNumber={isActive > 0 || _isActive(question?._id) ? 15 : 24} />
      </div>
      <h5>{question?.question}</h5>
      <div className="timing" style={{ marginLeft: 10 }}>
        {" "}
        <Icons iconNumber={18} />
        <h6>{question?.time_duration}s</h6>
      </div>
    </button>
  )
}

export default CheckFormBox