import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
function LandingPage() {
    return (
      <div style={{ textAlign: 'center', padding: '3rem',  fontSize:'60px' }}>
        <h1>TextTalk</h1>
        <p>Welcome to a minimalist social experience. Share thoughts, not noise.</p>
        <Link to="/feed">
          <button style={{ padding: '10px 20px', marginTop: '20px' }}>
            Get Started
          </button>
        </Link>
      </div>
    );
  }
  
  export default LandingPage;