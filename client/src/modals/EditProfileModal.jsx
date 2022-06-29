import * as React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import "./EditProfileModal.css";
import { useEffect } from "react";
import { fakeAxios } from "../utils-contants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProfileModal({
  open,
  handleOpen,
  handleClose,
  user,
  userUpdated,
  setUserUpdated,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);

  const [isProfileHover, setIsProfileHover] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    setUserName(user.user_name);
    setEmail(user.email);
    setAvatar(user.profile_pic_url);
  }, []);

  useEffect(() => {
    if (
      userName === user.user_name &&
      email === user.email &&
      password === "" &&
      file === null
    ) {
      setShouldSave(false);
    } else {
      setShouldSave(true);
    }
  }, [userName, email, password, file]);

  const handleSave = async () => {
    if (!shouldSave) return;

    console.log("save thui hehe !!");

    setLoadingSave(true);

    await fakeAxios(2000);

    setLoadingSave(false);
    setUserName(user.user_name);
    setEmail(user.email);
    setAvatar(user.profile_pic_url);
    setFile(null);
    setShouldSave(false);
    setLoadingSave(false);
    setUserUpdated(!userUpdated);

    handleClose();
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={open}
        onClose={() => {
          setUserName(user.user_name);
          setEmail(user.email);
          setAvatar(user.profile_pic_url);
          setFile(null);
          setShouldSave(false);
          setLoadingSave(false);

          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          
        </Box> */}
        <div
          style={{
            position: "absolute",
            left: "42%",
            top: "15%",
            width: "550px",
          }}
        >
          {/* <div class="check">
            <input type="checkbox" id="checkbox" onchange="document.body.classList.toggle('capture')" /><label for="checkbox">test</label>
          </div> */}
          <div class="phone">
            <div
              class="chevron"
              onClick={() => {
                setUserName(user.user_name);
                setEmail(user.email);
                setAvatar(user.profile_pic_url);
                setFile(null);
                setShouldSave(false);
                setLoadingSave(false);

                handleClose();
              }}
              style={{ height: "40px", width: "40px" }}
            ></div>
            <div class="title">Edit profile</div>

            <img
              class="avatar"
              src={
                isProfileHover
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLnfPLVTh4KeLNvuyj15nRqSQ71A5yccavrGpwlTX2RJlM-_BD3_yCFALnCyOLHEoz1w"
                  : file
                  ? URL.createObjectURL(file)
                  : avatar
                  ? avatar
                  : PF + "person/noAvatar.png"
              }
              style={
                isProfileHover
                  ? {
                      cursor: "pointer",
                      opacity: "80%",
                    }
                  : {
                      cursor: "pointer",
                    }
              }
              onMouseEnter={() => {
                setIsProfileHover(true);
              }}
              onMouseLeave={() => {
                setIsProfileHover(false);
              }}
              onClick={() => {
                document.getElementById("file").click();
              }}
            />

            {isProfileHover ? (
              <input
                style={{ display: "none" }}
                className="avatar"
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            ) : (
              <></>
            )}

            <div class="name">{user?.user_name}</div>
            {/* <div class="name capture">
              I <span class="obfuscate"></span> T <span class="obfuscate"></span>
            </div> */}
            {/* <div class="position">Senior Developer</div> */}
            <div class="prop">Email</div>
            {/* <div class="value">ivanataylor@kick-ass.code.com</div> */}
            <input
              class="value"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* <div class="value capture">
              i <span class="obfuscate"></span> @k
              <span class="obfuscate"></span> .com
            </div> */}
            <div class="prop">Username</div>
            <input
              class="value"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {/* <div class="value capture">
              <span class="obfuscate"></span>
            </div> */}
            <div class="prop">New Password</div>
            <input
              class="value"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <div class="value capture">
              <span class="obfuscate"></span>
            </div> */}
            {/* <div class="prop">Birthday</div>
            <div class="values">
              <div class="value value--small">11</div>
              <div class="value value--small capture">
                <span class="obfuscate"></span>
              </div>
              <div class="value value--small">Sep</div>
              <div class="value value--small capture">
                <span class="obfuscate"></span>
              </div>
              <div class="value value--small">1990</div>
              <div class="value value--small capture">
                <span class="obfuscate"></span>
              </div>
            </div>
            <div class="joined">
              Joined <span class="date">20 Oct 2020</span><span class="date capture"> <span class="obfuscate"></span></span>
            </div> */}
            {loadingSave ? (
              <div class="loader-save"></div>
            ) : (
              <button
                onClick={handleSave}
                style={
                  shouldSave
                    ? {
                        marginTop: "20px",
                        border: "none",
                        padding: "6px 25px",
                        borderRadius: "20px",
                        backgroundColor: "#437ab7",
                        fontWeight: "400",
                        outline: "none",
                      }
                    : {
                        marginTop: "20px",
                        border: "none",
                        padding: "6px 25px",
                        borderRadius: "20px",
                        backgroundColor: "#c7c5c5",
                        fontWeight: "400",
                        outline: "none",
                      }
                }
              >
                Save
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
