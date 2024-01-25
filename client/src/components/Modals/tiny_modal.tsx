import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
// @ts-ignore
import $ from "jquery";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Notify from "../Notify";

const TinyModal = ({ show, handleClose, type, setMainScreen, jobView, setshowScreen }: { show: boolean, handleClose: any, type: string, setMainScreen: any, jobView?: any, setshowScreen?: any }) => {
  const { user, logout } = useAuth();
  const [notifyMessage, setNotifyMessage] = useState('')
  const [deleteNotify, setDeleteNotify] = useState(false);

  useEffect(() => {
    if (show && type == "delete_interview") {
      $(".modal-backdrop").css("opacity", 0);
    }
  }, [show]);

  const getByType = () => {
    switch (type) {
      case "delete_account":
        return {
          title: 'Delete Account',
          message: 'We’ll remove your Account and details from our system.',
          confirmText: 'Delete Account',
          onConfirm: () => {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${user?.id}`).then((res) => {
              setMainScreen(0)

            })
          },
          classes: ''
        }
      case "remove_method":
        return {
          title: 'Remove Billing Method?',
          message: 'We’ll remove your MasterCard ending in 6976.',
          confirmText: 'Remove method',
          onConfirm: () => { },
          classes: ''
        }
      case "logout":
        return {
          title: 'Log out',
          message: 'This will log you out of your account.',
          confirmText: 'Confirm',
          onConfirm: () => {
            handleClose();
            logout();
            setMainScreen(5);
          },
          classes: ''
        }
      case "delete_interview":
        return {
          title: 'Delete Interview',
          message: 'Are you sure want to delete this interview?',
          confirmText: 'Delete',
          onConfirm: () => {
              axios.delete(`${process.env.REACT_APP_BACKEND_URL}/interviewer/${jobView?._id}`).then((res) => {
                setshowScreen(0)
                setMainScreen(1)
               
               handleClose()
             })
            
            
          },
          classes: 'del-interview-modal'
        }
      case "delete_interview_video":
        return {
          title: 'Delete Interview',
          message: 'Are you sure want to delete this interview?',
          confirmText: 'Delete',
          onConfirm: () => {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/interviews/${jobView?.id}`).then((res) => {
              handleClose()
              setMainScreen(2)
              if (typeof setshowScreen === 'function') {
                setNotifyMessage('Interview Deleted!')
                setDeleteNotify(true)
                setMainScreen(0);
              }
            })
          },
          classes: 'w-50'
        }
      case "delete_question":
        return {
          title: 'Delete Question',
          message: 'Are you sure want to delete this Question?',
          confirmText: 'Delete',
          onConfirm: () => {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/questions/${jobView?._id}`).then((res) => {
              handleClose()
              setNotifyMessage('Question deleted')
              setDeleteNotify(true)
            })
          },
          classes: 'w-50'
        }
      default:
        return {
          title: '',
          message: '',
          confirmText: '',
          onConfirm: () => { },
          classes: ''
        }
    }
  };

  return (
    <Modal className={`modal-primary tiny-modal ${getByType().classes}`} show={show} onHide={handleClose} centered>

      <Modal.Header className="flex-column">
        <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="align-self-end">
          <path fill-rule="evenodd" clipRule="evenodd" d="M2.66958 1.11595C2.24121 0.687583 1.58365 0.650726 1.20083 1.03354C0.818022 1.41635 0.85502 2.07377 1.28339 2.50214L4.85156 6.07031L1.11946 9.80242C0.690564 10.2313 0.655277 10.8897 1.04079 11.2752C1.4263 11.6607 2.08465 11.6254 2.51355 11.1965L6.24565 7.4644L9.9663 11.185C10.3947 11.6134 11.0521 11.6504 11.4349 11.2676C11.8177 10.8848 11.7809 10.2272 11.3525 9.79886L7.63184 6.07821L11.1964 2.51368C11.6251 2.08495 11.6604 1.42661 11.2749 1.0411C10.8893 0.655582 10.231 0.690858 9.80228 1.1196L6.23775 4.68412L2.66958 1.11595Z" fill="white" />
        </svg>
        <h1>{getByType()?.title}</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <p className="text-left">{getByType()?.message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button className="bordered" onClick={getByType().onConfirm}>
          {getByType()?.confirmText}
        </Button>
      </Modal.Footer>
      <Notify show={deleteNotify} title={notifyMessage} handleClose={() => setDeleteNotify(false)} />
    </Modal >
  )
}

export default TinyModal;