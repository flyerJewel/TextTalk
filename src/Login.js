import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn") === "true"
    );

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const trimmed = username.trim();

        if (trimmed === "Julian_dev" && password === "secret") {
            // get user database
            const users = JSON.parse(localStorage.getItem('users')) || {};

            // Create user profile if none exists
            if (!users[trimmed]) {
                users[trimmed] = {
                    username: trimmed,
                    bio: 'New user.',
                    picture: null,
                };
            }

            // Save user state
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', trimmed);
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            setError('');
            navigate('/profile'); // or '/feed'
        } else {
            setError("Incorrect username or password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
    };

    // redirect if not logged in
    if (!isLoggedIn) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                    <h2 className="text-xl font-bold mb-4">Login</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full mb-3 p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-3 p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Log In
                    </button>
                </form>
            </div>
        );
    }

    // else show status
    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={{ marginBottom: '1rem' }}> 🌎 Welcome to text talk! {username}!</h2>
                <p>You are logged in.</p>
                <button onClick={handleLogout} style={styles.button}>
                    Log Out
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
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1DA1F2',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem'
    },
};

export default LoginPage;
