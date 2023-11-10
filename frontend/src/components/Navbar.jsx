import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
// import the Navbar css file here

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const content = (
    <>
      <div className="div1">
        <ul className="ul1">
          <Link to="/account" unstable_viewTransition>
            <li className="li1">Account</li>
          </Link>
          <Link to="/transachistory" unstable_viewTransition>
            <li className="li1">Transaction History</li>
          </Link>
          <Link to="/login" unstable_viewTransition>
            <li className="li1">Login/Register</li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div className="div2">
        <div className="div3">
          <Link to="/" unstable_viewTransition>
            <img src="/logo-no-background.svg" alt="Logo" className="link1" />
          </Link>
        </div>
        <div className="div4">
          <div className="div5">
            <ul className="ul2">
              <Link to="/about" className="unstable-viewTransition">
                <li className="li2">ABOUT</li>
              </Link>
              <Link to="/login" className="unstable-viewTransition">
                <li className="li2">LOGIN/REGISTER</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>{click && content}</div>

        <button className="button1" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
