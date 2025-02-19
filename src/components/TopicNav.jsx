import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function TopicNav() {
  const [topics, setTopics] = useState([{ slug: "electronics" }]);

  const [chosenTopic, setChosenTopic] = useState("all");

  const navigate = useNavigate();

  function gotToTopicPage(e) {
    console.log(e.target.value);
    setChosenTopic(e.target.value);
    navigate(`/articles/${e.target.value}`);
  }

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <nav>
      <label htmlFor="topicSelect"></label>
      <select id="topicSelect" value="chosenTopic" onChange={gotToTopicPage}>
        <option value="all" key="all">
          Show all
        </option>

        {topics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug}>
              {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
            </option>
          );
        })}
      </select>
    </nav>
  );
}
