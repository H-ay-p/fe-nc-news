import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useSearchParams } from "react-router-dom";

export default function TopicNav() {
  const [topics, setTopics] = useState([{ slug: "electronics" }]);
  const [searchParams, setSearchParams] = useSearchParams();

  const setTopic = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", e.target.value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <nav>
      <label htmlFor="topicSelect"></label>
      <select id="topicSelect" value="chosenTopic" onChange={setTopic}>
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
