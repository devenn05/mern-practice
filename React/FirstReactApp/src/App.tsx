import './App.css'
import InputField from './components/inputfield';
import DisplayData from './components/DisplayData';

const App: React.FC = () => {
  return (
    <div className="App">
    <span>Hello World</span>
    <InputField/>
    <DisplayData/>
    
  </div>
  );
};

export default App;