import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import ApiCrud from './components/ApiCrud';
import ApiCrud from '../src/components/ApiCrud'
import ApiCrud1 from './components/ApiCrud1';

function App() {
  return (
    <div className="App">
    {/* <ApiComp /> */}
    {/* <ApiCrud /> */}
    <ApiCrud1 />
    </div>
  );
}

export default App;
