export default function ProfileBar({
  user,
  isProfileBarActive,
  setProfileBarActive,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="sidebar-group">
      <div
        id="contact-information"
        className={isProfileBarActive ? "sidebar active" : "sidebar"}
      >
        <header>
          <span>Profile</span>
          <ul className="list-inline">
            <li
              className="list-inline-item"
              onClick={() => {
                setProfileBarActive(false);
              }}
            >
              <a
                href="#"
                className="btn btn-outline-light text-danger sidebar-close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </a>
            </li>
          </ul>
        </header>
        <div
          className="sidebar-body"
          tabIndex="6"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <div className="pl-4 pr-4">
            <div className="text-center">
              <figure className="avatar avatar-xl mb-4">
                <img
                  src={
                    user?.profile_pic_url
                      ? user?.profile_pic_url
                      : PF + "person/noAvatar.png"
                  }
                  className="rounded-circle"
                  alt="image"
                />
              </figure>
              <h5 className="mb-1">{user?.user_name}</h5>
              {/* <small className ="text-muted font-italic">Last seen: Today</small> */}

              <ul
                className="nav nav-tabs justify-content-center mt-5"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <p className="text-muted">
                  {" "}
                  {"some description of user if necessery ......"}{" "}
                </p>
                <div className="mt-4 mb-4">
                  <h6>Phone</h6>
                  <p className="text-muted">(555) 555 55 55</p>
                </div>
                <div className="mt-4 mb-4">
                  <h6>City</h6>
                  <p className="text-muted">Ha noi - Cau giay - Washinton DC</p>
                </div>
                <div className="mt-4 mb-4">
                  <h6>Website</h6>
                  <p>
                    <a href="#">google.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
