import aspas1 from './img/aspas1.png'
import aspas2 from './img/aspasbaixo2.png'
import profile from './img/profile.png'

import "./css/home.css"
import "./css/style.css"

const Home = () => {
  return (<>


<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://codepen.io/GreenSock/pen/xxmzBrw.css"
    />
    <link rel="stylesheet" href="style.css" />
    <script defer src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
    <script
      defer
      src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"
    ></script>
    <script defer src="main.js"></script>
    <title>Document</title>
  </head>
  <body>
    <div className="wrapper">
      <div className="content">
        <section className="section hero">

        </section>
        <section className="section gradient-purple">
          
       
      <header>
      <img src={profile} width="50px" alt="" />
      <a className='login' href="#"><p>Login</p></a>
    </header>

      <div className="pai">
        <div className="container">
          <img
            src={aspas1}
            className="left-image"
            width="200px"
            alt=""
          />
          <h2>I N O V A T I O N</h2>
          <h1>Bem vindo <span className="pequeno">AO</span> Inspired</h1>
          <img
            src={aspas2}
            className="right-image"
            width="200px"
            alt=""
          />
          <a className='signUp' href="#"><h3>CADASTRAR-SE</h3></a>
        </div>
      </div>



        </section>
        <section className="section gradient-blue"></section>
      </div>
      <div className="image-container">
        <img src="img/BG2.png" alt="image" />
      </div>
    </div>
  </body>
</html>


    

  </>);
}

export default Home;