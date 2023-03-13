import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <section>
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="header">NC NEWS</h1>
      </Link>
      </div>
      <section>
      <NavBar />
      </section>
      </section>
  );
}
