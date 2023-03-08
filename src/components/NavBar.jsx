import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";

export default function NavBar() {
  const [topics, setTopics] = useState("");
  const [navLoading, setNavLoading] = useState(true);

  useEffect(() => {
    getTopics().then((topicRes) => {
      setTopics(topicRes);
      setNavLoading(false);
    });
  }, []);

  if (navLoading) {
    return "Loading...";
  }

  return (
    <section className="navBar">
      <div>
        <Link
          to="/users"
          style={{ textDecoration: "none" }}
          className="nav-login"
        >
          Log In
        </Link>
        </div>
        <div className="topics">
            {topics.map((topic) => {
              return (
                <div>
                <Link to={`/articles/${topic.slug}`} key={topic.description} style={{ textDecoration: "none" }}
                className="nav-topics">
                  {topic.slug}
                </Link>
                </div>
              );
            })}
          </div>
      
    </section>
  );
}
