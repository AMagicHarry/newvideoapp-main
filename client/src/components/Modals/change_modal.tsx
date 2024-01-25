import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import Notify from "../Notify";

interface FormProps {
  heading: string,
  subheading: string,
  label: string,
  placeholder: string,
  inputType: string,
  successMessage: string,
}

const ChangeModal = ({ show, handleClose, item, setNotifyShow, setNotifyTitle = null, setErrorMessage = null }: { show: boolean, handleClose: any, item: string, setNotifyShow: any, setNotifyTitle?: any, setErrorMessage?: any }) => {
  const [password, setPassword] = useState('')
  const [data, setData] = useState('')
  const [file, setFile] = useState<any>(null)

  const { user, setUser }: { user: any, setUser: any } = useAuth()

  useEffect(() => {
    if (item && user?.id) {
      switch (item) {
        case 'Name':
          setData(user['name']);
          break;
        case 'Location':
          setData(user['location']);
          break;
        case 'Email':
          setData(user['email']);
          break;
        case 'Company':
          setData(user['company_name']);
          break;
      }
    }
  }, [item]);

  const fileChange = (e: any) => {
    const target = e.target;
    let filename = 'No file chosen...'
    if (target?.files?.length) {
      filename = e.target.files[0].name;
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    const _selectName = document.querySelector(".file-select-name");
    if (_selectName) {
      _selectName.innerHTML = filename;
    }
  };

  const _handleClose = () => {
    setData('');
    setFile(null);
    setPassword('');
    handleClose();
    setErrorMessage('');
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('current_password', password);
    switch (item) {
      case 'ProfilePicture':
        formData.append('file', file);
        break;
      case 'Name':
        formData.append('name', data);
        break;
      case 'Location':
        formData.append('location', data);
        break;
      case 'Email':
        formData.append('email', data);
        break;
      case 'Company':
        formData.append('company_name', data);
        break;
      case 'Password':
        formData.append('password', data);
        break;
    }

    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/users/${user?.id}`, formData, item == 'ProfilePicture' ? {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      } : {})
      .then((res) => {
        res.data['id'] = res.data._id
        setUser(res.data)
        setData('');
        setFile(null);
        setPassword('');
        if (typeof setNotifyTitle === 'function') {
          setNotifyTitle(getProp()?.successMessage);
        }
        setNotifyShow(true);
        handleClose('');
        setErrorMessage('');
      })
      .catch((err) => {
        if (err?.response?.data?.message?.length) {
          let errorMessage = ''
          if (Array.isArray(err.response.data.message)) {
            const keys = Object.keys(err.response.data.message[0]);
            if (err?.response?.data?.message?.[0]?.[keys[0]]) {
              errorMessage = err.response.data.message[0][keys[0]];
            }
          } else {
            errorMessage = err.response.data.message;
          }
          if (typeof setErrorMessage === 'function' && errorMessage?.length) {
            setErrorMessage(errorMessage);
          }
        }
      })
  };

  const getProp = (): FormProps => {
    let node: FormProps = {
      heading: '',
      subheading: '',
      label: '',
      placeholder: '',
      inputType: '',
      successMessage: ''
    };
    switch (item) {
      case 'ProfilePicture':
        node.heading = 'Change your Profile Picture'
        node.subheading = 'Select a image and enter your existing password.'
        node.label = 'PROFILE PICTURE'
        node.placeholder = 'Profile Picture'
        node.inputType = 'file'
        node.successMessage = 'Profile Picture has been updated.'
        break;
      case 'Name':
        node.heading = 'Change your Name'
        node.subheading = 'Enter Full Name and your existing password.'
        node.label = 'NAME'
        node.placeholder = 'Full Name'
        node.inputType = 'text'
        node.successMessage = 'Display Name has been updated.'
        break;
      case 'Location':
        node.heading = 'Change your Location'
        node.subheading = 'Enter a new Location and your existing password.'
        node.label = 'LOCATION'
        node.placeholder = 'LA.'
        node.inputType = 'text'
        node.successMessage = 'Location has been updated.'
        break;
      case 'Email':
        node.heading = 'Change your Email'
        node.subheading = 'Enter a new Email and your existing password.'
        node.label = 'EMAIL'
        node.placeholder = 'abc@example.com'
        node.inputType = 'text'
        node.successMessage = 'Email has been updated.'
        break;
      case 'Company':
        node.heading = 'Change Company'
        node.subheading = 'Enter a Company and your existing password.'
        node.label = 'COMPANY NAME'
        node.placeholder = 'Example Org.'
        node.inputType = 'text'
        node.successMessage = 'Company name has been updated.'
        break;
      case 'Password':
        node.heading = 'Change your Password'
        node.subheading = 'Enter a new Password and your existing password.'
        node.label = 'NEW PASSWORD'
        node.placeholder = '**********'
        node.inputType = 'password'
        node.successMessage = 'Password has been updated.'
        break;
    }
    return node;
  };

  return (
    <Modal className="modal-primary change-modal" show={show} onHide={_handleClose} centered>
      <Modal.Header className="flex-column">
        <svg onClick={_handleClose} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="align-self-end">
          <path fill-rule="evenodd" clipRule="evenodd" d="M2.66958 1.11595C2.24121 0.687583 1.58365 0.650726 1.20083 1.03354C0.818022 1.41635 0.85502 2.07377 1.28339 2.50214L4.85156 6.07031L1.11946 9.80242C0.690564 10.2313 0.655277 10.8897 1.04079 11.2752C1.4263 11.6607 2.08465 11.6254 2.51355 11.1965L6.24565 7.4644L9.9663 11.185C10.3947 11.6134 11.0521 11.6504 11.4349 11.2676C11.8177 10.8848 11.7809 10.2272 11.3525 9.79886L7.63184 6.07821L11.1964 2.51368C11.6251 2.08495 11.6604 1.42661 11.2749 1.0411C10.8893 0.655582 10.231 0.690858 9.80228 1.1196L6.23775 4.68412L2.66958 1.11595Z" fill="white" />
        </svg>
        <h1>{getProp()?.heading}</h1>
        <p>{getProp()?.subheading}</p>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-part" style={{ cursor: item === 'ProfilePicture' ? 'pointer' : 'text' }} onClick={(e) => {
          if (item === 'ProfilePicture') {
            document.getElementById("file-upload-input")?.click();
          } else {
            const _node: HTMLInputElement | null = e?.currentTarget?.querySelector(`input[name="${item}"]`);
            if (_node) {
              _node.focus();
            }
          }
        }}>
          <h6>{getProp()?.label}</h6>
          {item === 'ProfilePicture' ? (
            <div className="file-upload">
              <div className="file-upload-select">
                <div className="file-select-button"></div>
                <div className="file-select-name">No file chosen...</div>
                <input type="file" name="file-upload-input" id="file-upload-input" onChange={fileChange} />
              </div>
            </div>
          ) : (
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              name={item}
              className="settingsInput w-100 text-white inputClss"
              type={getProp()?.inputType}
              autoComplete="off"
              placeholder={getProp()?.placeholder}
              autoFocus={true}
            //  style={{ backgroundColor: '#4A60FF', border: "none", outline: "none", color: "#fff" }}
            />
          )}
        </div>
        <div className="modal-part" style={{ cursor: 'text' }} onClick={(e) => {
          const _node: HTMLInputElement | null = e?.currentTarget?.querySelector(`input[name="current_password"]`);
          if (_node) {
            _node.focus();
          }
        }}>
          <h6>CURRENT PASSWORD</h6>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="current_password"
            className="settingsInput w-100 inputClss"
            type='password'
            autoComplete="off"
            placeholder="**********"
            //style={{ backgroundColor: '#4A60FF', border: "none", outline: "none", color: "#fff" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={_handleClose}>Close</Button>
        <Button className="bordered" onClick={handleSave} disabled={!(password?.length && (data?.length || file))}>Save changes</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default ChangeModal;