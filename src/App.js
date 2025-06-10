import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage';
import FeedPage from './FeedPage';

function App() {
  return (
    
   
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        
      
    
    
    
  );
}

export default App;
