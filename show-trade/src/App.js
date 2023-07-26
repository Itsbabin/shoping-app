import './App.css';
import Display from './component/display';
import Getdata from './datasource/getdata';

function App() {
  return (
    <Getdata>
    <div className="App">
        <Display/>
    </div>
    </Getdata>
  );
}

export default App;
