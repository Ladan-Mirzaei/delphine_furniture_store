import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dr.Kambiz Fadaei </div>
      <ul>
        <li>
          <a href="#services">Unsere Leistungen</a>
        </li>
        <li>
          <a href="#team">Unser Team</a>
        </li>
        <li>
          <a href="#contact">Kontakt</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
