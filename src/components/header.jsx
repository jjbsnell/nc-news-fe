import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/">
        <img
          src="/ncnewslogo.png"
          alt="NC News logo"
          className="logo-image"
        />
      </Link>
    </header>
  );
}

export default Header;