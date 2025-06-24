import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewPostForm from './components/NewPostForm';
import Post from './components/Post';
function FeedPage() {
  const [posts, setPosts] = useState([]);

  // load posts from local storage
  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  },[]);

// saves to local storage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (text) => {
    const newPost = {
      id: Date.now(),
      username: 'julian_dev', // mock user
      text: text,
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments:[]
    };
    setPosts([newPost, ...posts]); // newest post on top
  };
    const handleLike = (id) => {
      if (likedPosts.has(id)) return;
      setPosts(posts.map(post =>
          (post.id === id ? { ...post, likes: post.likes + 1 } : post)));
      setLikedPosts(new Set([...likedPosts, id]));

    };

    const handleAddComment = (id, comment) => {
      setPosts(
          posts.map(post =>
              post.id === id
                  ? { ...post, comments: [...post.comments, comment] }
                  : post
          )
      );
    };

    const handleDelete = (id) => {
      setPosts(posts.filter(post => post.id !== id));
    };

    const [likedPosts, setLikedPosts] = useState(new Set());


    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Home</h2>
      <NewPostForm onPost={handleAddPost} />
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet. Start tweeting!</p>
      ) : (
        posts.map((post) => <Post
            key={post.id}
            data={post}
            onLike={() =>handleLike(post.id)}
            onComment={(comment) => handleAddComment(post.id, comment)}
            onDelete={() => handleDelete(post.id)}
        />)
      )}
    </div>
    );
  }
  
  export default FeedPage;