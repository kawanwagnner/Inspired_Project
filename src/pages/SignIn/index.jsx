import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import gregoMan from "../SignIn/img/sculpture-davi.jpg";

const SignIn = () => {
  const [formData, setFormData] = useState({
    your_name: "",
    your_pass: "",
    remember_me: false,
  });

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

  const validate = () => {
    const errors = {};
    if (!formData.your_name) errors.your_name = "Name is required";
    if (!formData.your_pass) errors.your_pass = "Password is required";
    if (formData.your_pass.length < 6)
      errors.your_pass = "Password must be at least 6 characters";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        if (validationErrors.hasOwnProperty(key)) {
          toast.error(validationErrors[key]);
        }
      }
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (
      storedData &&
      storedData.your_email === formData.your_name &&
      storedData.your_pass === formData.your_pass
    ) {
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/"; // Redirecionamento após o login
      }, 2000); // 2 segundos de delay para o usuário ver a mensagem de sucesso
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="main">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign In</title>
        <link rel="stylesheet" href="path/to/your/vendor.css" />
        <script src="path/to/your/vendor.js"></script>
      </Helmet>

      <ToastContainer />

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
              <form
                method="POST"
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Email"
                    value={formData.your_name}
                    onChange={handleChange}
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
                    value={formData.your_pass}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember-me"
                    className="agree-term"
                    checked={formData.remember_me}
                    onChange={handleChange}
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
