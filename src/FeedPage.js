import { useState, useEffect } from 'react';
import NewPostForm from './components/NewPostForm';
import Post from './components/Post';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState({});

    useEffect(() => {
        // Load posts from localStorage
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }

        // Load current user and all users from localStorage
        const cu = localStorage.getItem('currentUser');
        setCurrentUser(cu);

        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const handleAddPost = (text, imageData) => {
        if (!currentUser) {
            alert('You must be logged in to post!');
            return;
        }

        const userProfile = users[currentUser] || {};

        const newPost = {
            id: Date.now(),
            username: currentUser,
            text: text,
            image: imageData,
            timestamp: new Date().toLocaleString(),
            picture: userProfile.picture || null,
            likes: 0,
            comments: []
        };

        setPosts([newPost, ...posts]);
    };

    const [likedPosts, setLikedPosts] = useState(new Set());

    const handleLike = (id) => {
        if (likedPosts.has(id)) return;
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
        setLikedPosts(new Set([...likedPosts, id]));
    };

    const handleAddComment = (id, comment) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, comments: [...post.comments, comment] } : post
        ));
    };

    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{
                maxWidth: '320px',
                margin: '2rem auto 0',
                padding: '0 1rem',
            }}>
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '16px',
                    marginBottom: '24px',
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        textAlign: 'center',
                    }}>
                        FEED PAGE
                    </h2>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}>
                        <a href="/profile"
                           style={{
                               color: '#3b82f6',
                               fontWeight: '600',
                               textDecoration: 'none',
                               cursor: 'pointer',
                           }}
                           onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                           onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                            Profile
                        </a>
                        <a href="/"
                           style={{
                               color: '#3b82f6',
                               fontWeight: '600',
                               textDecoration: 'none',
                               cursor: 'pointer',
                           }}
                           onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                           onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                            Home
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

            <NewPostForm onPost={handleAddPost} />

            {posts.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet. Start tweeting!</p>
            ) : (
                posts.map(post => (
                    <Post
                        key={post.id}
                        data={post}
                        image={post.image && <img src={post.image} alt="Post visual" style={{ maxWidth: '100%' }} />}
                        onLike={() => handleLike(post.id)}
                        onComment={(comment) => handleAddComment(post.id, comment)}
                        onDelete={() => handleDelete(post.id)}
                    />
                ))
            )}
        </div>
    );
}

export default FeedPage;
