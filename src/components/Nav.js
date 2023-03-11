import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Nav() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const showMenu = (e) => {
    setIsMenuShown((prevIsMenuShown) => !prevIsMenuShown);
  };

  // document.addEventListener("click", function (e) {
  //   console.log(e.target.value);
  //   console.log("clicked");
  // });
  const showForm = () => {
    setIsFormShown(true);
  };
  const hideForm = () => {
    setIsFormShown(false);
  };
  return (
    <nav>
      <div className="nav-container">
        <ul className="nav-icons">
          <li className="nav-icon">OurLogo</li>
          <li className="nav-icon" onClick={showForm}>
            Account
          </li>
          <li className="nav-icon" onClick={showMenu}>
            Select Language
          </li>
        </ul>
      </div>
      <div
        className={
          !isMenuShown
            ? "language-menu-container"
            : "language-menu-container nav-menu-active"
        }
      >
        <ul className="language-menu">
          <li className="language-menu-item">English</li>
          <li className="language-menu-item">Russian</li>
          <li className="language-menu-item">Chinese</li>
        </ul>
      </div>
      <div
        className={
          !isFormShown
            ? "nav-form-container"
            : "nav-form-container nav-form-active"
        }
      >
        <AiOutlineClose onClick={hideForm} className="nav-form-icon" />
        <form>
          <div className="nav-form-options">
            <p id="nav-form-sign-in-option" className="nav-form-option">
              Sign In
            </p>
            <p id="nav-form-sign-up-option" className="nav-form-option">
              Sign Up
            </p>
          </div>
          <input className="nav-form-input" type="text" placeholder="Email" />
          <input
            className="nav-form-input"
            type="text"
            placeholder="Password"
          />
          <button className="nav-form-button">Login</button>
        </form>
      </div>
    </nav>
  );
}
