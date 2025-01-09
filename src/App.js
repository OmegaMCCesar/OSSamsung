// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bridge from "./components/Bridge";
import Homepage from './components/Homepage';
import HomeScreen from './diagnosticTech/screens/HomeScreen';
import DiagnosticScreen from './diagnosticTech/screens/DiagnosticScreen';
import ResultScreen from './diagnosticTech/screens/ResultScreen';

function App() {

  return (
   <Router>
    <Routes>
       <Route path="/" element={<Homepage />} />
      <Route path="/Bridge" element={<Bridge />} />
      <Route path="/diagnostic" element={<DiagnosticScreen />} />
      <Route exact path="/homeScreen" element={<HomeScreen />} />
      <Route path="/result" element={<ResultScreen />} />
    </Routes>
   </Router>
  );
}

export default App;









