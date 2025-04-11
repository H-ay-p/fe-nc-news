import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useSearchParams } from "react-router-dom";

export default function QueryNav() {
  const [chosenSort, setChosenSort] = useState("date");
  const [chosenTopic, setChosenTopic] = useState("all");
  const [topics, setTopics] = useState([{ slug: "electronics" }]);
  const [searchParams, setSearchParams] = useSearchParams();

  function chooseTopic(e) {
    setChosenTopic(e.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", e.target.value);
    setSearchParams(newParams);
  }

  function chooseSort(e) {
    setChosenSort(e.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSearchParams(newParams);
  }

  function chooseOrder(e) {
    if (e.target.innerText === "Ascending") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("order", "asc");
      setSearchParams(newParams);
    }
    if (e.target.innerText === "Descending") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("order", "desc");
      setSearchParams(newParams);
    }
  }

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <nav className="nav">
      <label htmlFor="topicSelect"></label>
      <select
        id="topicSelect"
        value={chosenTopic}
        onChange={chooseTopic}
        className="greyText"
      >
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
      <label htmlFor="sortSelect" className="greyText">
        Sort by:
      </label>
      <select
        id="sortSelect"
        value={chosenSort}
        onChange={chooseSort}
        className="greyText"
      >
        <option value="created_at" key="date">
          Date (default)
        </option>
        <option value="comment_count" key="comment_count">
          Comment Count
        </option>
        <option value="votes" key="votes">
          Votes
        </option>
      </select>

      <button className="sortBtn" onClick={chooseOrder}>
        Ascending
      </button>
      <button className="desc" onClick={chooseOrder}>
        Descending
      </button>
    </nav>
  );
}
