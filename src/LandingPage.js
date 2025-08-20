import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function LandingPage() {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div
              style={{
                  maxWidth: '320px',
                  margin: '2rem auto 0',
                  padding: '0 1rem',
              }}
          >
              <div
                  style={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db', // gray-300
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      padding: '16px',
                      marginBottom: '24px',
                  }}
              >
                  <h2
                      style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          marginBottom: '16px',
                          textAlign: 'center',
                      }}
                  >
                      HOME
                  </h2>
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                      }}
                  >
                      <a
                          href="/profile"
                          style={{
                              color: '#3b82f6', // blue-500
                              fontWeight: '600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                          Profile
                      </a>
                      <a
                          href="/feed"
                          style={{
                              color: '#3b82f6',
                              fontWeight: '600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                          Feed
                      </a>
                      <a
                          href="/login"
                          style={{
                              color: '#3b82f6',
                              fontWeight: '600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                          Sign Out
                      </a>
                  </div>
              </div>
          </div>
        <h1 style={{fontSize:'60px'}}>TextTalk</h1>
        <p>Welcome to a minimalist social experience. Share thoughts, not noise.</p>
        <Link to="/feed">
          <button style={{ padding: '10px 20px', marginTop: '20px' }}>
            Get Started
          </button>
        </Link>

          <a
              href="https://github.com/flyerJewel/TextTalk"
              target="_blank"
              >
              <img src={logo} alt="react logo" className="spin-on-hover"
              ></img>
          </a>



      </div>
    );
  }
  
  export default LandingPage;