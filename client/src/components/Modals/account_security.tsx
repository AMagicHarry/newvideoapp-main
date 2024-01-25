import { useState } from "react";
import { Modal } from "react-bootstrap";
import profile_img from "../../images/Profile Pic.svg";
import ChangeModal from "./change_modal";
import TinyModal from "./tiny_modal";
import { useAuth } from "../../hooks/useAuth";

const AccountSecurity = ({ show, handleClose, setNotifyShow, setMainScreen, setNotifyTitle, setErrorMessage = null }: { show: boolean, handleClose: any, setNotifyShow: any, setMainScreen: any, setNotifyTitle: any, setErrorMessage?: any }) => {
  const [show_change, setChangeModal] = useState(false);
  const [change_item, setChangeItem] = useState("");

  const [show_tiny, setTinyModal] = useState(false);
  const [tiny_type, setTinyType] = useState("");
  const { user } = useAuth()

  const handleChangeClose = () => {
    setChangeModal(false)
    setChangeItem('');
  };

  const handleChangeShow = (item: string) => {
    setChangeModal(true);
    setChangeItem(item);
  };

  const handleTinyClose = () => setTinyModal(false);
  const handleTinyShow = (type: string) => {
    setTinyModal(true);
    setTinyType(type);
  };

  return (
    <Modal className={`modal-primary account-modal text-white ${show_change || show_tiny ? "z-0" : ""}`} show={show} onHide={handleClose} centered>
      <Modal.Header className="flex-column-reverse">
        <h1>Account & Security</h1>
        <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="align-self-end">
          <path fill-rule="evenodd" clipRule="evenodd" d="M2.66958 1.11595C2.24121 0.687583 1.58365 0.650726 1.20083 1.03354C0.818022 1.41635 0.85502 2.07377 1.28339 2.50214L4.85156 6.07031L1.11946 9.80242C0.690564 10.2313 0.655277 10.8897 1.04079 11.2752C1.4263 11.6607 2.08465 11.6254 2.51355 11.1965L6.24565 7.4644L9.9663 11.185C10.3947 11.6134 11.0521 11.6504 11.4349 11.2676C11.8177 10.8848 11.7809 10.2272 11.3525 9.79886L7.63184 6.07821L11.1964 2.51368C11.6251 2.08495 11.6604 1.42661 11.2749 1.0411C10.8893 0.655582 10.231 0.690858 9.80228 1.1196L6.23775 4.68412L2.66958 1.11595Z" fill="white" />
        </svg>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-part row align-items-center">
          <div className="col">
            <img
              className="profile-img p-0 rounded-circle border border-2 border-white"
              src={user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000") || user?.profile_image || profile_img}
              onError={(e: any) => {
              //  console.log('1:', user?.profile_image);
              //  console.log('2', profile_img);
              //  console.log('3', user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000"));
              //  e.target.src = profile_img;
               e.target.src = user?.profile_image?.replace("https://api.videointerviews.io", "http://localhost:4000");
              }}
              alt="Profile Picture"
              style={{ width: '45px', height: '45px' }}
            />
          </div>
          <div className="col d-flex justify-content-center flex-column align-items-end">
            <button onClick={() => handleChangeShow("ProfilePicture")}>Change Profile Picture</button>
            <p className="pic-desc mt-1">Must be JPEG, JPG, or PNG and cannot exceed 5MB.</p>
          </div>
        </div>
        <div className="modal-part row align-items-center">
          <div className="col">
            <h6>NAME</h6>
            <p>{user?.name}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button onClick={() => handleChangeShow("Name")}>Edit</button>
          </div>
        </div>
        <div className="modal-part row align-items-center">
          <div className="col">
            <h6>ORGANISATION</h6>
            <p>{user?.company_name}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button onClick={() => handleChangeShow("Company")}>Edit</button>
          </div>
        </div>
        <div className="modal-part row align-items-center">
          <div className="col">
            <h6>LOCATION</h6>
            <p>{user?.location}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button onClick={() => handleChangeShow("Location")}>Edit</button>
          </div>
        </div>
        <div className="modal-part row align-items-center">
          <div className="col">
            <h6>EMAIL</h6>
            <p>{user?.email}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button onClick={() => handleChangeShow("Email")}>Edit</button>
          </div>
        </div>
        <div className="modal-part row align-items-center">
          <div className="col">
            <h6>PASSWORD</h6>
            <p>**********</p>
          </div>
          <div className="col d-flex justify-content-end">
            <button onClick={() => handleChangeShow("Password")}>Change Password</button>
          </div>
        </div>
        <div className="delete-part d-flex justify-content-end">
          <button className="border" onClick={() => {
            setTinyType("delete_account")
            handleTinyShow("delete_account")
          }}>Delete Account</button>
        </div>
      </Modal.Body>
      <ChangeModal show={show_change} handleClose={handleChangeClose} item={change_item} setNotifyShow={setNotifyShow} setNotifyTitle={setNotifyTitle} setErrorMessage={setErrorMessage} />
      <TinyModal show={show_tiny} handleClose={handleTinyClose} type={tiny_type} setMainScreen={setMainScreen} jobView={''} />
    </Modal>
  )
}

export default AccountSecurity;