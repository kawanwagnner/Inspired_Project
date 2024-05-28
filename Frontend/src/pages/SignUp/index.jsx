// Importações de pacotes necessários
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import cameraMan from "../SignUp/img/cameraman.jpg";
import Header from "../../components/Header";

// Componente de inscrição
const SignUp = () => {
  // Definindo estado inicial do formulário
  const [formData, setFormData] = useState({
    your_name: "",
    your_email: "",
    your_phone: "",
    your_pass: "",
    confirm_pass: "",
    remember_me: false,
  });

  // Carregar scripts externos após o componente ser montado
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

  // Função para validar o formulário
  const validate = () => {
    const errors = {};
    if (!formData.your_name) errors.your_name = "Name is required";
    if (!formData.your_email) errors.your_email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.your_email))
      errors.your_email = "Email address is invalid";
    if (!formData.your_phone) errors.your_phone = "Phone is required";
    if (!/^\d{10,}$/.test(formData.your_phone))
      errors.your_phone = "Phone number is invalid";
    if (!formData.your_pass) errors.your_pass = "Password is required";
    if (formData.your_pass.length < 6)
      errors.your_pass = "Password must be at least 6 characters";
    if (formData.your_pass !== formData.confirm_pass)
      errors.confirm_pass = "Passwords do not match";
    return errors;
  };

  // Função para lidar com alterações no formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([message]) => {
        toast.error(message);
      });
      return;
    }

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");
        console.log("Form data submitted: ", formData);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
    
        // // Lógica que Salva os dados no localStorage
        // localStorage.setItem("formData", JSON.stringify(formData));
        // toast.success("Form submitted successfully!");
        // console.log("Form data submitted: ", formData);
    
        // // Redireciona para a página inicial após um tempo
        // setTimeout(() => {
        //   window.location.href = "/"; // Redireciona para home
        // }, 2000); // Dá tempo ao usuário para ver a mensagem de sucesso
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
              <h2 className="form-title">Sign up</h2>
              <form
                method="POST"
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    value={formData.your_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="your_email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="your_email"
                    id="your_email"
                    placeholder="Email"
                    value={formData.your_email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="your_phone">
                    <i className="zmdi zmdi-phone material-icons-name"></i>
                  </label>
                  <input
                    type="tel"
                    name="your_phone"
                    id="your_phone"
                    placeholder="Celular"
                    value={formData.your_phone}
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
                    placeholder="Senha"
                    value={formData.your_pass}
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
                    placeholder="Confirme sua senha"
                    value={formData.confirm_pass}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className="agree-term"
                    checked={formData.remember_me}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember_me" className="label-agree-term">
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
                <span className="social-label">Ou cadastre-se com</span>
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

export default SignUp;
