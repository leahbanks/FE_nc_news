import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <br></br>
      <ArticleList />
      <Article />
    </div>
  );
}

export default App;
