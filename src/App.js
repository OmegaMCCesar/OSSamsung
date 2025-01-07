// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bridge from "./components/Bridge";
import Homepage from './components/Homepage';

function App() {

  return (
   <Router>
    <Routes>
       <Route path="/" element={<Homepage />} />
      <Route path="/Bridge" element={<Bridge />} />
    </Routes>
   </Router>
  );
}

export default App;









