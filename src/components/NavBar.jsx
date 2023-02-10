import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <section className="navBar">
    <div>
      <Link to="/" style={{ textDecoration: "none" }} className="nav-filter">
        Filter
      </Link>
      </div>
      <div>
      <Link to="/users" style={{ textDecoration: "none" }} className="nav-login">
        Log In
      </Link>
    </div>
    </section>
  );
}
