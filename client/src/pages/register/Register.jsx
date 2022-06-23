import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      console.log("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    // <div className="login">
    //   <div className="loginWrapper">
    //     <div className="loginLeft">
    //       <h3 className="loginLogo">Hoang cute social</h3>
    //       <span className="loginDesc">
    //         Connect with friends and the world around you on Lamasocial.
    //       </span>
    //     </div>
    //     <div className="loginRight">
    //       <form className="loginBox" onSubmit={handleClick}>
    //         <input
    //           placeholder="Username"
    //           required
    //           ref={username}
    //           className="loginInput"
    //         />
    //         <input
    //           placeholder="Email"
    //           required
    //           ref={email}
    //           className="loginInput"
    //           type="email"
    //         />
    //         <input
    //           placeholder="Password"
    //           required
    //           ref={password}
    //           className="loginInput"
    //           type="password"
    //           minLength="6"
    //         />
    //         <input
    //           placeholder="Confirm Password"
    //           required
    //           ref={passwordAgain}
    //           className="loginInput"
    //           type="password"
    //         />
    //         <button className="loginButton" type="submit">
    //           Sign Up
    //         </button>
    //         <button
    //           className="loginRegisterButton"
    //           type="button"
    //           onClick={() => {
    //             history.push("/login");
    //           }}
    //         >
    //           Login into Account
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <body class="form-membership">
      <div class="form-wrapper">
        {/* <!-- logo --> */}
        <div class="logo">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="612px"
            height="612px"
            viewBox="0 0 612 612"
            style={{ enableBackground: "new 0 0 612 612" }}
            xmlSpace="preserve"
          >
            <g>
              <g id="_x32__26_">
                <g>
                  <path
                    d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
                c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
                c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
                S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
                l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
                M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
                c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"
                  ></path>
                </g>
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        {/* <!-- ./ logo --> */}

        <h5>Create account</h5>

        {/* <!-- form --> */}
        <form onSubmit={handleClick}>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="username"
              required
              autofocus=""
              ref={username}
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              required
              ref={email}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              required
              ref={password}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              required
              ref={passwordAgain}
            />
          </div>

          <button class="btn btn-primary btn-block">Register</button>
          <hr />
          <p class="text-muted">Already have an account?</p>
          <button
            class="btn btn-outline-light btn-sm"
            onClick={() => {
              history.push("/login");
            }}
          >
            {" "}
            Sign in!
          </button>
        </form>
        {/* <!-- ./ form --> */}
      </div>
    </body>
  );
}
