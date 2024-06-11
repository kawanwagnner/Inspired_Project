import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import Logo from "./img/LOGO.png";
import "./css/style.css";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId); // Salvar o ID do usuário no localStorage
        toast.success(data.message);

        console.log("User authenticated: ", data);
        setTimeout(() => {
          navigate("/feed"); // Redirecionamento após o login
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
      </Helmet>

      <ToastContainer />

      <section className="sign-in">
        <Header />

        <div className="container">
          <div className="form">
            <img className="inspi" src={Logo} width="180px" alt="Logo" />
            <h2 className="login">Sign in</h2>

            <form
              method="post"
              className="register-form"
              id="login-form"
              onSubmit={handleSubmit}
            >
              <div className="input_container">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="#141B34"
                    d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    stroke="#141B34"
                    d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01577 10.5244C1.99473 11.5101 1.99473 12.4899 2.01577 13.4756Z"
                  ></path>
                </svg>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input_field"
                />
              </div>

              <div className="input_container">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="#141B34"
                    d="M16.5 10V8.25C16.5 5.90279 14.5972 4 12.25 4C9.90279 4 8 5.90279 8 8.25V10"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="#141B34"
                    d="M7 10.5H17C18.1046 10.5 19 11.3954 19 12.5V17.5C19 18.6046 18.1046 19.5 17 19.5H7C5.89543 19.5 5 18.6046 5 17.5V12.5C5 11.3954 5.89543 10.5 7 10.5Z"
                  ></path>
                </svg>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input_field"
                />
              </div>

              <div className="form-group form-button">
                <button
                  type="submit"
                  name="signin"
                  id="signin"
                  className="sign-in_btn"
                >
                  <span>Entrar</span>
                </button>
              </div>
            </form>
            <p>
              Não tem uma conta? <a href="/signup">Crie a sua</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
