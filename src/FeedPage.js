import { useState } from 'react';
import { Link } from 'react-router-dom';
import NewPostForm from './components/NewPostForm'
import Post from './components/Post'
function FeedPage() {
  const [posts, setPosts] = useState([]);

  const handleAddPost = (text) => {
    const newPost = {
      id: Date.now(),
      username: 'julian_dev', // mock user
      text: text,
      timestamp: new Date().toLocaleString()
    };
    setPosts([newPost, ...posts]); // newest post on top
  };
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Home</h2>
      <NewPostForm onPost={handleAddPost} />
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No posts yet. Start tweeting!</p>
      ) : (
        posts.map((post) => <Post key={post.id} data={post} />)
      )}
    </div>
    );
  }
  
  export default FeedPage;