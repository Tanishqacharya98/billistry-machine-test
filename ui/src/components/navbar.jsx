import {
  Link,
  useNavigate
} from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  const [darkMode,
 setDarkMode] =
 useState(false);

const toggleTheme = () => {

 document.body.classList.toggle(
  "dark"
 );

 setDarkMode(
  !darkMode
 );
};

  return (
    <nav className="navbar">

      <h2>Billistry</h2>
      <button
 className="btn btn-primary"
 onClick={toggleTheme}
>
 {darkMode
  ? "Light"
  : "Dark"}
</button>

      <div>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/customers">
          Customers
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/invoice">
          Invoice
        </Link>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;