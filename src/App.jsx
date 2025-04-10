import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Article from "./components/Article";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<Article />}></Route>
      </Routes>
    </>
  );
}

export default App;
