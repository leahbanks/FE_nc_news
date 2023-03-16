import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
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

  console.log(loggedInUser);

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
