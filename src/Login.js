import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const trimmed = username.trim();

        if (!trimmed) {
            setError('Please enter a username.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};

        // Create user if it doesn't exist
        if (!users[trimmed]) {
            users[trimmed] = {
                username: trimmed,
                bio: 'New user.',
                picture: null,
            };
        }

        // Save user and login state
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', trimmed);
        setError('');
        navigate('/profile'); // Change this to '/feed' if you want
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={{ marginBottom: '1rem' }}>🔐 Sign In or Register</h2>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button onClick={handleLogin} style={styles.button}>
                    Continue
                </button>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '1rem',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1DA1F2',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
    },
};

export default LoginPage;
