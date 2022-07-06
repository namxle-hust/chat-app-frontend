import Modal from "@mui/material/Modal";
import "./NewGroupModal.css";
import { useState, useEffect, useContext } from "react";
import { apiRoutes, axiosHeadersObject, fakeAxios } from "../utils-contants";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { AddCircle } from "@material-ui/icons";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import { Chip } from "@material-ui/core";

export default function NewGroupModal({ open, handleOpen, handleClose }) {
  const [groupName, setGroupName] = useState("");
  const [chosenGroupMembers, setChosenGroupMembers] = useState([]); // { id: 1, user_name: '' }
  const [allFriends, setAllFriends] = useState([]);

  const [shouldSave, setShouldSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [showFriends, setShowFriends] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllFriends = async () => {
      const res = await axios.get(apiRoutes.getAllUsers, axiosHeadersObject());
      const tmp = res.data.data.filter((f) => f.id !== user.id);

      setAllFriends(
        tmp.map((user) => ({
          ...user,
          label: user.user_name,
        }))
      );
    };

    getAllFriends();
  }, [open]);

  useEffect(() => {
    if (groupName === "" || chosenGroupMembers.length === 0) {
      setShouldSave(false);
    } else {
      setShouldSave(true);
    }
  }, [groupName, chosenGroupMembers]);

  const handleSave = async () => {
    if (!shouldSave) return;
    if (groupName.match(/^\s+$/) || !groupName) return;

    setLoadingSave(true);

    await axios.post(
      "/group/create",
      {
        name: groupName,
        user_ids: chosenGroupMembers.map((el) => el.id),
      },
      axiosHeadersObject()
    );
    console.log(chosenGroupMembers);

    setLoadingSave(false);
    setGroupName("");
    setChosenGroupMembers([]);
    setShouldSave(false);
    setLoadingSave(false);

    handleClose();

    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setLoadingSave(false);
          setGroupName("");
          setChosenGroupMembers([]);
          setShouldSave(false);
          setLoadingSave(false);

          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            left: "39%",
            top: "15%",
            width: "740px",
          }}
        >
          <div class="phone">
            <div
              class="chevron"
              onClick={() => {
                setLoadingSave(false);
                setGroupName("");
                setChosenGroupMembers([]);
                setShouldSave(false);
                setLoadingSave(false);

                handleClose();
              }}
              style={{ height: "40px", width: "40px" }}
            ></div>
            <div class="title">New Chat Group</div>

            <figure
              className="avatar"
              style={{ width: "90px", height: "90px" }}
            >
              <img class="rounded-circle" src={PF + "person/groupChat.png"} />
            </figure>

            <div class="name">Create new group</div>

            <div class="prop">Group Name</div>
            <input
              class="value"
              style={{
                fontWeight: "400",
              }}
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />

            <div
              class="prop"
              style={{
                cursor: "pointer",
              }}
            >
              <span
                style={{ marginRight: "3px" }}
                onClick={() => {
                  setShowFriends(!showFriends);
                }}
              >
                Group Members
              </span>
            </div>
            <Autocomplete
              onChange={(event, newValue) => {
                setChosenGroupMembers(newValue);
              }}
              sx={{
                marginTop: "15px",
                width: "91%",
              }}
              fullWidth
              multiple
              options={allFriends}
              disableCloseOnSelect
              popupIcon={<AddCircle />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="standard"
                  placeholder="Click to add user"
                  // size='small'
                  sx={{
                    paddingBottom: "10px",
                    "& label.Mui-focused": {
                      display: "none",
                    },
                    "& legend": {
                      display: "none",
                    },
                  }}
                />
              )}
              renderOption={(props, option, state) => (
                <div {...props}>
                  <img
                    className="avatar"
                    style={{
                      width: "26px",
                      height: "26px",
                      marginTop: "0px",
                      marginRight: "30px",
                    }}
                    src={
                      option.profile_pic_url
                        ? option.profile_pic_url
                        : PF + "person/noAvatar.png"
                    }
                    alt="user"
                  />
                  <span
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {option.user_name}
                  </span>
                </div>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    avatar={
                      <Avatar
                        alt={option.user_name}
                        src={
                          option.profile_pic_url
                            ? option.profile_pic_url
                            : PF + "person/noAvatar.png"
                        }
                      />
                    }
                    label={option.user_name}
                  />
                ))
              }
            />
            {loadingSave ? (
              <div class="loader-save"></div>
            ) : (
              <button
                onClick={handleSave}
                style={
                  shouldSave
                    ? {
                        marginTop: "50px",
                        marginBottom: "20px",
                        border: "none",
                        padding: "6px 25px",
                        borderRadius: "20px",
                        backgroundColor: "#437ab7",
                        fontWeight: "400",
                        outline: "none",
                        color: "white",
                      }
                    : {
                        marginTop: "50px",
                        marginBottom: "20px",
                        border: "none",
                        padding: "6px 25px",
                        borderRadius: "20px",
                        backgroundColor: "#c7c5c5",
                        fontWeight: "400",
                        outline: "none",
                        outline: "none",
                        color: "white",
                      }
                }
              >
                Create Group
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
