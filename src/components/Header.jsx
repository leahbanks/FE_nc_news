import { Link } from "react-router-dom";

export default function Header() {
  return <Link to="/" style={{ textDecoration: 'none' }}><h1 className="header">NC News</h1></Link>
}
