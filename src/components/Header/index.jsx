import logo from "/logoispired-no-bg.png";

const Header = () => {
  return (
    <>
      <header
        style={{
          width: "100%",
          height: "100px",
          transform: "translateY(-150px)",
          justifyContent: "start",
        }}
      >
        <a href="/" className="logo">
          <img
            style={{
              width: "100px",
            }}
            src={logo}
            alt="logo"
          />
        </a>
      </header>
    </>
  );
};

export default Header;
