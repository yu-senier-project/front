import { Link } from "react-router-dom";
import "../../styles/nav/Nav.scss";

export default function NavItem({ children, onClick, link, text }) {
  return (
    <>
      {link ? (
        <Link to={link}>
          <div className="navItem" onClick={onClick}>
            {children}
            <p>{text}</p>
          </div>
        </Link>
      ) : (
        <div className="navItem" onClick={onClick}>
          {children}
          <p>{text}</p>
        </div>
      )}
    </>
  );
}
