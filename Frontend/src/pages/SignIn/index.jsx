import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import gregoMan from "./img/sculpture-davi.jpg";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    your_email: "",
    your_pass: "",
    remember_me: false,
  });

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.your_email) errors.your_email = "Email is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([, message]) => {
        toast.error(message);
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          your_email: formData.your_email,
          your_pass: formData.your_pass,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", formData.your_email); // Salvar o email no localStorage
        toast.success(data.message);

        console.log("User authenticated: ", data);
        setTimeout(() => {
          navigate("/"); // Redirecionamento após o login
        }, 2000); // 2 segundos de delay para o usuário ver a mensagem de sucesso
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Error logging in");
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
        <Header />

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
                method="post"
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="your_email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="your_email"
                    id="your_email"
                    placeholder="Your Email"
                    value={formData.your_email}
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
