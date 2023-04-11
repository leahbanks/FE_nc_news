import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTopics } from "../../utils/api";
import { UserContext } from "../../contexts/userContext";
import "./NavBar.css";

export default function NavBar() {
  const [topics, setTopics] = useState("");
  const [navLoading, setNavLoading] = useState(true);
  const { loggedInUser, handleLogout } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((topicRes) => {
      setTopics(topicRes);
      setNavLoading(false);
    });
  }, []);

  return navLoading ? (
    <section className="loading-animation"></section>
  ) : (
    <section className="nav-bar">
      <div>
        <Link
          to={"/"}
          style={{ textDecoration: "none" }}
          className="nav-topics"
        >
          All
        </Link>
      </div>
      {topics.map((topic) => {
        return (
          <div key={topic.description}>
            <Link
              to={`/articles/?topic=${topic.slug}`}
              key={topic.description}
              style={{ textDecoration: "none" }}
              className="nav-topics"
            >
              {topic.slug.charAt(0).toUpperCase() +
                topic.slug.slice(1, topic.length)}
            </Link>
          </div>
        );
      })}
      {loggedInUser ? (
        <button className="logged-in" onClick={handleLogout}>
          Log Out / {loggedInUser}
        </button>
      ) : (
        <Link
          to="/users"
          style={{ textDecoration: "none" }}
          className="nav-login"
        >
          Login
        </Link>
      )}
    </section>
  );
}
