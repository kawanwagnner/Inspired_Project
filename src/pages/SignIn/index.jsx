import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import gregoMan from "../SignIn/img/sculpture-davi.jpg";

const SignIn = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript("vendor/jquery/jquery.min.js")
      .then(() => loadScript("js/main.js"))
      .catch((err) => console.error("Failed to load script", err));
  }, []);

  return (
    <div className="main">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign In</title>
        <link rel="stylesheet" href="path/to/your/vendor.css" />

        <script src="path/to/your/vendor.js"></script>
      </Helmet>
      {/* Sign in form */}
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={gregoMan} alt="sign in" />
              </figure>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label htmlFor="remember-me" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Ou faça login com</span>
                <ul className="socials">
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;