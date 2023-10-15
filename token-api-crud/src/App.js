import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TokenApiCrud from './components/TokenApiCrud';
import NewTokenApiCrud from './components/NewTokenApiCrud';
// 33015f07de30ac70869a4c002347fa9a700a3db037a55ad95579577e3cbd0be9

function App() {
  return (
    <div className="App">
     {/* <TokenApiCrud /> */}
     <NewTokenApiCrud />
    </div>
  );
}

export default App;
