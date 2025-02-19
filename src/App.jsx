import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Article from "./components/Article";
import { createContext, useContext } from "react";

function App() {
  const userContext = createContext({ username: "mitch" });
  const user = useContext(userContext);
  return (
    <>
      <Header user={user}></Header>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/:article_id" element={<Article user={user} />}></Route>
      </Routes>
    </>
  );
}

export default App;
