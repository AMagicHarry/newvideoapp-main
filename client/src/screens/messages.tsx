import { useEffect, useState, useRef } from "react";
import Icons from "../components/icons";
import RightLayout2 from "../components/rightLayout2";
import BottomMenu from "../components/bottomMenu";
import { InputGroup, Form, Button, Card } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { StreamChat } from 'stream-chat'
import axios from "axios";
import LinearBackground from "../components/LinearBackground";

function View({ mainScreen, setMainScreen, chatUser }: { mainScreen: number, setMainScreen: any, chatUser: any }) {
  const [showScreen, setShowScreen] = useState(1);
  const [chatClient, setChatClient] = useState<any>();
  const [channel, setChannel] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [formattedMessages, setFormattedMessages] = useState<any>([]);
  const [text, setText] = useState<any>('');
  const { user } = useAuth()
  const [interviewsByInterviewer, setInterviewsByInterviewer] = useState<any>([]);
  const [interviewees, setInterviewees] = useState<any>([]);
  const [currentInterviewee, setCurrentInterviewee] = useState<any>();

  const messagesContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatUser?.interviewer?._id || user?.id) {
      const _id = chatUser?.interviewer?._id || user?.id;
      // axios.get(process.env.REACT_APP_BACKEND_URL + '/interviews/all-interviews-by-interviewer/' + _id).then((res: any) => {
      //   if (res?.data?.length) {
      //     const allInterviewsByInterviewer = res.data;
      //     setInterviewsByInterviewer(allInterviewsByInterviewer);

      //     let _interviewees = allInterviewsByInterviewer.map((a: any) => a?.interviewee).filter((v: any) => v);
      //     _interviewees = Array.from(new Set(_interviewees.map((_interviewee: any) => _interviewee._id))).filter((i: any) => i !== user?.id);

      //     if (_interviewees?.length) {
      //       setInterviewees(_interviewees);
      //       try {
      //         const client = StreamChat.getInstance('hz7uw3t9nzga')
      //         if (user) {
      //           client.devToken(user?.id)
      //           client.connectUser(
      //             { id: user?.id }, user?.chat.token
      //           );
      //           setChatClient(client);
      //         }
      //       } catch (error) {
      //       }
      //     }
      //   }
      // }).catch(() => { })
    }
  }, [chatUser])

  const getInterviewee = (id: any) => {
    if (interviewsByInterviewer?.length) {
      const _iv = interviewsByInterviewer.find((ini: any) => ini?.interviewee?._id === id);
      if (_iv) {
        return _iv.interviewee;
      }
    }
    return null;
  };

  const changeCurrentChannel = async (users: any) => {
    if (channel) {
      channel.stopWatching();
      setChannel(null);
      setMessages([]);
      setCurrentInterviewee(null);
    }
    const _channel = chatClient.channel(`messaging`, {
      members: users,
      created_by_id: users[0],
    });
    _channel.watch();
    _channel.on('message.new', (event: any) => {
      // console.log(_channel.state.messageSets);
    });
    setChannel(_channel);
    setMessages(_channel.state.messageSets);
    setCurrentInterviewee(getInterviewee(users[1]));
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatClient && interviewees) {
      changeCurrentChannel([user?.id, interviewees[0]]);
    }
  }, [chatClient, interviewees]);

  const sendMessage = async () => {
    if (text.trim() !== '') {
      const message = await channel.sendMessage({ text });
      // console.log(message);
      setText('');
    }
  };

  const groupMessagesByDate = (messages: any) => {
    const groupedMessages: any = {};
    messages.forEach((message: any) => {
      const date = new Date(message.created_at);
      const formattedDate = date.toISOString().split('T')[0];

      if (!groupedMessages[formattedDate]) {
        groupedMessages[formattedDate] = [];
      }

      groupedMessages[formattedDate].push(message);
    });

    return groupedMessages;
  }

  function formatDate(inputDate: any) {
    const today = new Date();
    const inputDateTime = new Date(inputDate + 'T00:00:00');
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDateTime.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (inputDateTime.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const day = ('0' + inputDateTime.getDate()).slice(-2);
      const month = ('0' + (inputDateTime.getMonth() + 1)).slice(-2);
      const year = inputDateTime.getFullYear();
      return `${day}-${month}-${year}`;
    }
  }

  function formatTime(timestamp: any) {
    const date = new Date(timestamp);
    const options: any = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  }

  function timeAgo(timestamp: any) {
    const now: any = new Date();
    const date: any = new Date(timestamp);

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return "a few seconds ago";
    } else if (minutes === 1) {
      return "a minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      const formattedTime = formatTime(timestamp);
      return formattedTime;
    }
  }

  useEffect(() => {
    // let _messages: any = [];
    // if (messages?.length) {
    //   _messages = messages[0].messages.map((m: any) => {
    //     return {
    //       id: m?.id,
    //       sent_by: m?.user?.id,
    //       message: m?.text,
    //       created_at: m?.created_at
    //     }
    //   });
    // }
    // const groupedByDate = groupMessagesByDate(_messages);
    // setFormattedMessages(groupedByDate);
    // setText(' ');
    // setTimeout(() => {
    //   setText('');
    // }, 1000);
  }, [messages]);

  return (
    <div className="pageContainer">
      <div className="leftSideDiv">
        <LinearBackground />
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <div className="leftSideHeader" style={{ justifyContent: 'flex-start', marginBottom: 10 }}>
            <div
              onClick={() => {
                setMainScreen(1);
                setShowScreen(0);
              }}
              className="skdmsa-dsad w-auto"
            >
              <div className="backButtonDiv">
                <button className="hkjndankad-dnsd">
                  <Icons iconNumber={29} />
                </button>
                <h5 className="mksaldkamaw-jdwa">Back</h5>
              </div>
            </div>
          </div>
          <div className="message message-content row m-0" style={{ height: 620 }}>
            <div className="col-5 message-left bg-body-tertiary h-100 overflow-auto">
              <div className="header d-flex justify-content-between align-items-center">
                <div className="message-heading">
                  <Icons iconNumber={95} />
                  <h6>{user?.name}</h6>
                </div>
              </div>
              {interviewees.map((interviewee: any) => {
                return (
                  <div key={interviewee} className={`message-room ${interviewee === currentInterviewee?._id ? 'selected shadow-sm' : ''}`} onClick={() => {
                    changeCurrentChannel([user?.id, interviewee]);
                  }}>
                    <Icons iconNumber={95} />
                    <div className="person-content w-100">
                      <div className="d-flex justify-content-between">
                        <h5>{getInterviewee(interviewee)?.name}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Card className="col-7 message-right h-100">
              <Card.Header as="h5" className="message-header shadow-sm">
                <div className="message-heading">
                  <Icons iconNumber={95} />
                  <h6>{currentInterviewee?.name || ''}</h6>
                </div>
                <AiFillInfoCircle color="gray" />
              </Card.Header>
              <Card.Body className="message-body overflow-auto">
                {messages?.length ? Object.keys(groupMessagesByDate(messages[0].messages.map((m: any) => {
                  return {
                    id: m?.id,
                    sent_by: m?.user?.id,
                    message: m?.text,
                    created_at: m?.created_at
                  }
                })))?.length ? Object.keys(groupMessagesByDate(messages[0].messages.map((m: any) => {
                  return {
                    id: m?.id,
                    sent_by: m?.user?.id,
                    message: m?.text,
                    created_at: m?.created_at
                  }
                }))).map((date: any) => (
                  <div key={date}>
                    <span className="divider line one-line">{formatDate(date)}</span>
                    {groupMessagesByDate(messages[0].messages.map((m: any) => {
                      return {
                        id: m?.id,
                        sent_by: m?.user?.id,
                        message: m?.text,
                        created_at: m?.created_at
                      }
                    }))[date].map((item: any) => (
                      <div key={item?.id}>
                        <div className={`d-flex justify-content-${item?.sent_by === user?.id ? 'end' : 'start'}`}>
                          <div className={`alert alert-${item?.sent_by === user?.id ? 'light' : 'info'} p-1 px-2 mb-0`} style={{ fontSize: '80%', width: 'fit-content' }}>
                            {item?.message}
                          </div>
                        </div>
                        <span className={`d-flex justify-content-${item?.sent_by === user?.id ? 'end' : 'start'} mb-2`} style={{ color: 'rgba(33, 37, 41, 0.5)', fontSize: '70%' }}>{timeAgo(item?.created_at)}</span>
                      </div>
                    ))}
                  </div>
                )) : <></> : <></>}
              </Card.Body>
              <Card.Footer className="message-footer d-flex">
                <Button variant="light" className="d-none"><MdAddCircleOutline color="gray" /></Button>
                <InputGroup id="message-input" onChange={(e: any) => setText(e.target.value)} onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    sendMessage()
                  }
                }}>
                  <Form.Control value={text} placeholder="Type your message" />
                  <Button variant="outline-secondary" id="button-addon2"><FaRegSmile /></Button>
                </InputGroup>
                <Button variant="light"><FaCircleArrowRight color="gray" onClick={sendMessage} /></Button>
              </Card.Footer>
            </Card>
          </div>
          <div className="d-flex justify-content-center kdnklms-awendwd-11">
            <BottomMenu setShowScreen={0} showScreen={0} mainScreen={mainScreen} setMainScreen={setMainScreen} />
          </div>
        </div>
      </div>
      <RightLayout2 setMainScreen={setMainScreen} setShowScreen={setShowScreen} />
    </div>
  );
}

export default View;
