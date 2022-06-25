// do not delete, later to perform file upload
import './Share.css';

import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { axiosHeadersObject } from '../../utils-contants';

export default function Share({disableTextInput, setDisableTextInput, setNewMessage, handleSubmit}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [file, setFile] = useState(null);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("image", file);
      
      // console.log('upload file: ', file);
      // console.log('upload data: ', data);

      try {
        const res = await axios.post("/upload/image", data, axiosHeadersObject());
        // console.log('res: ', res);
        const imageUrl = res.data.data.file_path.fd;
        setNewMessage({ type: 'image', url: imageUrl });
        
        setFile(null);
        setDisableTextInput(false);
      } catch (err) {
        console.log(err);
      }
    }
    
  };

  return (
    
    <div className="share btn-light" >
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => {
              setDisableTextInput(false);
              setFile(null);
            }} />
          </div>
        )}

        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText"> 
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setDisableTextInput(true);
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <div>
          {
            !disableTextInput? <></> :
            <button className ="btn btn-primary shareButton" type='submit' onClick={submitHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          }
          </div>
        </div>

    </div>
  );
}
