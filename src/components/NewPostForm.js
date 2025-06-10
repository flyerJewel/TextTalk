import { useState } from 'react';

function NewPostForm({ onPost }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    onPost(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        maxLength="280"
        placeholder="What's happening?"
        style={{ width: '100%', padding: '10px' }}
      />
      <div style={{ textAlign: 'right' }}>
        <small>{text.length}/280</small>
      </div>
      <button
        type="submit"
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#1DA1F2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Tweet
      </button>
    </form>
  );
}

export default NewPostForm;