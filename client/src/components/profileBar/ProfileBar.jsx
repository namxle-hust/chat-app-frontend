export default function ProfileBar ({user, isProfileBarActive, setProfileBarActive}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className ="sidebar-group">
            <div id="contact-information" className = {isProfileBarActive ? "sidebar active" : "sidebar"} >
                <header>
                    <span>Profile</span>
                    <ul className ="list-inline">
                        <li className ="list-inline-item" onClick = {() => { setProfileBarActive(false); }}>
                            <a href="#" className ="btn btn-outline-light text-danger sidebar-close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </a>
                        </li>
                    </ul>
                </header>
                <div className ="sidebar-body" tabIndex="6" style={{overflow: "hidden", outline: "none" }}>
                    <div className ="pl-4 pr-4">
                        <div className ="text-center">
                            <figure className ="avatar avatar-xl mb-4">
                                <img src={
                                    user?.profile_pic_url
                                        ? user?.profile_pic_url
                                        : PF + "person/noAvatar.png"
                                    } 
                                    
                                    className ="rounded-circle" alt="image" 
                                />
                            </figure>
                            <h5 className ="mb-1">{ user?.user_name }</h5>
                            {/* <small className ="text-muted font-italic">Last seen: Today</small> */}

                            <ul className ="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                                <li className ="nav-item">
                                    <a className ="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                {/* <li className ="nav-item">
                                    <a className ="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Media</a>
                                </li> */}
                            </ul>
                        </div>
                        <div className ="tab-content" id="myTabContent">
                            <div className ="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <p className ="text-muted"> {'some description of user if necessery ......'} </p>
                                <div className ="mt-4 mb-4">
                                    <h6>Phone</h6>
                                    <p className ="text-muted">(555) 555 55 55</p>
                                </div>
                                <div className ="mt-4 mb-4">
                                    <h6>City</h6>
                                    <p className ="text-muted">Ha noi - Cau giay - Washinton DC</p>
                                </div>
                                <div className ="mt-4 mb-4">
                                    <h6>Website</h6>
                                    <p>
                                        <a href="#">google.com</a>
                                    </p>
                                </div>
                                {/* <div className ="mt-4 mb-4">
                                    <h6 className ="mb-3">Social media accounts</h6>
                                    <ul className ="list-inline social-links">
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-facebook" data-toggle="tooltip" title="" data-original-title="Facebook">
                                                <i className ="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-twitter" data-toggle="tooltip" title="" data-original-title="Twitter">
                                                <i className ="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-dribbble" data-toggle="tooltip" title="" data-original-title="Dribbble">
                                                <i className ="fa fa-dribbble"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-whatsapp" data-toggle="tooltip" title="" data-original-title="Whatsapp">
                                                <i className ="fa fa-whatsapp"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-linkedin" data-toggle="tooltip" title="" data-original-title="Linkedin">
                                                <i className ="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-google" data-toggle="tooltip" title="" data-original-title="Google">
                                                <i className ="fa fa-google"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-behance" data-toggle="tooltip" title="" data-original-title="Behance">
                                                <i className ="fa fa-behance"></i>
                                            </a>
                                        </li>
                                        <li className ="list-inline-item">
                                            <a href="#" className ="btn btn-sm btn-floating btn-instagram" data-toggle="tooltip" title="" data-original-title="Instagram">
                                                <i className ="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div className ="mt-4 mb-4">
                                    <h6 className ="mb-3">Settings</h6>
                                    <div className ="form-group">
                                        <div className ="form-item custom-control custom-switch">
                                            <input type="checkbox" className ="custom-control-input" id="customSwitch11" />
                                            <label className ="custom-control-label" for="customSwitch11">Block</label>
                                        </div>
                                    </div>
                                    <div className ="form-group">
                                        <div className ="form-item custom-control custom-switch">
                                            <input type="checkbox" className ="custom-control-input" checked="" id="customSwitch12" />
                                            <label className ="custom-control-label" for="customSwitch12">Mute</label>
                                        </div>
                                    </div>
                                    <div className ="form-group">
                                        <div className ="form-item custom-control custom-switch">
                                            <input type="checkbox" className ="custom-control-input" id="customSwitch13" />
                                            <label className ="custom-control-label" for="customSwitch13">Get
                                                notification</label>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className ="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h6 className ="mb-3 d-flex align-items-center justify-content-between">
                                    <span>Recent Files</span>
                                    <a href="#" className ="btn btn-link small">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-upload mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload
                                    </a>
                                </h6>
                                <div>
                                    <ul className ="list-group list-group-flush">
                                        <li className ="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i className ="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                            </a>
                                        </li>
                                        <li className ="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i className ="fa fa-image text-muted mr-2"></i> avatar_image.png
                                            </a>
                                        </li>
                                        <li className ="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i className ="fa fa-file-excel-o text-success mr-2"></i>
                                                excel_report_file2020.xlsx
                                            </a>
                                        </li>
                                        <li className ="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i className ="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


