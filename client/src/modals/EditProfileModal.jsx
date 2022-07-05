import * as React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import './EditProfileModal.css';
import { useEffect, useContext } from 'react';
import { fakeAxios, axiosHeadersObject, apiRoutes } from '../utils-contants';
import { AuthContext } from "../context/AuthContext";
import { LoginSuccess} from '../context/AuthActions';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditProfileModal({ open, handleOpen, handleClose, user, userUpdated, setUserUpdated }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [file, setFile] = useState(null);

  const [isProfileHover, setIsProfileHover] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    setUserName(user.user_name);
    setEmail(user.email);
    setAvatar(user.profile_pic_url);
  }, []);

  useEffect(() => {
    if (
        userName === user.user_name 
        && email === user.email 
        && password === '' 
        && file === null
    ) {
      setShouldSave(false);
    } else {
      setShouldSave(true);
    }
    
  }, [userName, email, password, file]);

  const handleSave = async () => {
    if (!shouldSave) return;

    // ko cho update
    if (userName.match(/^\s+$/) || !userName) {
      return;
    }

    if (password.match(/^\s+$/) || !password) {
      // ko update password
    }

    setLoadingSave(true);

    let imageUrl = '';

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("image", file);
      
      // console.log('upload file: ', file);
      // console.log('upload data: ', data);

      try {
        const res = await axios.post("/upload-user-image", data, axiosHeadersObject());
        // console.log('res: ', res);
        imageUrl = res.data.data.file_path.fd;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(`/update-user-information`, {
        user_name: userName,
        password: password,
        email: email,
        avatar_url: imageUrl
      }, axiosHeadersObject());

      console.log(res);

    } catch (err) {
      console.log(err);
    }

    // ------------ reset user info ---------
    const res = await axios.get(apiRoutes.getUser(user.id), axiosHeadersObject());
    const new_user = res.data;
    dispatch(LoginSuccess(new_user));
    // ----------- ./rest user info ---------

    setLoadingSave(false);
    setUserName(user.user_name);
    setEmail(user.email);
    setAvatar(user.profile_pic_url);
    setFile(null);
    setShouldSave(false);
    setLoadingSave(false);
    setPassword('');

    window.location.reload();

    handleClose();
  }

  return (
    <div style = {{ position: 'relative'}}>
      <Modal
        open={open}
        onClose={() => {
          setUserName(user.user_name);
          setEmail(user.email);
          setAvatar(user.profile_pic_url);
          setPassword('');

          setFile(null);
          setShouldSave(false);
          setLoadingSave(false);

          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <div style = {{ position: 'absolute', left: '39%', top: '15%',  width: '700px' }}>
          <div class="editprofile-phone">
            <div class="editprofile-chevron" 
                onClick = {() => { 
                  setUserName(user.user_name);
                  setEmail(user.email);
                  setAvatar(user.profile_pic_url);
                  setPassword('');
                  
                  setFile(null);
                  setShouldSave(false);
                  setLoadingSave(false);

                  handleClose(); 
                }} 
                style = {{ height: '40px', width: '40px' }}>
            </div>
            <div class="editprofile-title">Edit profile</div>
              <img 
                class="editprofile-avatar" 
                src={ 
                  isProfileHover ? 
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLnfPLVTh4KeLNvuyj15nRqSQ71A5yccavrGpwlTX2RJlM-_BD3_yCFALnCyOLHEoz1w' 
                  : 
                  file ? URL.createObjectURL(file)
                  : 
                  avatar ? avatar
                  : 
                  PF + "person/noAvatar.png" 
                }

                style = {
                  isProfileHover ? 
                  {
                    cursor: 'pointer',
                    opacity: '80%'
                  }
                  :
                  {
                    cursor: 'pointer',
                  }
                }
                onMouseEnter = {() => {
                  setIsProfileHover(true);
                }} 
                onMouseLeave = {() => {
                  setIsProfileHover(false);
                }}
                onClick = {() => {
                  document.getElementById('file_editprofile').click();
                }}
              />
            
            {
              true ? 
              <input
                style = {{ display: 'none' }}
                className="editprofile-avatar"
                type="file"
                id="file_editprofile"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              : <></>
            }

            <div class="editprofile-name">{ user?.user_name }</div>
           
            {/* <div class="editprofile-position">Senior Developer</div> */}
            <div class="editprofile-prop">Email</div>
            {/* <div class="editprofile-value">ivanataylor@kick-ass.code.com</div> */}
            <input class="editprofile-value"
              value = {email}
              onChange = {(e) => {
                setEmail(e.target.value);
              }}

              style = {{
                fontWeight: '400'
              }}
            />
           
            <div class="editprofile-prop">Username</div>
            <input class="editprofile-value"
              value = {userName}
              onChange = {(e) => {
                setUserName(e.target.value);
              }}

              style = {{
                fontWeight: '400'
              }}
            />
           
            <div class="editprofile-prop">New Password</div>
            <input 
              class="editprofile-value" 
              type="password" 
              value = { password }
              onChange = {(e) => {
                setPassword(e.target.value);
              }}

              style = {{
                fontWeight: '400'
              }}
            />
           
            {/* <div class="editprofile-prop">Birthday</div>
            <div class="editprofile-values">
              <div class="editprofile-value value--small">11</div>
              <div class="editprofile-value value--small capture">
                <span class="editprofile-obfuscate"></span>
              </div>
              <div class="editprofile-value value--small">Sep</div>
              <div class="editprofile-value value--small capture">
                <span class="editprofile-obfuscate"></span>
              </div>
              <div class="editprofile-value value--small">1990</div>
              <div class="editprofile-value value--small capture">
                <span class="editprofile-obfuscate"></span>
              </div>
            </div>
            <div class="editprofile-joined">
              Joined <span class="editprofile-date">20 Oct 2020</span><span class="editprofile-date capture"> <span class="editprofile-obfuscate"></span></span>
            </div> */}
            {
              loadingSave ? <div class="editprofile-loader-save"></div>
              :
              <button 
                onClick = {handleSave}

                style = {
                  shouldSave ? 
                  { 
                    marginTop: '20px', 
                    border: 'none', 
                    padding: '6px 25px', 
                    borderRadius: '20px', 
                    backgroundColor: '#437ab7',
                    fontWeight: '400',
                    outline: 'none',
                    color: 'white'
                  }
                  :
                  { 
                    marginTop: '20px', 
                    border: 'none', 
                    padding: '6px 25px', 
                    borderRadius: '20px', 
                    backgroundColor: '#c7c5c5',
                    fontWeight: '400',
                    outline: 'none',
                    color: 'white'
                  }
                }>
                    Save                
              </button>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}