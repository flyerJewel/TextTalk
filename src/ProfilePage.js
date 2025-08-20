import { useState, useEffect } from 'react';
import ProfileForm from "./components/ProfileForm";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            // no logged-in user; handle redirect or default
            setProfile(null);
            return;
        }

        // Get users object
        const users = JSON.parse(localStorage.getItem('users')) || {};

        // Get profile for currentUser or default
        const userProfile = users[currentUser] || {
            username: currentUser,
            bio: '',
            picture: null,
        };

        setProfile(userProfile);
    }, []);

    const handleSave = (updatedProfile) => {
        setProfile(updatedProfile);
        setEditing(false);

        // Update user in localStorage users object
        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[updatedProfile.username] = updatedProfile;
        localStorage.setItem('users', JSON.stringify(users));
    };

    if (!profile) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
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
                        Profile Page
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
            <h2>Your Profile</h2>

            <div style={{ marginBottom: '1rem' }}>
                <img
                    src={profile.picture || '/logo.svg'}
                    alt="profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
            </div>

            {editing ? (
                <ProfileForm initialProfile={profile} onSave={handleSave} />
            ) : (
                <>
                    <h3>@{profile.username}</h3>
                    <p>{profile.bio}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;
