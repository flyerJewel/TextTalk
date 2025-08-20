import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn") === "true"
    );

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const trimmed = username.trim();
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[trimmed] && users[trimmed].password === password) {
            // Login success: save user info & login state
            localStorage.setItem('currentUser', trimmed);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setError('');
            navigate('/profile');
        } else {
            setError("Incorrect username or password.");
        }

    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        const trimmed = newUsername.trim();
        const users = JSON.parse(localStorage.getItem('users')) || {};


        if (!trimmed) {
            setError("Username is required.");
            return;
        }

        if (!newPassword) {
            setError("Password is required.");
            return;
        }

        if (users[trimmed]) {
            setError("Username already exists.");
            return;
        }
        users[trimmed] = {
            username: trimmed,
            password:newPassword,
            bio: 'New user.',
            picture: null,
        }
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', trimmed);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setError('');
        navigate('/profile');


    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
    };

    // redirect if not logged in
    if (!isLoggedIn) {
        return (
            <div
                style={{textAlign: 'center', padding: '3rem'}}
            >
                <div style={{
                    maxWidth: '320px',
                    margin: '2rem auto 0',
                    padding: '0 1rem',
                }}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db', // gray-300
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            padding: '16px',
                            marginBottom: '24px',
                            width: "370px",
                        }}
                    >
                <form
                    onSubmit={handleLogin}
                    style={{
                        backgroundColor: "white",
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        width: "320px",
                    }}
                >

                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "16px" }}>
                        Login
                    </h2>
                    {error && (
                        <p style={{ color: "red", fontSize: "0.875rem", marginBottom: "8px" }}>{error}</p>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: "12px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: "12px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#3b82f6", // blue-500 equivalent
                            color: "white",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")} // blue-600 equivalent hover
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                    >
                        Log In
                    </button>
                </form>
                <form onSubmit={handleCreateAccount} style={{
                    backgroundColor: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    width: "320px",
                }}>
                    <h2>Create Account</h2>
                    {error && <p>{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: "12px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                            width: "100%",
                            marginBottom: "12px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#3b82f6", // blue-500 equivalent
                            color: "white",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")} // blue-600 equivalent hover
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
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
