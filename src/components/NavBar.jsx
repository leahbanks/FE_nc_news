import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navBar">
      <Link to="/search" style={{ textDecoration: "none" }} className="navItem">
        Search
      </Link>{" "}
      |{" "}
      <Link to="/users" style={{ textDecoration: "none" }} className="navItem">
        Login/Sign Up
      </Link>
    </div>
  );
}
