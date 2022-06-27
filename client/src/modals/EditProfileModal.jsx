import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function EditProfileModal({ open, handleOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          
        </Box> */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <img src="https://img.freepik.com/free-vector/website-construction-with-laptop_24911-54680.jpg" />
        </div>
      </Modal>
    </div>
  );
}

// export default function EditProfileModal() {
//     return (
// <div className ="modal fade" id="editProfileModal" tabIndex="-1" role="dialog" aria-hidden="true">
//     <div className ="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
//         <div className ="modal-content">
//             <div className ="modal-header">
//                 <h5 className ="modal-title">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-edit-2 mr-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Lorem ipsum is a pseudo-Latin text used
//                 </h5>
//                 <button type="button" className ="close" data-dismiss="modal" aria-label="Close">
//                     <i className ="ti-close"></i>
//                 </button>
//             </div>
//             <div className ="modal-body">
//                 <ul className ="nav nav-tabs" role="tablist">
//                     <li className ="nav-item">
//                         <a className ="nav-link active" data-toggle="tab" href="#personal" role="tab" aria-controls="personal" aria-selected="true">Personal</a>
//                     </li>
//                     <li className ="nav-item">
//                         <a className ="nav-link" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="false">About</a>
//                     </li>
//                     <li className ="nav-item">
//                         <a className ="nav-link" data-toggle="tab" href="#social-links" role="tab" aria-controls="social-links" aria-selected="false">Social Links</a>
//                     </li>
//                 </ul>
//                 <div className ="tab-content">
//                     <div className ="tab-pane show active" id="personal" role="tabpanel">
//                         <form>
//                             <div className ="form-group">
//                                 <label for="fullname" className ="col-form-label">Fullname</label>
//                                 <div className ="input-group">
//                                     <input type="text" className ="form-control" id="fullname" />
//                                     <div className ="input-group-append">
//                                         <span className ="input-group-text">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className ="form-group">
//                                 <label className ="col-form-label">Avatar</label>
//                                 <div className ="d-flex align-items-center">
//                                     <div>
//                                         <figure className ="avatar mr-3 item-rtl">
//                                             <img src="./dist/media/img/man_avatar4.jpg" className ="rounded-circle" alt="image" />
//                                         </figure>
//                                     </div>
//                                     <div className ="custom-file">
//                                         <input type="file" className ="custom-file-input" id="customFile" />
//                                         <label className ="custom-file-label" for="customFile">Choose file</label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className ="form-group">
//                                 <label for="city" className ="col-form-label">City</label>
//                                 <div className ="input-group">
//                                     <input type="text" className ="form-control" id="city" placeholder="Ex: Columbia" />
//                                     <div className ="input-group-append">
//                                         <span className ="input-group-text">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className ="form-group">
//                                 <label for="phone" className ="col-form-label">Phone</label>
//                                 <div className ="input-group">
//                                     <input type="text" className ="form-control" id="phone" placeholder="(555) 555 55 55" />
//                                     <div className ="input-group-append">
//                                         <span className ="input-group-text">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className ="form-group">
//                                 <label for="website" className ="col-form-label">Website</label>
//                                 <input type="text" className ="form-control" id="website" placeholder="https://" />
//                             </div>
//                         </form>
//                     </div>
//                     <div className ="tab-pane" id="about" role="tabpanel">
//                         <form>
//                             <div className ="form-group">
//                                 <label for="about-text" className ="col-form-label">Write a few words that describe
//                                     you</label>
//                                 <textarea className ="form-control" id="about-text"></textarea>
//                             </div>
//                             <div className ="custom-control custom-checkbox">
//                                 <input type="checkbox" className ="custom-control-input" checked="" id="customCheck1" />
//                                 <label className ="custom-control-label" for="customCheck1">View profile</label>
//                             </div>
//                         </form>
//                     </div>
//                     <div className ="tab-pane" id="social-links" role="tabpanel">
//                         <form>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-facebook">
//                                         <i className ="ti-facebook"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-twitter">
//                                         <i className ="ti-twitter"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-instagram">
//                                         <i className ="ti-instagram"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-linkedin">
//                                         <i className ="ti-linkedin"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-dribbble">
//                                         <i className ="ti-dribbble"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-youtube">
//                                         <i className ="ti-youtube"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-google">
//                                         <i className ="ti-google"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className ="form-group">
//                             <div className ="input-group">
//                                 <input type="text" className ="form-control" placeholder="Username" />
//                                 <div className ="input-group-append">
//                                     <span className ="input-group-text bg-whatsapp">
//                                         <i className ="fa fa-whatsapp"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <div className ="modal-footer">
//                 <button type="button" className ="btn btn-primary">Save</button>
//             </div>
//         </div>
//     </div>
// </div>
//     )
// }
