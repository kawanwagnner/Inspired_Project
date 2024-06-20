import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import cameraMan from "../SignUp/img/cameraman.jpg";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import "./css/style.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_pass: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Nome é obrigatório";
    if (!formData.email) errors.email = "E-mail é obrigatório";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Endereço de e-mail é inválido";
    if (!formData.password) errors.password = "Senha é obrigatória";
    if (formData.password.length < 6)
      errors.password = "A senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirm_pass)
      errors.confirm_pass = "As senhas não coincidem";
    if (!formData.username) errors.username = "Nome de usuário é obrigatório";
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
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log("Dados do formulário enviados: ", formData);

        // Redirecionar imediatamente após o cadastro bem-sucedido
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(Error`: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Erro ao enviar formulário");
    }
  };

  return (
    <div className="main">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign Up</title>
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
                <img src={cameraMan} alt="sign in" />
              </figure>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Cadastro</h2>
              <form
                method="POST"
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="confirm_pass"
                    id="confirm_pass"
                    placeholder="Confirm Password"
                    value={formData.confirm_pass}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Sign Up"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
