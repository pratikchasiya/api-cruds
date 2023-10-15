import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserApiCrud from "./components/UserApiCrud";
import LoaderComponent from "./components/LoaderComponent";

function App() {
  return (
    <div className="App">
      <UserApiCrud />
      <LoaderComponent />
    </div>
  );
}

export default App;
