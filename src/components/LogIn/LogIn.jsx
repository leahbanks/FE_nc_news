import { useContext, useEffect, useState } from "react";
import { getUsers } from "../../utils/api";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

export default function LogIn() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  const handleLogin = (event) => {
    setLoggedInUser(event.target.value);
    navigate(-1);
  };

  return loading ? (
    <section className="loading-animation"></section>
  ) : (
    <section>
      <ul className="users-container" style={{ listStyle: "none" }}>
        {users.map((user) => {
          return (
            <li className="users" key={user.username}>
              <img
                src={user.avatar_url}
                alt={`${user.username} avatar`}
                className="user-image"
              />
              <br></br>
              <button
                className="user-button"
                onClick={handleLogin}
                value={user.username}
              >
                Log in as {user.username}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
